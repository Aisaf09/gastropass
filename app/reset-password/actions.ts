"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updatePassword(
  _prevState: string | undefined,
  formData: FormData,
) {
  const password = String(formData.get("password") ?? "");

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return error.message;
  }

  redirect("/dashboard");
}
