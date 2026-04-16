import type { Metadata, Viewport } from "next";
import RegisterServiceWorker from "./register-service-worker";
import Providers from "./providers";
import "./globals.css";
import AxeptioWidget from "./components/AxeptioWidget";

export const metadata: Metadata = {
  title: "Solimouv' - Festival Sport & Inclusion",
  description:
    "Solimouv' est le festival organisé par Up Sport ! qui promeut l'accessibilité du sport pour toutes et tous.",
  manifest: "/site.webmanifest",
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
