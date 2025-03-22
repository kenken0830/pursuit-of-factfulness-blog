"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SocialShareButtonsProps {
  title: string
  url?: string
}

export function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
  const { toast } = useToast()
  const shareUrl = url || typeof window !== "undefined" ? window.location.href : ""

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "リンクをコピーしました",
      description: "記事のリンクがクリップボードにコピーされました。",
    })
  }

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "width=600,height=400")
  }

  const shareOnTwitter = () => {
    openShareWindow(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    )
  }

  const shareOnFacebook = () => {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
  }

  const shareOnLinkedIn = () => {
    openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">共有:</span>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={shareOnTwitter}>
        <Twitter className="h-4 w-4" />
        <span className="sr-only">Twitterで共有</span>
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={shareOnFacebook}>
        <Facebook className="h-4 w-4" />
        <span className="sr-only">Facebookで共有</span>
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={shareOnLinkedIn}>
        <Linkedin className="h-4 w-4" />
        <span className="sr-only">LinkedInで共有</span>
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleCopyLink}>
        <Link2 className="h-4 w-4" />
        <span className="sr-only">リンクをコピー</span>
      </Button>
    </div>
  )
}

