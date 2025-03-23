import NvidiaGTC2025Report from "@/components/NvidiaGTC2025Report"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "NVIDIA GTC 2025春 発表内容資料 | Pursuit of Factfulness",
  description: "GTC 2025春で発表されたDGX Spark、Blackwellアーキテクチャ、AIエコシステムについての詳細レポート",
  openGraph: {
    title: "NVIDIA GTC 2025春 発表内容資料",
    description: "GTC 2025春で発表されたDGX Spark、Blackwellアーキテクチャ、AIエコシステムについての詳細レポート",
    type: "article",
    images: [
      {
        url: "/placeholder.svg?height=600&width=800",
        width: 1200,
        height: 630,
        alt: "NVIDIA GTC 2025春 発表内容資料",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NVIDIA GTC 2025春 発表内容資料",
    description: "GTC 2025春で発表されたDGX Spark、Blackwellアーキテクチャ、AIエコシステムについての詳細レポート",
    images: ["/placeholder.svg?height=600&width=800"],
  },
}

export default function NvidiaGTCReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <NvidiaGTC2025Report />
    </div>
  )
}
