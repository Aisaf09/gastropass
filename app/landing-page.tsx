"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Gift,
  QrCode,
  LayoutDashboard,
  UserPlus,
  IdCard,
  LogIn,
  Sparkles,
  Bell,
  Palette,
  ScanLine,
  Check,
  X,
  Menu,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { content, locales, type Locale } from "./landing-content";

const businessIcons = [CreditCard, Gift, QrCode, LayoutDashboard, Bell, Palette];
const customerIcons = [QrCode, UserPlus, IdCard];

export function LandingPage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[locale];
  const year = new Date().getFullYear();

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-neutral-950 text-white">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-orange-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[450px] w-[450px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-rose-600 text-sm font-bold text-white shadow-lg shadow-orange-900/30">
              G
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">GastroPass</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-neutral-300 lg:flex">
            <a href="#features" className="transition-colors hover:text-white">
              {t.nav.features}
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-white">
              {t.nav.howItWorks}
            </a>
            <a href="#compare" className="transition-colors hover:text-white">
              {t.nav.compare}
            </a>
            <a href="#faq" className="transition-colors hover:text-white">
              {t.nav.faq}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 rounded-full border border-white/10 p-1 sm:flex">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    locale === l.code
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <Button asChild variant="ghost" size="sm" className="hidden text-neutral-200 hover:bg-white/10 hover:text-white sm:inline-flex">
              <Link href="/login">{t.nav.login}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="hidden bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md shadow-orange-900/30 hover:from-orange-400 hover:to-rose-500 sm:inline-flex"
            >
              <Link href="/signup">{t.nav.signup}</Link>
            </Button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-neutral-300 lg:hidden"
              aria-label="Menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm text-neutral-300">
              <a href="#features" onClick={() => setMenuOpen(false)}>
                {t.nav.features}
              </a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
                {t.nav.howItWorks}
              </a>
              <a href="#compare" onClick={() => setMenuOpen(false)}>
                {t.nav.compare}
              </a>
              <a href="#faq" onClick={() => setMenuOpen(false)}>
                {t.nav.faq}
              </a>
              <div className="my-1 flex items-center gap-1 rounded-full border border-white/10 p-1 w-fit">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLocale(l.code)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                      locale === l.code ? "bg-white/10 text-white" : "text-neutral-400"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <Link href="/login" className="text-neutral-200">
                {t.nav.login}
              </Link>
              <Link href="/signup" className="font-medium text-orange-400">
                {t.nav.signup}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-10">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300">
            <Sparkles className="size-3.5" />
            {t.hero.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.hero.titleLead}{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>{" "}
            {t.hero.titleTail}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-neutral-400 sm:text-lg lg:mx-0">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-lg shadow-orange-900/30 hover:from-orange-400 hover:to-rose-500"
            >
              <Link href="/signup">
                <UserPlus />
                {t.hero.ctaSignup}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/login">
                <LogIn />
                {t.hero.ctaLogin}
              </Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400 lg:justify-start">
            {t.hero.trust.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-teal-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <HeroCard card={t.hero.card} />
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/10 bg-white/[0.02] py-4">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...t.marquee, ...t.marquee].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-neutral-400"
              >
                <span className="size-1.5 rounded-full bg-orange-500" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {t.stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-neutral-400 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Business features */}
      <section id="features" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
            {t.business.eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{t.business.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-400">{t.business.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.business.features.map((feature, i) => {
            const Icon = businessIcons[i] ?? Sparkles;
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors hover:border-orange-500/30"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-20"
                  style={{ background: "radial-gradient(circle, #fb923c, transparent 70%)" }}
                />
                <span className="flex size-10 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 text-sm font-semibold text-white">{feature.title}</p>
                <p className="mt-1.5 text-sm text-neutral-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Showcase 1: dashboard */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-teal-400">
              {t.showcase[0].eyebrow}
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              {t.showcase[0].title}
            </h2>
            <p className="mt-3 text-sm text-neutral-400 sm:text-base">
              {t.showcase[0].description}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {t.showcase[0].bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <DashboardMock pointsLabel={t.hero.card.pointsLabel} />
        </div>
      </section>

      {/* Showcase 2: notifications */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <NotificationMock card={t.hero.card} />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-medium uppercase tracking-wider text-violet-400">
              {t.showcase[1].eyebrow}
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              {t.showcase[1].title}
            </h2>
            <p className="mt-3 text-sm text-neutral-400 sm:text-base">
              {t.showcase[1].description}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {t.showcase[1].bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-violet-400" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Customer steps */}
      <section id="how-it-works" className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-16 sm:py-20">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
            {t.customer.eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{t.customer.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">{t.customer.subtitle}</p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
          {t.customer.steps.map((step, i) => {
            const Icon = customerIcons[i] ?? Sparkles;
            return (
              <div key={step.title} className="relative">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors hover:border-orange-500/30">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full border border-orange-500/25 bg-gradient-to-br from-orange-500/20 to-rose-500/20 text-sm font-semibold text-orange-300">
                      {i + 1}
                    </span>
                    <Icon className="size-5 text-orange-400" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-1.5 text-sm text-neutral-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compare */}
      <section id="compare" className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-teal-400">
            {t.compare.eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{t.compare.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-400">{t.compare.subtitle}</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500" />
                {t.compare.columns.map((col) => (
                  <th
                    key={col.name}
                    className={`p-4 text-center text-sm font-semibold ${
                      col.highlight ? "text-orange-300" : "text-neutral-300"
                    }`}
                  >
                    {col.highlight && (
                      <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-orange-400/70">
                        GastroPass
                      </span>
                    )}
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row, rowIdx) => (
                <tr key={row} className="border-t border-white/10">
                  <td className="p-4 text-xs font-medium text-neutral-400 sm:text-sm">{row}</td>
                  {t.compare.columns.map((col) => {
                    const cell = col.values[rowIdx]!;
                    return (
                      <td
                        key={col.name}
                        className={`p-4 text-center ${col.highlight ? "bg-orange-500/[0.06]" : ""}`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs sm:text-sm ${
                            cell.ok ? "text-teal-300" : "text-neutral-500"
                          }`}
                        >
                          {cell.ok ? (
                            <Check className="size-3.5 shrink-0" />
                          ) : (
                            <X className="size-3.5 shrink-0 text-neutral-600" />
                          )}
                          {cell.text}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto w-full max-w-2xl scroll-mt-20 px-6 py-16 sm:py-20">
        <div className="mb-8 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
            {t.faq.eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{t.faq.title}</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 backdrop-blur-md">
          <Accordion type="single" collapsible>
            {t.faq.items.map((item) => (
              <AccordionItem key={item.title} value={item.title} className="border-white/10">
                <AccordionTrigger className="text-white">{item.title}</AccordionTrigger>
                <AccordionContent>{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-orange-600/25 via-rose-600/15 to-violet-600/20 px-8 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute -top-20 right-0 size-64 rounded-full bg-orange-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 left-0 size-64 rounded-full bg-violet-500/20 blur-[100px]" />
          <h2 className="relative text-2xl font-semibold text-white sm:text-4xl">
            {t.finalCta.title}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-neutral-300 sm:text-base">
            {t.finalCta.subtitle}
          </p>
          <div className="relative mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-950 shadow-lg hover:bg-neutral-100"
            >
              <Link href="/signup">
                {t.finalCta.cta}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 px-6 py-12">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-rose-600 text-xs font-bold text-white">
                G
              </span>
              <span className="text-sm font-semibold text-white">GastroPass</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-neutral-500">{t.footer.tagline}</p>
          </div>
          {t.footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {col.title}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 w-full max-w-6xl border-t border-white/10 pt-6 text-xs text-neutral-600">
          © {year} {t.footer.copyright}
        </div>
      </footer>
    </main>
  );
}

function HeroCard({ card }: { card: (typeof content)["es"]["hero"]["card"] }) {
  return (
    <div className="relative [perspective:1200px]">
      <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-orange-500/30 via-rose-500/20 to-violet-500/20 opacity-70 blur-3xl" />

      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-black/50 backdrop-blur-md transition-transform duration-500 [transform:rotateY(-8deg)_rotateX(4deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(251,146,60,0.18), transparent 65%)",
          }}
        />
        <div className="relative flex items-center justify-between">
          <span className="text-sm font-semibold text-white">{card.name}</span>
          <span className="flex items-center gap-1 rounded-full border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 text-[10px] font-medium text-teal-300">
            <span className="size-1.5 rounded-full bg-teal-400" />
            {card.status}
          </span>
        </div>

        <div className="relative mt-8 flex items-end justify-between">
          <div>
            <p className="text-4xl font-semibold tracking-tight text-white">128</p>
            <p className="text-xs text-neutral-400">{card.pointsLabel}</p>
          </div>
          <Sparkles className="size-5 text-orange-400" />
        </div>

        <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-neutral-400">{card.member}</span>
          <span className="text-xs text-white">{card.memberName}</span>
        </div>
        <p className="relative mt-1 text-xs text-neutral-500">{card.perVisit}</p>

        <div
          className="relative mt-5 h-10 w-full rounded-md bg-white/90"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #171717 0px, #171717 2px, transparent 2px, transparent 5px, #171717 5px, #171717 6px, transparent 6px, transparent 10px)",
          }}
        />
      </div>

      <div className="absolute -right-4 -top-6 flex w-56 animate-float-slow items-start gap-2 rounded-xl border border-white/10 bg-neutral-900/95 p-3 shadow-xl shadow-black/40 backdrop-blur-md sm:-right-8">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-600 text-white">
          <Bell className="size-3.5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-white">{card.notifTitle}</p>
          <p className="truncate text-[11px] text-neutral-400">{card.notifBody}</p>
        </div>
      </div>
    </div>
  );
}

function DashboardMock({ pointsLabel }: { pointsLabel: string }) {
  const rows = [
    { name: "Ana G.", points: 128 },
    { name: "Marc P.", points: 96 },
    { name: "Laia S.", points: 74 },
  ];
  return (
    <div className="relative rounded-2xl border border-white/10 bg-neutral-900/70 p-5 shadow-xl shadow-black/30 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">Dashboard</span>
        <span className="flex items-center gap-1.5 rounded-full border border-teal-500/25 bg-teal-500/10 px-2 py-0.5 text-[10px] font-medium text-teal-300">
          <ScanLine className="size-3" />
          QR
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-2.5">
        {rows.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-rose-500/30 text-[10px] font-semibold text-orange-200">
                {row.name.charAt(0)}
              </span>
              <span className="text-xs font-medium text-white">{row.name}</span>
            </div>
            <span className="text-xs font-semibold text-teal-300">
              {row.points} {pointsLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationMock({ card }: { card: (typeof content)["es"]["hero"]["card"] }) {
  return (
    <div className="relative mx-auto flex max-w-xs flex-col gap-3 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-4 shadow-xl shadow-black/30 backdrop-blur-md">
      <div className="flex items-center justify-between px-1 text-[10px] text-neutral-500">
        <span>9:41</span>
        <span>●●●●●</span>
      </div>
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3 ${
            i === 1 ? "opacity-50" : ""
          }`}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-rose-600 text-white">
            <Bell className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-white">{card.notifTitle}</p>
            <p className="truncate text-[11px] text-neutral-400">{card.notifBody}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
