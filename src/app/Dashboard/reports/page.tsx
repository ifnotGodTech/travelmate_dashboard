"use client"

import { useState } from "react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  ChevronDown,
  Download,
  Users,
  BookOpen,
  DollarSign,
  LayoutDashboard,
  BookMarked,
  Database,
  HeadphonesIcon,
  PieChart,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for charts
const overviewData = [
  { month: "August", booking: 400, revenue: 300 },
  { month: "August", booking: 350, revenue: 400 },
  { month: "August", booking: 450, revenue: 350 },
  { month: "September", booking: 400, revenue: 450 },
  { month: "October", booking: 350, revenue: 300 },
  { month: "November", booking: 450, revenue: 500 },
  { month: "December", booking: 400, revenue: 450 },
  { month: "January", booking: 500, revenue: 400 },
  { month: "February", booking: 350, revenue: 400 },
]

const bookingTrendsData = [
  { month: "August", flights: 0, hotels: 350, cars: 100 },
  { month: "August", flights: 200, hotels: 500, cars: 100 },
  { month: "August", flights: 250, hotels: 300, cars: 150 },
  { month: "September", flights: 0, hotels: 100, cars: 350 },
  { month: "October", flights: 800, hotels: 600, cars: 200 },
  { month: "November", flights: 600, hotels: 400, cars: 300 },
  { month: "December", flights: 400, hotels: 200, cars: 500 },
  { month: "January", flights: 700, hotels: 600, cars: 400 },
  { month: "February", flights: 0, hotels: 400, cars: 500 },
]

const userActivitiesData = [
  { month: "August", activities: 100 },
  { month: "August", activities: 400 },
  { month: "August", activities: 300 },
  { month: "September", activities: 200 },
  { month: "October", activities: 400 },
  { month: "November", activities: 450 },
  { month: "December", activities: 400 },
  { month: "January", activities: 500 },
  { month: "February", activities: 800 },
]

const revenueData = [
  { month: "August", revenue: 100 },
  { month: "August", revenue: 400 },
  { month: "August", revenue: 300 },
  { month: "September", revenue: 200 },
  { month: "October", revenue: 400 },
  { month: "November", revenue: 450 },
  { month: "December", revenue: 400 },
  { month: "January", revenue: 500 },
  { month: "February", revenue: 800 },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const formatCurrency = (value: number) => {
    return `N${value.toLocaleString()}`
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Reports and Analytics</h1>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  This Month <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="font-medium">Admin</span>
              <ChevronDown className="h-4 w-4" />
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600">
              <Download className="mr-2 h-4 w-4" />
              Export All Data
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium text-muted-foreground">Total Users</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">1,285</span>
                <span className="ml-2 text-sm text-green-600">+13.2% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-medium text-muted-foreground">Total Bookings</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">382</span>
                <span className="ml-2 text-sm text-blue-600">+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">N4,200,000</span>
                <span className="ml-2 text-sm text-orange-600">+10.5% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="booking-trends" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Booking Trends
            </TabsTrigger>
            <TabsTrigger value="user-activities" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Activities
            </TabsTrigger>
            <TabsTrigger value="revenue-analysis" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue Analysis
            </TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="pt-6">
              <TabsContent value="overview" className="mt-0">
                <h3 className="text-lg font-semibold mb-4">Booking & Revenue Overview</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={overviewData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ background: "white", border: "1px solid #ccc" }}
                      />
                      <Bar dataKey="booking" fill="#1e40af" name="Booking" />
                      <Bar dataKey="revenue" fill="#f97316" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="booking-trends" className="mt-0">
                <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bookingTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ background: "white", border: "1px solid #ccc" }}
                      />
                      <Line type="monotone" dataKey="flights" stroke="#f97316" name="Flights" strokeWidth={2} />
                      <Line type="monotone" dataKey="hotels" stroke="#22c55e" name="Hotels" strokeWidth={2} />
                      <Line type="monotone" dataKey="cars" stroke="#1e40af" name="Cars" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="user-activities" className="mt-0">
                <h3 className="text-lg font-semibold mb-4">User Activities</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userActivitiesData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ background: "white", border: "1px solid #ccc" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="activities"
                        stroke="#f97316"
                        name="User Activities"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="revenue-analysis" className="mt-0">
                <h3 className="text-lg font-semibold mb-4">Revenue Analysis</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ background: "white", border: "1px solid #ccc" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#eab308"
                        name="Revenue"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </main>
    </div>
  )
}

