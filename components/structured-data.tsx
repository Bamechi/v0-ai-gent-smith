import { getSiteUrl } from "@/lib/site-url"

export function StructuredData({ type = "website" }: { type?: "website" | "tool" }) {
  const siteUrl = getSiteUrl()

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AiGENT SMITH",
    description: "The ultimate directory of AI tools and applications",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema),
      }}
    />
  )
}
