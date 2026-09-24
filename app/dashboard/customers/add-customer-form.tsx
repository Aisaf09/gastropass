"use client";

import { useActionState, useRef, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { addCustomer } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddCustomerForm() {
  const [error, formAction, pending] = useActionState(addCustomer, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !error) {
      formRef.current?.reset();
    }
  }, [pending, error]);

  return (
    <Card>
      <CardContent className="p-6">
        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3"
        >
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="fullName">Name</Label>
            <Input id="fullName" name="fullName" type="text" required />
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          <Button type="submit" disabled={pending}>
            <UserPlus />
            {pending ? "Adding..." : "Add customer"}
          </Button>

          {error && <p className="text-sm text-destructive sm:basis-full">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
