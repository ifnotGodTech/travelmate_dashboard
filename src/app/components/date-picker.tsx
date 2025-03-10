"use client"
import { Calendar } from "lucide-react"

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <div className="relative">
      <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
        <span className="flex-1">{value}</span>
        <Calendar className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  )
}

