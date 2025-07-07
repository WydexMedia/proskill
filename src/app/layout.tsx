import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";  // ✅ Import Next.js Script

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resin mixing calculator | Use Resin Calculator for Accurate Art Projects",
  keywords:"Resin Mixing Calculator for Art |  Measure & Mix Perfectly",
  description: "Resin Mixing Calculator. Use Resin Calculator for Accurate Art Projects to plan, measure, and mix perfectly every time. Free tool for flawless pours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Scripts */}
        <meta name="google-site-verification" content="bn39xK-3Obdr-F2x0V9MtGRn1-Q1wxDkCGhvSkQp8t8" />
        <link rel="canonical" href="https://calculator.proskilledu.com/" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-938MTSDRFJ"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-938MTSDRFJ');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
