-- GastroPass core schema
-- Multi-tenant model: one auth.users row per restaurant owner.
-- Row Level Security enforces that an authenticated owner can only ever
-- see rows belonging to restaurant(s) they own. Server-side API routes
-- use the service-role key and bypass RLS by design.

create extension if not exists "pgcrypto";

create type pass_platform as enum ('apple', 'google');
create type pass_status as enum ('active', 'expired', 'revoked');

-- ---------------------------------------------------------------------------
-- restaurants
-- ---------------------------------------------------------------------------
create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  slug text not null unique,
  is_public boolean not null default true,
  logo_url text,
  brand_color text not null default '#f59e0b',
  points_per_visit integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint slug_format check (slug ~ '^[a-z0-9-]{3,64}$')
);

create index restaurants_owner_id_idx on public.restaurants (owner_id);

-- ---------------------------------------------------------------------------
-- customers
-- ---------------------------------------------------------------------------
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  points_balance integer not null default 0 check (points_balance >= 0),
  -- Opt-in for restaurant marketing/promo messages, separate from the
  -- operational pass/points updates the customer always gets. Collected at
  -- signup, unchecked by default — no send pipeline consumes this yet.
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customers_has_contact check (email is not null or phone is not null)
);

create unique index customers_restaurant_phone_idx
  on public.customers (restaurant_id, phone)
  where phone is not null;

create unique index customers_restaurant_email_idx
  on public.customers (restaurant_id, email)
  where email is not null;

create index customers_restaurant_id_idx on public.customers (restaurant_id);

-- Unique (id, restaurant_id) target needed for the composite FK from passes below.
alter table public.customers
  add constraint customers_id_restaurant_unique unique (id, restaurant_id);

-- ---------------------------------------------------------------------------
-- passes
-- ---------------------------------------------------------------------------
create table public.passes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  platform pass_platform not null,
  serial_number text not null unique,
  status pass_status not null default 'active',
  -- Apple: opaque token the wallet app supplies to authenticate update requests.
  apple_auth_token text,
  -- Apple: device push token registered by the wallet for APNs delivery.
  apple_push_token text,
  -- Apple: physical devices currently registered to receive this pass's updates.
  apple_device_library_identifiers text[] not null default '{}',
  -- Google: the Wallet object id assigned when the object was inserted.
  google_object_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint passes_restaurant_matches_customer
    foreign key (customer_id, restaurant_id)
    references public.customers (id, restaurant_id)
);

create index passes_customer_id_idx on public.passes (customer_id);
create index passes_restaurant_id_idx on public.passes (restaurant_id);
create index passes_apple_push_token_idx on public.passes (apple_push_token)
  where apple_push_token is not null;

-- ---------------------------------------------------------------------------
-- notifications
-- ---------------------------------------------------------------------------
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  created_by uuid references auth.users (id) on delete set null,
  title text not null,
  message text not null,
  recipient_count integer not null default 0,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_restaurant_id_idx on public.notifications (restaurant_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger restaurants_set_updated_at
  before update on public.restaurants
  for each row execute function public.set_updated_at();

create trigger customers_set_updated_at
  before update on public.customers
  for each row execute function public.set_updated_at();

create trigger passes_set_updated_at
  before update on public.passes
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: tenant isolation
-- ---------------------------------------------------------------------------
-- SECURITY DEFINER + STABLE so it can be used inside policies without
-- re-evaluating auth.uid() per row via a join, and without exposing
-- restaurants rows the caller doesn't own.
create function public.owned_restaurant_ids()
returns setof uuid
language sql
security definer
stable
set search_path = public
as $$
  select id from public.restaurants where owner_id = auth.uid();
$$;

alter table public.restaurants enable row level security;
alter table public.restaurants force row level security;

alter table public.customers enable row level security;
alter table public.customers force row level security;

alter table public.passes enable row level security;
alter table public.passes force row level security;

alter table public.notifications enable row level security;
alter table public.notifications force row level security;

-- restaurants: owner has full access to their own row.
create policy restaurants_owner_select on public.restaurants
  for select using (owner_id = auth.uid());

create policy restaurants_owner_update on public.restaurants
  for update using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy restaurants_owner_insert on public.restaurants
  for insert with check (owner_id = auth.uid());

create policy restaurants_owner_delete on public.restaurants
  for delete using (owner_id = auth.uid());

-- customers: owner can manage customers of restaurants they own.
create policy customers_owner_select on public.customers
  for select using (restaurant_id in (select public.owned_restaurant_ids()));

create policy customers_owner_insert on public.customers
  for insert with check (restaurant_id in (select public.owned_restaurant_ids()));

create policy customers_owner_update on public.customers
  for update using (restaurant_id in (select public.owned_restaurant_ids()))
  with check (restaurant_id in (select public.owned_restaurant_ids()));

create policy customers_owner_delete on public.customers
  for delete using (restaurant_id in (select public.owned_restaurant_ids()));

-- passes: owner can manage passes of restaurants they own.
create policy passes_owner_select on public.passes
  for select using (restaurant_id in (select public.owned_restaurant_ids()));

create policy passes_owner_insert on public.passes
  for insert with check (restaurant_id in (select public.owned_restaurant_ids()));

create policy passes_owner_update on public.passes
  for update using (restaurant_id in (select public.owned_restaurant_ids()))
  with check (restaurant_id in (select public.owned_restaurant_ids()));

create policy passes_owner_delete on public.passes
  for delete using (restaurant_id in (select public.owned_restaurant_ids()));

-- notifications: owner can manage notifications of restaurants they own.
create policy notifications_owner_select on public.notifications
  for select using (restaurant_id in (select public.owned_restaurant_ids()));

create policy notifications_owner_insert on public.notifications
  for insert with check (restaurant_id in (select public.owned_restaurant_ids()));

create policy notifications_owner_delete on public.notifications
  for delete using (restaurant_id in (select public.owned_restaurant_ids()));

-- No anon/authenticated policy grants access beyond the owner's own tenant.
-- Public-facing pass issuance (app/pass/[restaurantSlug]) and all wallet/push
-- operations (Steps 3-4) run through server-side API routes using the
-- service-role key, which bypasses RLS entirely.
