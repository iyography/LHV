import type { Metadata } from "next";
import { Parisienne, Cormorant_Garamond, Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const parisienne = Parisienne({
  weight: "400",
  variable: "--font-parisienne",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Feel Fully Alive Again",
  description: "Calm your mind. Heal yourself. Take back your inner power. Energy healing, Qigong, Reiki, and Daoist wisdom guided by a lifetime of practice.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Feel Fully Alive Again",
    description: "Calm your mind. Heal yourself. Take back your inner power. Energy healing, Qigong, Reiki, and Daoist wisdom guided by a lifetime of practice.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Feel Fully Alive Again",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feel Fully Alive Again",
    description: "Calm your mind. Heal yourself. Take back your inner power. Energy healing, Qigong, Reiki, and Daoist wisdom guided by a lifetime of practice.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${parisienne.variable} ${cormorant.variable} ${spaceGrotesk.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
