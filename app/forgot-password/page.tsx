"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { requestPasswordReset } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth-shell";

export default function ForgotPasswordPage() {
  const [message, formAction, pending] = useActionState(requestPasswordReset, undefined);

  return (
    <AuthShell>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter your email and we&apos;ll send you a reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>

            {message && (
              <p className="flex items-start gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
                <Mail className="mt-0.5 size-4 shrink-0" />
                {message}
              </p>
            )}

            <Button type="submit" disabled={pending} className="mt-2">
              <Send />
              {pending ? "Sending..." : "Send reset link"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">
              Back to log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
