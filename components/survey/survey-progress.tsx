"use client"

interface SurveyProgressProps {
  currentStep: number
  totalSteps: number
}

export function SurveyProgress({ currentStep, totalSteps }: SurveyProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-muted-foreground">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="font-medium text-[#004208]">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#004208] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
