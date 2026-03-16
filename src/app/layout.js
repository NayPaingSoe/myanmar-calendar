import "./globals.css";

export const metadata = {
  title: {
    default: "Myanmar Calendar | မြန်မာပြက္ခဒိန်",
    template: "%s | Myanmar Calendar",
  },
  description:
    "Myanmar Calendar (မြန်မာပြက္ခဒိန်) with 4-month and month views, Myanmar date details, moon phases, and Myanmar public holidays.",
  applicationName: "Myanmar Calendar",
  keywords: [
    "Myanmar Calendar",
    "မြန်မာပြက္ခဒိန်",
    "Myanmar date",
    "Burmese calendar",
    "Myanmar holidays",
    "moon phase",
  ],
  category: "calendar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "my_MM",
    title: "Myanmar Calendar | မြန်မာပြက္ခဒိန်",
    description:
      "Myanmar Calendar (မြန်မာပြက္ခဒိန်) with month and 4-month views, Myanmar date details, moon phases, and holidays.",
    siteName: "Myanmar Calendar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myanmar Calendar | မြန်မာပြက္ခဒိန်",
    description:
      "Explore Myanmar dates, moon phases, and public holidays in month and 4-month calendar views.",
  },
};

export default function RootLayout({ children }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Myanmar Calendar",
    alternateName: "မြန်မာပြက္ခဒိန်",
    description:
      "Myanmar Calendar with Myanmar month/day details, moon phases, and public holidays.",
    inLanguage: ["my", "en"],
  };

  return (
    <html lang="my">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
