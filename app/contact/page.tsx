import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sendContactForm } from "@/lib/actions"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us for questions, feedback, or collaboration opportunities.",
}

export default function ContactPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="text-muted-foreground md:text-xl">Have questions or feedback? We'd love to hear from you.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={sendContactForm}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Your email address" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What is this regarding?" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message" className="min-h-[150px]" required />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-2 border-t p-6">
            <h3 className="text-lg font-medium">Alternative ways to reach us</h3>
            <p className="text-sm text-muted-foreground">
              You can also reach us at{" "}
              <a href="mailto:contact@pursuit-of-factfulness.com" className="font-medium underline underline-offset-4">
                contact@pursuit-of-factfulness.com
              </a>{" "}
              or follow us on social media.
            </p>
            <div className="flex space-x-4 mt-2">
              <Button variant="outline" size="sm">
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                LinkedIn
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

