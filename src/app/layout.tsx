import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ChristmasEffects from '@/components/ChristmasEffects';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://neilbakery.lk'),
  title: {
    default: "Neil Bakery | Crafting Happiness In Every Bite",
    template: "%s | Neil Bakery"
  },
  description:
    "Neil Bakery - Sri Lanka's trusted bakery since 1990. Fresh breads, cakes, pastries & drinks daily in Moratuwa, Egoda Uyana & Korelawella. Quality ingredients, traditional recipes. Order now!",
  keywords: [
    'Neil Bakery',
    'bakery Sri Lanka',
    'Moratuwa bakery',
    'Egoda Uyana bakery',
    'Korelawella bakery',
    'fresh bread Sri Lanka',
    'birthday cakes Moratuwa',
    'wedding cakes',
    'pastries',
    'fresh baked goods',
    'traditional bakery',
    'Sri Lankan bakery'
  ],
  authors: [{ name: "Neil Bakery", url: "https://neilbakery.lk" }],
  creator: "Neil Bakery",
  publisher: "Neil Bakery",
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_LK',
    url: 'https://neilbakery.lk',
    siteName: "Neil Bakery",
    title: "Neil Bakery | Crafting Happiness In Every Bite",
    description: "Sri Lanka's trusted bakery since 1990. Fresh breads, cakes, pastries & drinks daily. Visit our outlets in Moratuwa, Egoda Uyana & Korelawella.",
    images: [
      {
        url: '/neli_banner.png',
        width: 1200,
        height: 630,
        alt: 'Neil Bakery - Fresh Baked Goods',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "Neil Bakery | Crafting Happiness In Every Bite",
    description: "Sri Lanka's trusted bakery since 1990. Fresh breads, cakes, pastries & drinks daily.",
    images: ['/neli_banner.png'],
    creator: '@neilbakery',
  },

  // Additional Meta Tags
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

  // Verification
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // Alternate Languages (if needed in future)
  alternates: {
    canonical: 'https://neilbakery.lk',
    languages: {
      'en-LK': 'https://neilbakery.lk',
    },
  },

  // Category
  category: 'food',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced Structured Data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Neil Bakery",
    "url": "https://neilbakery.lk",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://neilbakery.lk/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Neil Bakery",
    "alternateName": "Neil's Bakery",
    "url": "https://neilbakery.lk",
    "logo": "https://neilbakery.lk/logo.png",
    "image": "https://neilbakery.lk/neli_banner.png",
    "description": "Sri Lanka's trusted bakery since 1990, serving fresh breads, cakes, pastries and drinks daily.",
    "foundingDate": "1990",
    "founder": {
      "@type": "Person",
      "name": "Mr. Neil"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "St.Annes Lane Katukurunda",
      "addressLocality": "Moratuwa",
      "addressRegion": "Western Province",
      "postalCode": "10400",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "6.7731",
      "longitude": "79.8816"
    },
    "telephone": "+94771544293",
    "email": "info@neilbakery.lk",
    "priceRange": "$$",
    "servesCuisine": "Bakery",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "06:00",
        "closes": "21:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/neilbakery",
      "https://www.instagram.com/neilbakery"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://neilbakery.lk"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Viewport and Theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#e98d1a" />
        <meta name="color-scheme" content="light" />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="R0i4dpTGCUP13pQ2wc1osCPUuIW1fc8Gjyh-_3XIvbc" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ChristmasEffects />
        {children}
      </body>
    </html>
  );
}
