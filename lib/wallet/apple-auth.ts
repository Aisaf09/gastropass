import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { Database } from "@/lib/supabase/database.types";

type PassRow = Database["public"]["Tables"]["passes"]["Row"];

export function requirePassTypeIdentifier(passTypeIdentifier: string): boolean {
  return passTypeIdentifier === process.env.APPLE_PASS_TYPE_IDENTIFIER;
}

/**
 * Verifies the `Authorization: ApplePass <token>` header the wallet app
 * sends on every web service call against the pass's stored auth token.
 * Returns the pass row on success, or null if the caller should respond 401.
 */
export async function authenticateApplePassRequest(
  serialNumber: string,
  authorizationHeader: string | null,
): Promise<PassRow | null> {
  const token = authorizationHeader?.match(/^ApplePass (.+)$/)?.[1];
  if (!token) return null;

  const supabase = createServiceRoleClient();
  const { data: pass } = await supabase
    .from("passes")
    .select("*")
    .eq("serial_number", serialNumber)
    .eq("platform", "apple")
    .maybeSingle();

  if (!pass || pass.apple_auth_token !== token) return null;
  return pass;
}
