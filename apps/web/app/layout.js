import "./globals.css";
import Script from "next/script";
import ToasterClient from "../components/ToasterClient";
import LayoutShell from "../components/LayoutShell";
import { GA_TRACKING_ID, GOOGLE_ADS_ID } from "../lib/gtag";

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
