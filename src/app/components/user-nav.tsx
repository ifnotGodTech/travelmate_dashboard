import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function UserNav() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button className="flex items-center gap-2 rounded-full">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image src="/placeholder-user.jpg" alt="User avatar" fill className="object-cover" />
          </div>
          <span className="font-medium">Admin</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}

