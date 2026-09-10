import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Submission Successful | AiGENT SMITH",
  description: "Your AI tool has been successfully submitted.",
}

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card className="border-primary/50">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Tool Submitted Successfully!</CardTitle>
              <CardDescription>Your AI tool has been added to the directory.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground leading-relaxed">
                Thank you for contributing to the AiGENT SMITH community. Your tool is now live and discoverable by
                thousands of users looking for AI solutions.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild>
                  <Link href="/">View All Tools</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/submit">Submit Another Tool</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
