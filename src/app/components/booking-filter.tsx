"use client"

interface BookingFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function BookingFilter({ activeFilter, onFilterChange }: BookingFilterProps) {
  const filters = [
    { label: "All", color: "bg-yellow-500" },
    { label: "Double", color: "bg-amber-800" }, // Using amber as a substitute for brown
    { label: "Flight", color: "bg-orange-500" },
    { label: "Hotel", color: "bg-green-500" },
    { label: "Car", color: "bg-blue-800" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.label}
          onClick={() => onFilterChange(filter.label)}
          className={`flex items-center gap-2 px-3 py-1 rounded-md ${
            activeFilter === filter.label ? "bg-gray-200" : "bg-white"
          }`}
        >
          <span className={`w-3 h-3 rounded-full ${filter.color}`}></span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  )
}

