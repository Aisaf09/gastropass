import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="September 22, 2026">
      <p>
        GastroPass (&quot;we&quot;, &quot;us&quot;) provides digital loyalty cards that restaurants
        issue to their own customers through Apple Wallet, Google Wallet, or a web fallback. This
        policy explains what data we collect and how it&apos;s used.
      </p>

      <div>
        <h2>Restaurant accounts</h2>
        <p className="mt-2">
          If you sign up as a restaurant owner, we store your email address and the details you
          provide about your business (name, brand color, points-per-visit rule) to operate your
          account and generate your loyalty passes.
        </p>
      </div>

      <div>
        <h2>Customer data</h2>
        <p className="mt-2">
          When a restaurant&apos;s customer joins a loyalty program, we collect only their{" "}
          <strong>name and phone number</strong> (or email, if provided), used solely to identify
          their card and track their points balance at that restaurant. This data is controlled by
          the restaurant that issued the card — we process it on their behalf and do not sell it or
          share it with any third party for marketing purposes.
        </p>
      </div>

      <div>
        <h2>Wallet passes</h2>
        <p className="mt-2">
          Apple Wallet and Google Wallet receive only what&apos;s needed to display and update the
          pass: the customer&apos;s name, points balance, and the restaurant&apos;s branding. Point
          updates are pushed directly to the device through Apple&apos;s and Google&apos;s wallet
          services.
        </p>
      </div>

      <div>
        <h2>Data retention</h2>
        <p className="mt-2">
          Customer records are kept for as long as the restaurant&apos;s account is active, or until
          the restaurant removes them. Restaurant owners can request deletion of a customer&apos;s
          data at any time from their dashboard.
        </p>
      </div>

      <div>
        <h2>Contact</h2>
        <p className="mt-2">
          Questions about this policy or a request to access or delete your data can be sent to the
          restaurant that issued your card, or directly to us.
        </p>
      </div>
    </LegalShell>
  );
}
