import "./globals.css";
import Script from "next/script";
import ToasterClient from "../components/ToasterClient";
import LayoutShell from "../components/LayoutShell";

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body>
        <ToasterClient />
        <LayoutShell>{children}</LayoutShell>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PM4GG76SWF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PM4GG76SWF');
          `}
        </Script>
      </body>
    </html>
  );
}