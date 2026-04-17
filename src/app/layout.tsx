import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import RegisterServiceWorker from "./register-service-worker";
import Providers from "./providers";
import "./globals.css";
import AxeptioWidget from "./components/AxeptioWidget";
import {
  defaultOgImage,
  defaultOgImageHeight,
  defaultOgImageWidth,
  siteDescription,
  siteName,
  siteUrl,
  toAbsoluteUrl,
} from "@/lib/seo";

const ppMori = localFont({
  src: [
    { path: "../fonts/ppmori/PPMori-Extralight.otf", weight: "200", style: "normal" },
    { path: "../fonts/ppmori/PPMori-ExtralightItalic.otf", weight: "200", style: "italic" },
    { path: "../fonts/ppmori/PPMori-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/ppmori/PPMori-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../fonts/ppmori/PPMori-Semibold.otf", weight: "600", style: "normal" },
    { path: "../fonts/ppmori/PPMori-SemiboldItalic.otf", weight: "600", style: "italic" },
    { path: "../fonts/ppmori/PPMori-Black.otf", weight: "900", style: "normal" },
    { path: "../fonts/ppmori/PPMori-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-pp-mori",
  display: "swap",
});

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
        width: defaultOgImageWidth,
        height: defaultOgImageHeight,
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
    <html lang="fr" className={`h-full antialiased ${ppMori.variable}`}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`min-h-full flex flex-col font-sans ${ppMori.className}`}>
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
