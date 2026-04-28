import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, DM_Sans, Antonio } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

import Footer from "@/components/layout/Footer";
import { Web3Provider } from "@/providers/Web3Provider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.echinstitute.org"),
  title: {
    default: "ECH Institute Ethereum Protocol Governance & Coordination",
    template: "%s | ECH Institute",
  },
  description:
    "ECH Institute is a 501(c)(3) non-profit supporting Ethereum's protocol governance, EIP coordination, and community education as a neutral public good. Founded July 2024.",
  keywords: [
    "ECH Institute",
    "Ethereum governance",
    "EIP coordination",
    "Ethereum Improvement Proposals",
    "protocol governance",
    "PEEPanEIP",
    "blockchain education",
    "Ethereum community",
    "WiEP",
    "Women in Ethereum Protocol",
    "All Core Devs",
    "decentralized governance",
    "public good",
    "nonprofit Ethereum",
  ],
  authors: [{ name: "ECH Institute", url: "https://www.echinstitute.org" }],
  creator: "ECH Institute",
  publisher: "ECH Institute",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.echinstitute.org",
    siteName: "ECH Institute",
    title: "ECH Institute Ethereum Protocol Governance & Coordination",
    description:
      "Supporting Ethereum's protocol governance and coordination — helping the ecosystem scale responsibly and sustainably.",
    images: [
      {
        url: "/assets/logo/ECH Institute Logo - White.png",
        width: 1200,
        height: 630,
        alt: "ECH Institute Ethereum Protocol Governance & Coordination",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECH Institute Ethereum Protocol Governance & Coordination",
    description:
      "Supporting Ethereum's protocol governance, EIP coordination, and community education as a neutral 501(c)(3) public good.",
    images: ["/assets/logo/ECH Institute Logo - White.png"],
    creator: "@ECHinstitute",
    site: "@ECHinstitute",
  },
  icons: {
    icon: [{ url: "/assets/logo/ECH Institute Logo - White.png", type: "image/png" }],
    apple: "/assets/logo/ECH Institute Logo - White.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
  alternates: {
    canonical: "https://www.echinstitute.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ECH Institute",
              alternateName: "ECH Institute Inc.",
              url: "https://www.echinstitute.org",
              logo: "https://www.echinstitute.org/assets/logo/ECH Institute Logo - White.png",
              description:
                "ECH Institute is a 501(c)(3) non-profit supporting Ethereum's protocol governance, EIP coordination, and community education as a neutral public good.",
              foundingDate: "2024-07-11",
              email: "team@ethcatherders.com",
              sameAs: [
                "https://x.com/ECHinstitute",
                "https://github.com/echinstitute",
                "https://www.youtube.com/@echinstitute",
                "https://www.linkedin.com/company/ethereum-cat-herders/",
              ],
              nonprofitStatus: "Nonprofit501c3",
              areaServed: "Worldwide",
            }),
          }}
        />
        {/* Structured Data — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ECH Institute",
              url: "https://www.echinstitute.org",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.echinstitute.org/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} ${antonio.variable} antialiased theme-dark dark`}
      >
        <ThemeProvider>
          <Web3Provider>
            <header>
              <Navigation />
            </header>
            <main className="w-full" style={{ paddingTop: 'calc(var(--nav-height, 5.5rem) + 36px)' }}>
              {children}
            </main>
            <Footer />
            <Toaster />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
