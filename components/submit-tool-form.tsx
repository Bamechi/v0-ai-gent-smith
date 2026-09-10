"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Loader2 } from "lucide-react"
import { submitTool } from "@/app/actions/submit-tool"

const CATEGORIES = [
  "Design & Branding",
  "Writing & Copywriting",
  "Marketing & SEO",
  "Revenue (Sales & Commerce)",
  "Chatbots & Assistants",
  "Images (Create & Edit)",
  "Video (Create & Edit)",
  "Audio / Voice / Music",
  "Productivity & Notes",
  "Research & Knowledge",
  "Data & Analytics",
  "Coding & Developer Tools",
  "Automation & Agents (Workflows)",
  "Meetings (Transcription & Action Items)",
  "Docs, Forms & Data Capture",
  "HR & Recruiting",
  "App & App Builder / Support",
  "Cybersecurity & Privacy",
  "Niche / Other",
]

const AVAILABLE_TAGS = [
  "Ads creative",
  "Agentic / autonomous",
  "API available",
  "Automation workflows",
  "Brand kit",
  "Captions",
  "Clip repurposing",
  "Customer support",
  "Data privacy-focused",
  "Document / PDF tools",
  "Dubbing",
  "E-commerce listings",
  "Email assistant",
  "Finance",
  "Forms / intake",
  "Freemium",
  "Image generator",
  "Image-to-video",
  "Invoice & bookkeeping",
  "Knowledge base",
  "Lead generation",
  "Legal",
  "Lip-sync",
  "Logo maker",
  "Meeting notes",
  "Mobile app",
  "Mockups",
  "Motion graphics",
  "Multilingual",
  "Music",
  "Object remover",
  "Open source",
  "Paid",
  "Photo editor",
  "Podcast",
  "Presentation builder",
  "Privacy-first",
  "Sales outreach",
  "Scheduling / calendar",
  "SEO",
  "Subtitles",
  "Summarizer",
  "Talking avatar",
  "Templates",
  "Thumbnail generator",
  "Transcription",
  "Upscaler",
  "VFX / cleanup",
  "Video editor",
  "Video generator",
  "Voiceover",
]

