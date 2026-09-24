"use client";

import { useActionState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { draftNotification } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function DraftNotificationForm() {
  const [error, formAction, pending] = useActionState(draftNotification, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !error) {
      formRef.current?.reset();
    }
  }, [pending, error]);

  return (
    <Card>
      <CardContent className="p-6">
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={3} required />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={pending} className="self-start">
            <Send />
            {pending ? "Saving..." : "Save draft"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
