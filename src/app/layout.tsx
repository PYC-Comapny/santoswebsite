import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Fix Roofing LLC | Tampa's #1 Premium Roofing",
  description: "Expert roofing solutions in Tampa. Specialized in repairs, replacements, and storm damage. Get your free inspection today.",
  metadataBase: new URL('https://fixroofing.com'), // Replace with actual domain when live
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Fix Roofing LLC - Tampa's Premier Roofing Experts",
    description: "Expert roofing services in Tampa, FL. Quality repairs, full replacements, and storm damage restoration. Licensed & Insured (CCC1336136).",
    url: "/",
    siteName: "Fix Roofing LLC",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "Fix Roofing LLC - Tampa's #1 Roofer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fix Roofing LLC | Tampa's #1 Premium Roofing",
    description: "Expert roofing solutions in Tampa. Specialized in repairs, replacements, and storm damage.",
    images: ["/og-main.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "Fix Roofing LLC",
    "image": "https://fixroofing.com/og-main.png",
    "url": "https://fixroofing.com",
    "telephone": "+18131234567", // Placeholder
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tampa Service Area",
      "addressLocality": "Tampa",
      "addressRegion": "FL",
      "postalCode": "33601",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.9506,
      "longitude": -82.4572
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "07:00",
      "closes": "19:00"
    },
    "sameAs": [
      // Add social media links here
    ],
    "priceRange": "$$",
    "areaServed": "Tampa, FL"
  };

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} antialiased`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
