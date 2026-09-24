import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gastropass.app";
const SITE_NAME = "GastroPass";
const SITE_DESCRIPTION =
  "GastroPass turns restaurant loyalty into a native Apple Wallet or Google Wallet pass. Issue digital loyalty cards, update points in real time, and send lock-screen push notifications without an app.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GastroPass — Digital Loyalty Passes for Restaurants",
    template: "%s | GastroPass",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "digital loyalty card",
    "apple wallet pass",
    "google wallet pass",
    "restaurant loyalty program",
    "pkpass generator",
    "loyalty pass push notifications",
  ],
  alternates: {
    canonical: "/",
  },
  applicationName: SITE_NAME,
  authors: [{ name: "GastroPass" }],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "GastroPass — Digital Loyalty Passes for Restaurants",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GastroPass — Digital Loyalty Passes for Restaurants",
    description: SITE_DESCRIPTION,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GastroPass",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-icon`,
  description: SITE_DESCRIPTION,
  sameAs: [] as string[],
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GastroPass",
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, Android, Web",
  description: SITE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "0",
  },
};

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(softwareApplicationJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
