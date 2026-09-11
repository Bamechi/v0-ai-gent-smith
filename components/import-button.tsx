"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Database } from "lucide-react"

export function ImportButton() {
  const [isImporting, setIsImporting] = useState(false)
  const [status, setStatus] = useState("")

  const handleImport = async () => {
    if (!confirm("This will import all 583 tools from the CSV. Continue?")) return

    setIsImporting(true)
    setStatus("Starting import...")

    try {
      const response = await fetch("/api/bulk-import-csv", { method: "POST" })
      const result = await response.json()

      if (result.success) {
        setStatus(`✓ Success! Imported: ${result.imported}, Skipped: ${result.skipped}`)
        setTimeout(() => window.location.reload(), 2000)
      } else {
        setStatus(`✗ Failed: ${result.error}`)
        setIsImporting(false)
      }
    } catch (error: any) {
      setStatus(`✗ Error: ${error.message}`)
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleImport}
        disabled={isImporting}
        size="lg"
        className="bg-green text-white hover:bg-green/90 font-bold uppercase"
      >
        <Database className="mr-2 h-5 w-5" />
        {isImporting ? "Importing..." : "Import All 583 Tools from CSV"}
      </Button>
      {status && <p className="text-sm mono-description text-black font-medium">{status}</p>}
    </div>
  )
}
