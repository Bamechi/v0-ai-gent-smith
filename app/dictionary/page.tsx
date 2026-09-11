import { Suspense } from "react"
import { DictionaryContent } from "@/components/dictionary-content"

export default function DictionaryPage() {
  return (
    <Suspense fallback={null}>
      <DictionaryContent />
    </Suspense>
  )
}
