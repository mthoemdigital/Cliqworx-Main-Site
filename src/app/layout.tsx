import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Script from "next/script";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const GA_ID = "G-YF05MJFQY3";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://cliqworx.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CliqWorx: Strategy. Technology. Growth.",
    template: "%s | CliqWorx",
  },
  description:
    "CliqWorx is an AI-first digital consultancy helping ambitious businesses transform, build and grow. Strategy, technology and performance marketing, working as one system.",
  keywords: [
    "digital consultancy",
    "digital strategy",
    "AI readiness",
    "web application development",
    "performance marketing",
    "CliqWorx",
  ],
  authors: [{ name: "CliqWorx" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: "CliqWorx",
    title: "CliqWorx: Strategy. Technology. Growth.",
    description:
      "CliqWorx is an AI-first digital consultancy helping ambitious businesses transform, build and grow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CliqWorx: Strategy. Technology. Growth.",
    description:
      "CliqWorx is an AI-first digital consultancy helping ambitious businesses transform, build and grow.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        {/* Microsoft Clarity (loads async on every page; injected script tag carries async=1) */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);
    t.async=1;
    t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xp4kkg78j5");`}
        </Script>
      </body>
    </html>
  );
}
