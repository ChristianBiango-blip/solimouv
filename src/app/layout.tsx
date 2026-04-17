import type { Metadata, Viewport } from "next";
import RegisterServiceWorker from "./register-service-worker";
import Providers from "./providers";
import "./globals.css";
import AxeptioWidget from "./components/AxeptioWidget";
import {
  defaultOgImage,
  siteDescription,
  siteName,
  siteUrl,
  toAbsoluteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteName} - Festival Sport & Inclusion`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName,
    title: `${siteName} - Festival Sport & Inclusion`,
    description: siteDescription,
    images: [
      {
        url: toAbsoluteUrl(defaultOgImage),
        alt: "Festival Solimouv' à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Festival Sport & Inclusion`,
    description: siteDescription,
    images: [toAbsoluteUrl(defaultOgImage)],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Solimouv'",
  },
};

export const viewport: Viewport = {
  themeColor: "#4200FE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-[100] rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-primary shadow-lg focus:not-sr-only focus:outline-none focus:ring-4 focus:ring-brand-primary/30"
        >
          Aller au contenu
        </a>
        <Providers>
          <RegisterServiceWorker />
          <div>
            {children}
          </div>
          <AxeptioWidget />
        </Providers>
      </body>
    </html>
  );
}
