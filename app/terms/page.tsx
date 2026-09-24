import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="September 22, 2026">
      <p>
        These terms cover the use of GastroPass by restaurant owners who create an account, and by
        the customers who join a loyalty program through a GastroPass link or QR code.
      </p>

      <div>
        <h2>Using GastroPass</h2>
        <p className="mt-2">
          By creating a restaurant account, you confirm you&apos;re authorized to represent that
          business and to collect loyalty information from its customers. You&apos;re responsible
          for the accuracy of the information you publish on your public loyalty page.
        </p>
      </div>

      <div>
        <h2>Acceptable use</h2>
        <p className="mt-2">
          Accounts may not be used to collect data for any purpose other than operating a loyalty
          program, to impersonate another business, or to send unsolicited notifications unrelated
          to the loyalty program.
        </p>
      </div>

      <div>
        <h2>Service availability</h2>
        <p className="mt-2">
          GastroPass is provided on a best-effort basis. Wallet pass delivery depends on Apple and
          Google&apos;s own wallet services, which are outside our control.
        </p>
      </div>

      <div>
        <h2>Account termination</h2>
        <p className="mt-2">
          You may close your restaurant account at any time. We may suspend accounts that violate
          these terms or misuse customer data.
        </p>
      </div>

      <div>
        <h2>Changes</h2>
        <p className="mt-2">
          We may update these terms as the product evolves. Continued use of GastroPass after a
          change means you accept the updated terms.
        </p>
      </div>
    </LegalShell>
  );
}
