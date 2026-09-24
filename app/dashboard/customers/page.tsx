import { redirect } from "next/navigation";
import { getOwnerRestaurant } from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { AddCustomerForm } from "./add-customer-form";
import { CustomerActions } from "./customer-actions";

export default async function CustomersPage() {
  const restaurant = await getOwnerRestaurant();

  if (!restaurant) {
    redirect("/dashboard/onboarding");
  }

  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {restaurant.points_per_visit} point{restaurant.points_per_visit === 1 ? "" : "s"} per
          visit
        </p>
      </div>

      <AddCustomerForm />

      {/* Desktop / tablet: table */}
      <Card className="hidden overflow-hidden sm:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/40 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Points</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {(customers ?? []).map((customer) => (
                <tr key={customer.id} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{customer.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {customer.email ?? customer.phone}
                  </td>
                  <td className="px-4 py-3 text-foreground">{customer.points_balance}</td>
                  <td className="px-4 py-3">
                    <CustomerActions customerId={customer.id} customerName={customer.full_name} />
                  </td>
                </tr>
              ))}
              {(customers ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                    No customers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {(customers ?? []).map((customer) => (
          <Card key={customer.id}>
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{customer.full_name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {customer.email ?? customer.phone}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-foreground">
                  {customer.points_balance} pts
                </p>
              </div>
              <CustomerActions customerId={customer.id} customerName={customer.full_name} />
            </CardContent>
          </Card>
        ))}
        {(customers ?? []).length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">No customers yet.</p>
        )}
      </div>
    </div>
  );
}
