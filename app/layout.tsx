import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "D×MirAI",
    template: "%s | D×MirAI",
  },
  description: "最先端のAI技術とその応用に関する洞察を提供するブログ",
  keywords: ["AI", "人工知能", "機械学習", "ディープラーニング", "テクノロジー"],
  authors: [
    {
      name: "D×MirAI",
      url: "https://dxmirai.com",
    },
  ],
  creator: "D×MirAI",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://dxmirai.com",
    title: "D×MirAI",
    description: "最先端のAI技術とその応用に関する洞察を提供するブログ",
    siteName: "D×MirAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "D×MirAI",
    description: "最先端のAI技術とその応用に関する洞察を提供するブログ",
    creator: "@dxmirai",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://pursuit-of-factfulness.com/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'