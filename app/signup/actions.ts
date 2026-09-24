"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(_prevState: string | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return "Enter your email and password.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return error.message;
  }

  // Email confirmation may be required by the Supabase project's auth
  // settings, in which case there's no session yet.
  if (!data.session) {
    redirect("/login?confirmEmail=1");
  }

  redirect("/dashboard/onboarding");
}
