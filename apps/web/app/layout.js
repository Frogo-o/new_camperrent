import "./globals.css";
import Script from "next/script";
import ToasterClient from "../components/ToasterClient";
import LayoutShell from "../components/LayoutShell";
import { GA_TRACKING_ID, GOOGLE_ADS_ID } from "../lib/gtag";

const SITE_URL = String(process.env.NEXT_PUBLIC_SITE_URL || "https://camper-rent.bg").replace(/\/$/, "");

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Camper Rent | Кемпери под наем и оборудване за кемпери",
  description:
    "Camper Rent предлага кемпери под наем, кемпери за продажба, сервиз и онлайн магазин за къмпинг и кемпер оборудване.",
  openGraph: {
    siteName: "Camper Rent",
    type: "website",
    locale: "bg_BG",
  },
};

export default function RootLayout({ children }) {
  const googleAdsConfig = GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : "";

  return (
    <html lang="bg">
      <body>
        <ToasterClient />
        <LayoutShell>{children}</LayoutShell>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
            ${googleAdsConfig}
          `}
        </Script>
      </body>
    </html>
  );
}