export function SubmitToolForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])

  const [formData, setFormData] = useState({
    toolId: "",
    appName: "",
    url: "",
    affiliateUrl: "",
    affiliateAmount: "",
    affiliateType: "%" as "%" | "$",
    shortDescription: "",
    category1: "Niche / Other",
    category2: "",
    category3: "",
    platforms: "",
    hasPromoCode: false,
    promoAmount: "",
    promoType: "%" as "%" | "$",
  })

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziP_xdpsjFx5axQIaEcPFHc-WTuGiWNZ8rAhX9pLaXIuyBoIxAo8aiPae1GWEFbODC/exec"

    // Build payload with exact keys for Google Sheet
    const payload = {
      toolId: formData.toolId,
      appName: formData.appName,
      websiteUrl: formData.url,
      affiliateUrl: formData.affiliateUrl || "",
      affiliateCommission: formData.affiliateAmount ? `${formData.affiliateAmount}${formData.affiliateType}` : "",
      shortDescription: formData.shortDescription,
      primaryCategory: formData.category1,
      secondaryCategory: formData.category2 || "",
      tertiaryCategory: formData.category3 || "",
      tags: tags.join(", "),
      platforms: formData.platforms || "",
      promoCode: formData.hasPromoCode
        ? `CNFDNT${formData.promoAmount ? ` (${formData.promoAmount}${formData.promoType} off)` : ""}`
        : "",
    }

    try {
      // POST to Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // Also save to database via server action
      const result = await submitTool({
        ...formData,
        promoCode: payload.promoCode,
        tags,
      })

      if (result.error) {
        setError(result.error)
      } else {
        router.push("/submit/success")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-white border-2 border-[#004208]/20">
        <CardHeader>
          <CardTitle className="text-black">Tool Information</CardTitle>
          <CardDescription className="text-gray-600">Provide details about your AI tool to help users discover it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tool ID */}
          <div className="space-y-2">
            <Label htmlFor="toolId" className="text-black font-medium">Tool ID (unique identifier)</Label>
            <Input
              id="toolId"
              required
              placeholder="e.g., chatbot_myapp"
              value={formData.toolId}
              onChange={(e) => setFormData({ ...formData, toolId: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-500">Use lowercase with underscores. This must be unique.</p>
          </div>

          {/* App Name */}
          <div className="space-y-2">
            <Label htmlFor="appName" className="text-black font-medium">App Name</Label>
            <Input
              id="appName"
              required
              placeholder="Your AI Tool Name"
              value={formData.appName}
              onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="text-black font-medium">Website URL</Label>
            <Input
              id="url"
              type="url"
              required
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="affiliateUrl" className="text-black font-medium">Affiliate URL (Optional)</Label>
            <Input
              id="affiliateUrl"
              type="url"
              placeholder="https://example.com/affiliate?ref=aigentsmith"
              value={formData.affiliateUrl}
              onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-500">Your affiliate or referral link if you have one.</p>
          </div>

          <div className="space-y-2">
            <Label className="text-black font-medium">Affiliate Commission (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="affiliateAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 20"
                value={formData.affiliateAmount}
                onChange={(e) => setFormData({ ...formData, affiliateAmount: e.target.value })}
                className="flex-1 bg-white border-gray-300 text-black placeholder:text-gray-400"
              />
              <Select
                value={formData.affiliateType}
                onValueChange={(value: "%" | "$") => setFormData({ ...formData, affiliateType: value })}
              >
                <SelectTrigger className="w-20 bg-white border-gray-300 text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="%" className="text-black">%</SelectItem>
                  <SelectItem value="$" className="text-black">$</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-gray-500">Commission percentage or flat rate for affiliates.</p>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="shortDescription" className="text-black font-medium">Short Description</Label>
            <Textarea
              id="shortDescription"
              required
              placeholder="Describe what your AI tool does in 1-2 sentences..."
              rows={4}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-500">Keep it concise and compelling.</p>
          </div>

          {/* Categories */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category1" className="text-black font-medium">Primary Category</Label>
              <Select
                value={formData.category1}
                onValueChange={(value) => setFormData({ ...formData, category1: value })}
              >
                <SelectTrigger id="category1" className="bg-white border-gray-300 text-black">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-black">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category2" className="text-black font-medium">Secondary Category (Optional)</Label>
              <Select
                value={formData.category2}
                onValueChange={(value) => setFormData({ ...formData, category2: value })}
              >
                <SelectTrigger id="category2" className="bg-white border-gray-300 text-black">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-black">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.category2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({ ...formData, category2: "" })}
                  className="h-6 text-xs text-[#004208]"
                >
                  Clear
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category3" className="text-black font-medium">Tertiary Category (Optional)</Label>
              <Select
                value={formData.category3}
                onValueChange={(value) => setFormData({ ...formData, category3: value })}
              >
                <SelectTrigger id="category3" className="bg-white border-gray-300 text-black">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-black">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.category3 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({ ...formData, category3: "" })}
                  className="h-6 text-xs text-[#004208]"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-black font-medium">Tags (Optional)</Label>
            <Select onValueChange={handleAddTag}>
              <SelectTrigger id="tags" className="bg-white border-gray-300 text-black">
                <SelectValue placeholder="Select tags to add" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {AVAILABLE_TAGS.filter((tag) => !tags.includes(tag)).map((tag) => (
                  <SelectItem key={tag} value={tag} className="text-black">
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 bg-[#004208]/10 text-[#004208] border border-[#004208]/20">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 rounded-full hover:bg-[#004208]/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <Label htmlFor="platforms" className="text-black font-medium">Platforms (Optional)</Label>
            <Input
              id="platforms"
              placeholder="e.g., Web, iOS, Android"
              value={formData.platforms}
              onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
              className="bg-white border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasPromoCode"
                checked={formData.hasPromoCode}
                onCheckedChange={(checked) => setFormData({ ...formData, hasPromoCode: checked as boolean })}
                className="border-gray-300 data-[state=checked]:bg-[#004208] data-[state=checked]:border-[#004208]"
              />
              <Label htmlFor="hasPromoCode" className="cursor-pointer text-black font-medium">
                Promo Code CNFDNT (Optional)
              </Label>
            </div>

            {formData.hasPromoCode && (
              <div className="space-y-2 ml-6">
                <Label className="text-black font-medium">Promo Discount Amount (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="promoAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g., 15"
                    value={formData.promoAmount}
                    onChange={(e) => setFormData({ ...formData, promoAmount: e.target.value })}
                    className="flex-1 bg-white border-gray-300 text-black placeholder:text-gray-400"
                  />
                  <Select
                    value={formData.promoType}
                    onValueChange={(value: "%" | "$") => setFormData({ ...formData, promoType: value })}
                  >
                    <SelectTrigger className="w-20 bg-white border-gray-300 text-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="%" className="text-black">%</SelectItem>
                      <SelectItem value="$" className="text-black">$</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-500">How much discount does the promo code provide?</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Tool"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
