"use client";

import { useActionState } from "react";
import Link from "next/link";
import { IdCard, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addVisit, deleteCustomer } from "./actions";

export function CustomerActions({
  customerId,
  customerName,
}: {
  customerId: string;
  customerName: string;
}) {
  const [, runAddVisit, visitPending] = useActionState(async () => {
    await addVisit(customerId);
  }, undefined);

  const [, runDeleteCustomer, deletePending] = useActionState(async () => {
    await deleteCustomer(customerId);
  }, undefined);

  const pending = visitPending || deletePending;

  return (
    <div className="flex items-center justify-end gap-1">
      <Button asChild variant="ghost" size="sm" className="min-h-11 min-w-11">
        <Link href={`/card/${customerId}`}>
          <IdCard />
          Card
        </Link>
      </Button>
      <form action={runAddVisit}>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={pending}
          className="min-h-11 min-w-11"
        >
          {visitPending ? <Loader2 className="animate-spin" /> : <Plus />}
          Visit
        </Button>
      </form>
      <form action={runDeleteCustomer}>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={pending}
          aria-label={`Delete ${customerName}`}
          className="min-h-11 min-w-11"
        >
          {deletePending ? (
            <Loader2 className="animate-spin text-destructive" />
          ) : (
            <Trash2 className="text-destructive" />
          )}
        </Button>
      </form>
    </div>
  );
}
