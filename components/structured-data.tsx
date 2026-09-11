export function StructuredData({ type = "website" }: { type?: "website" | "tool" }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AiGENT SMITH",
    description: "The ultimate directory of AI tools and applications",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://aigent-smith.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://aigent-smith.com"}/?search={search_term_string}`,
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
