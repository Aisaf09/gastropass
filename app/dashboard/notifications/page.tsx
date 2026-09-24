import { redirect } from "next/navigation";
import { getOwnerRestaurant } from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DraftNotificationForm } from "./draft-notification-form";

export default async function NotificationsPage() {
  const restaurant = await getOwnerRestaurant();

  if (!restaurant) {
    redirect("/dashboard/onboarding");
  }

  const supabase = await createClient();
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Draft messages for your customers. Sending isn&apos;t connected yet — an
          email or SMS provider needs to be configured before these actually
          reach anyone.
        </p>
      </div>

      <DraftNotificationForm />

      <div className="flex flex-col gap-3">
        {(notifications ?? []).map((notification) => (
          <Card key={notification.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{notification.title}</p>
                <Badge variant={notification.sent_at ? "default" : "outline"}>
                  {notification.sent_at ? "Sent" : "Draft — not sent"}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Would reach {notification.recipient_count} customer
                {notification.recipient_count === 1 ? "" : "s"}
              </p>
            </CardContent>
          </Card>
        ))}
        {(notifications ?? []).length === 0 && (
          <p className="text-center text-sm text-muted-foreground">No drafts yet.</p>
        )}
      </div>
    </div>
  );
}
