"use client";

import Button from "@/components/reuseables/Button";
import Link from "next/link";

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import DashboardLayout from "./dashboard-layout"

export default function HomePage() {
  // const router = useRouter()

  // // Redirect to bookings page
  // useEffect(() => {
  //   router.push("/bookings")
  // }, [router])

  return (
    <div className="flex items-center justify-center h-screen bg-[#fff] lg:bg-[#f5f5f5]">
      <div className="lg:w-[800px] w-full lg:rounded-[20px] p-[40px] space-y-[40px] bg-[#fff]">
        <div className="space-y-6">
          <div className="flex justify-center w-full">
            <img
              src="/assets/images/company-logo.svg"
              alt=""
              className="lg:w-[273px] w-[209px]"
            />
          </div>
          <p className="font-[600] text-[16px] lg:font-[500] lg:text-[20px] text-[#181818] leading-[100%] text-center ">
            Team Management Solution
          </p>
          <h1 className="font-[700] text-[32px] lg:text-[48px] text-[#181818] leading-[100%] text-center ">
            Welcome
          </h1>
          <p className="text-[14px] font-[600] lg:font-[400] lg:text-[20px] text-[#67696D] text-center ">
            Access your travel agency management dashboard manage booking,
            customer profiles, travel packages and other activities.
          </p>
        </div>
        <div className="">
          <Link href={"/auth/login"} className="w-full">
            <Button variant="blue" title="ADMIN ACCESS" full />
          </Link>
        </div>

        <div className="">
          <p className="font-[500] text-[14px] lg:font-[500] lg:text-[20px] text-[#181818] leading-[100%] text-center">
            © 2025 TravelMate. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
