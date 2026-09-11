"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface SurveyQuestionProps {
  question: string
  options?: string[]
  selected: string | string[]
  onSelect: (value: string) => void
  multiSelect?: boolean
  subtitle?: string
  inputType?: "text" | "email" | "options"
  placeholder?: string
}

export function SurveyQuestion({
  question,
  options = [],
  selected,
  onSelect,
  multiSelect = false,
  subtitle,
  inputType = "options",
  placeholder,
}: SurveyQuestionProps) {
  const isSelected = (option: string) => {
    if (multiSelect && Array.isArray(selected)) {
      return selected.includes(option)
    }
    return selected === option
  }

  // Text/email input rendering
  if (inputType === "text" || inputType === "email") {
    return (
      <div className="space-y-6 w-full max-w-md mx-auto">
        {subtitle && <p className="text-sm text-muted-foreground text-center">{subtitle}</p>}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-black leading-tight">{question}</h2>
        <Input
          type={inputType}
          placeholder={placeholder}
          value={typeof selected === "string" ? selected : ""}
          onChange={(e) => onSelect(e.target.value)}
          className="h-14 text-lg text-center border-2 border-gray-200 focus:border-[#0f8a3e] rounded-lg text-black placeholder:text-gray-400"
          autoFocus
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {subtitle && <p className="text-sm text-muted-foreground text-center">{subtitle}</p>}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-black leading-tight">{question}</h2>
      <div className="grid gap-3 max-w-2xl mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            variant="outline"
            className={cn(
              "h-auto min-h-[56px] px-6 py-4 text-left justify-start text-base font-medium transition-all",
              "border-2 hover:border-[#0f8a3e] hover:bg-[#0f8a3e]/5",
              isSelected(option) && "border-[#0f8a3e] bg-[#0f8a3e]/10 text-[#0f8a3e]",
            )}
            onClick={() => onSelect(option)}
          >
            <div className="flex items-center gap-3 w-full">
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                  isSelected(option) ? "border-[#0f8a3e] bg-[#0f8a3e]" : "border-gray-300",
                )}
              >
                {isSelected(option) && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="flex-1">{option}</span>
            </div>
          </Button>
        ))}
      </div>
      {multiSelect && <p className="text-sm text-muted-foreground text-center">Select all that apply</p>}
    </div>
  )
}
