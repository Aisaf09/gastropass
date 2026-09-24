"use server";

import { createClient } from "@/lib/supabase/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gastropass.app";

export async function requestPasswordReset(
  _prevState: string | undefined,
  formData: FormData,
) {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return "Enter your email.";
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/auth/callback?type=recovery`,
  });

  // Always the same response, whether or not the email exists, so this
  // can't be used to check which emails have an account.
  return "If an account exists for that email, a reset link is on its way.";
}
