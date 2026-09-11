import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubmitToolForm } from "@/components/submit-tool-form"

export const metadata = {
  title: "Submit Your AI Tool | AiGENT SMITH",
  description: "Add your AI tool to the AiGENT SMITH directory. Reach thousands of users looking for AI solutions.",
}

export default function SubmitPage() {
  return (
    <div className="grid-bg flex min-h-screen flex-col bg-paper pt-16">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Submit Your AI Tool</h1>
              <p className="text-lg text-muted-foreground text-balance leading-relaxed">
                Share your AI tool with our community. Fill out the form below to get listed in our directory.
              </p>
            </div>

            <SubmitToolForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
