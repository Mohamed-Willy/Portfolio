import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
});

const description =
  "Senior & Lead Unity Developer in Cairo. 5+ years building gameplay systems, VR experiences and multiplayer backends with Unity, C#, Photon and Node.js.";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohamed Waled | Unity & VR Developer",
  description,
  keywords: [
    "Unity developer",
    "VR developer",
    "game developer",
    "C#",
    "Photon",
    "Cairo",
    "Egypt",
    "Mohamed Waled",
  ],
  authors: [{ name: "Mohamed Waled" }],
  openGraph: {
    title: "Mohamed Waled | Unity & VR Developer",
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
    title: "Mohamed Waled | Unity & VR Developer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
