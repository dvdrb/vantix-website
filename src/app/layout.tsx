import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import ScrollManager from "./components/ScrollManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | VANTIX - Soluții Software Inovative",
    default:
      "VANTIX - Soluții Software Inovative | DataSight & Dezvoltare Custom",
  },
  description:
    "VANTIX oferă soluții software inovative în România. Specializați în DataSight pentru analiza datelor, dezvoltare aplicații web și mobile, consultanță IT și servicii de digitalizare pentru afaceri moderne.",
  keywords: [
    "VANTIX",
    "software România",
    "DataSight",
    "dezvoltare aplicații",
    "soluții IT",
    "analiza datelor",
    "aplicații web",
    "aplicații mobile",
    "consultanță IT",
    "digitalizare",
    "Adrian Hănțăscu",
    "Alexandru Hănțăscu",
    "Soft & Mark",
    "tehnologie",
    "inovație",
    "business intelligence",
    "custom software",
  ],
  authors: [
    { name: "Adrian Hănțăscu", url: "https://vantix.ro" },
    { name: "Alexandru Hănțăscu", url: "https://vantix.ro" },
  ],
  creator: "VANTIX Team",
  publisher: "VANTIX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vantix.ro"),
  alternates: {
    canonical: "/",
    languages: {
      "ro-RO": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://vantix.ro",
    title:
      "VANTIX - Soluții Software Inovative | DataSight & Dezvoltare Custom",
    description:
      "Specializați în DataSight pentru analiza datelor, dezvoltare aplicații web și mobile, consultanță IT și servicii de digitalizare pentru afaceri moderne în România.",
    siteName: "VANTIX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VANTIX - Soluții Software Inovative",
      },
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "VANTIX Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VANTIX - Soluții Software Inovative",
    description:
      "Specializați în DataSight pentru analiza datelor și dezvoltare aplicații custom în România.",
    images: ["/twitter-image.png"],
    creator: "@vantix_ro",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "business:contact_data:street_address": "România",
    "business:contact_data:locality": "București",
    "business:contact_data:region": "București",
    "business:contact_data:postal_code": "010000",
    "business:contact_data:country_name": "România",
    "business:contact_data:email": "contact@vantix.ro",
    "business:contact_data:phone_number": "+40745306164",
    "business:contact_data:website": "https://vantix.ro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollManager />
        <Header />
        {children}
      </body>
    </html>
  );
}
