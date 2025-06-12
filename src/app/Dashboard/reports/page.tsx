"use client";

import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChevronDown,
  Download,
  Users,
  BookOpen,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import env from "@/config/env";
import { useAuthContext } from "@/context/AuthContext";
import Loading from "../admin/loading";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";

type Summary = {
  booking_growth_percentage: number;
  total_bookings: number;
  total_users: number;
  user_growth_percentage: number;
  total_revenue: number;
  revenue_growth_percentage: number;
};
type Breakdown = {
  label: string;
  flight_bookings: number;
  car_bookings: number;
  flight_revenue: number;
  car_revenue: number;
};
export default function ReportsPage() {
  const APP_STATE = useAuthContext();
  const isSuperadmin = APP_STATE?.user?.isSuperuser;

  const [activeTab, setActiveTab] = useState("overview");

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExport, setIsLoadingExport] = useState(false);

  const [overviewData, setOverviewData] = useState<Summary>();
  const [revenueBookingsData, setRevenueBookingsData] = useState();
  const [bookingTrendsData, setBookingTrendsData] = useState<Breakdown[]>([]);

  const [selectedOption, setSelectedOption] = useState("This Month");

  // if (!APP_STATE?.user) return <Loading />;
  // if (!APP_STATE?.accessToken) {
  //   showErrorToast({ message: "You are not authorized to view this page" });
  //   return null;
  // }
  const formatCurrency = (value: number) => {
    if (value >= 1_000_000) {
      return `N${(value / 1_000_000).toFixed(1)}m`; // Format millions
    } else if (value >= 1_000) {
      return `N${(value / 1_000).toFixed(1)}k`; // Format thousands
    }
    return `N${value.toLocaleString()}`; // Format smaller values
  };

  const generateQueryParams = () => {
    const now = new Date();
    const baseUrl = `${env.api.admin}/reports/bookings/breakdown/?group_by=day`;

    switch (selectedOption) {
      case "This Week":
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        return `${baseUrl}&start=${
          startOfWeek.toISOString().split("T")[0]
        }&end=${now.toISOString().split("T")[0]}&period=week`;

      case "This Month":
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return `${baseUrl}&start=${
          startOfMonth.toISOString().split("T")[0]
        }&end=${now.toISOString().split("T")[0]}&period=month`;

      case "Last 3 Months":
        return `${baseUrl}&months=3`;

      case "This Year":
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        return `${baseUrl}&start=${
          startOfYear.toISOString().split("T")[0]
        }&end=${now.toISOString().split("T")[0]}&period=year`;

      default:
        return `${baseUrl}&months=6`; // fallback
    }
  };

  //FETCH DATA
  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      const [bookingbreakdown, bookingscombined, summary] = await Promise.all([
        axios.get(generateQueryParams(), {
          headers: {
            Authorization: `Bearer ${APP_STATE.accessToken}`,
          },
        }),
        axios.get(`${env.api.admin}/reports/bookings/combined/`, {
          headers: {
            Authorization: `Bearer ${APP_STATE.accessToken}`,
          },
        }),
        axios.get(`${env.api.admin}/reports/summary/`, {
          headers: {
            Authorization: `Bearer ${APP_STATE.accessToken}`,
          },
        }),
      ]);
      setRevenueBookingsData(bookingscombined.data);
      setOverviewData(summary.data);
      setBookingTrendsData(bookingbreakdown.data);
      console.log(bookingbreakdown.data);
    } catch (error) {
      showErrorToast({ message: "Error displaying data" });
    } finally {
      setIsLoading(false);
    }
  };

  //EXPORT DATA AS XLSL FORMAT
  const exportData = async () => {
    try {
      setIsLoadingExport(true);
      const response = await axios.get(`${env.api.admin}/reports/export/`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx"); // Set the file name
      document.body.appendChild(link);
      link.click();
      showSuccessToast({ message: "Download starting" });
    } catch (error: any) {
      showErrorToast({
        message: error?.response?.data?.message || "Error exporting data",
      });
      console.log(error?.response?.data?.message);
    } finally {
      setIsLoadingExport(false);
    }
  };

  // //FILTER DATA BASED ON TIME PERIOD OR DURATIONS
  const filteredData = useMemo(() => {
    if (!bookingTrendsData) return [];
    const now = new Date();
    return bookingTrendsData?.filter((item) => {
      const createdAt = new Date(item.label);
      if (selectedOption === "This Week") {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return createdAt >= startOfWeek;
      } else if (selectedOption === "This Month") {
        return (
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear()
        );
      } else if (selectedOption === "Last 3 Months") {
        const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
        return createdAt >= threeMonthsAgo;
      } else if (selectedOption === "This Year") {
        return createdAt.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [bookingTrendsData, selectedOption]);

  const processedData = useMemo(() => {
    if (!filteredData) return [];
    return filteredData.map((item) => ({
      ...item,
      total_bookings: item.car_bookings + item.flight_bookings,
      total_revenue: item.flight_revenue + item.car_revenue,
    }));
  }, [filteredData]);

  useEffect(() => {
    fetchAdminData();
  }, [isSuperadmin]);

  const periodFilter = [
    "This Week",
    "This Month",
    "Last 3 Months",
    "This Year",
  ];
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {/* Skeleton for Metric Cards */}
        {[1, 2, 3].map((_, index) => (
          <Card key={index} className="bg-gray-100 w-full">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skeleton for Charts */}
      <div className="h-[400px] bg-gray-100 rounded"></div>
    </div>
  );
  return (
    <div className="flex min-h-screen p-5">
      {/* Main Content */}
      <main className="flex-1 w-full">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="flex justify-between w-full items-center gap-4 pb-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedOption} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {periodFilter.map((time) => (
                    <DropdownMenuItem
                      key={time}
                      onClick={() => setSelectedOption(time)}
                    >
                      {time}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                className={`${
                  isLoadingExport ? `bg-orange-200` : `bg-orange-500`
                } hover:bg-orange-600`}
                onClick={exportData}
              >
                <Download className="mr-2 h-4 w-4" />
                <p className="hidden lg:block">
                  {isLoadingExport ? "Exporting" : "Export All Data"}
                </p>
              </Button>
            </div>

            {/* Metric Cards */}

            <div
              className={`grid gap-4 ${
                isSuperadmin ? `md:grid-cols-3` : `md:grid-cols-2`
              } mb-8`}
            >
              <Card className="bg-green-50 w-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Total Users
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">
                      {overviewData?.total_users ?? 0}
                    </span>
                    <span className="ml-2 text-sm text-green-600">
                      {overviewData?.user_growth_percentage ?? 0}% from last
                      month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Total Bookings
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">
                      {overviewData?.total_bookings ?? 0}
                    </span>
                    <span className="ml-2 text-sm text-blue-600">
                      {overviewData?.booking_growth_percentage ?? 0}% from last
                      month
                    </span>
                  </div>
                </CardContent>
              </Card>

              {isSuperadmin && (
                <Card className="bg-orange-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Total Revenue
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">
                        {formatCurrency(overviewData?.total_revenue ?? 0)}
                      </span>
                      <span className="ml-2 text-sm text-orange-600">
                        {overviewData?.revenue_growth_percentage ?? 0}% from
                        last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Charts */}
            <Tabs
              defaultValue="overview"
              className="space-y-4"
              onValueChange={setActiveTab}
            >
              <div className="overflow-x-auto whitespace-nowrap pb-2">
                <TabsList className="min-w-max flex gap-2">
                  <TabsTrigger
                    value="overview"
                    className="flex items-center gap-2"
                  >
                    <BarChart className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="booking-trends"
                    className="flex items-center gap-2"
                  >
                    <LineChart className="h-4 w-4" />
                    Booking Trends
                  </TabsTrigger>
                  <TabsTrigger
                    value="user-activities"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    User Activities
                  </TabsTrigger>
                  {isSuperadmin && (
                    <TabsTrigger
                      value="revenue-analysis"
                      className="flex items-center gap-2"
                    >
                      <DollarSign className="h-4 w-4" />
                      Revenue Analysis
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              <Card>
                <CardContent className="pt-6">
                  {/* OVERVIEW ACTIVITIES  CHART*/}
                  <TabsContent value="overview" className="mt-0">
                    <h3 className="text-lg font-semibold mb-4">
                      Booking & Revenue Overview
                    </h3>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div className="h-[400px]">
                        {filteredData.length === 0 && (
                          <div className="text-center mt-[15%] text-lg font-bold">
                            Nothing to see here
                          </div>
                        )}
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={processedData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              className="stroke-muted"
                            />
                            <XAxis dataKey="label" />
                            <YAxis tickFormatter={formatCurrency} />
                            <Tooltip
                              formatter={(value) =>
                                formatCurrency(Number(value))
                              }
                              contentStyle={{
                                background: "white",
                                border: "1px solid #ccc",
                              }}
                            />
                            <Bar
                              dataKey="total_bookings"
                              fill="#1e40af"
                              name="Booking"
                            />
                            {isSuperadmin && (
                              <Bar
                                dataKey="total_revenue"
                                fill="#f97316"
                                name="Revenue"
                              />
                            )}
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </TabsContent>

                  {/* BOOKING TRENNDS ACTIVITIES */}
                  <TabsContent value="booking-trends" className="mt-0">
                    <h3 className="text-lg font-semibold mb-4">
                      Booking Trends
                    </h3>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div className="h-[400px]">
                        {filteredData.length === 0 && (
                          <div className="text-center mt-[15%] text-lg font-bold">
                            Nothing to see here
                          </div>
                        )}
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={filteredData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              className="stroke-muted"
                            />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip
                              formatter={(value) =>
                                formatCurrency(Number(value))
                              }
                              contentStyle={{
                                background: "white",
                                border: "1px solid #ccc",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey={
                                isSuperadmin
                                  ? "flight_revenue"
                                  : "flight_bookings"
                              }
                              stroke="#f97316"
                              name="Flights"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey={
                                isSuperadmin ? "car_revenue" : "car_bookings"
                              }
                              stroke="#22c55e"
                              name="Hotels"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey={
                                isSuperadmin ? "car_revenue" : "car_bookings"
                              }
                              stroke="#1e40af"
                              name="Cars"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </TabsContent>

                  {/* USERS ACTIVITIES CHART */}
                  <TabsContent value="user-activities" className="mt-0">
                    <h3 className="text-lg font-semibold mb-4">
                      User Activities
                    </h3>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div className="h-[400px]">
                        {processedData.length === 0 && (
                          <div className="text-center mt-[15%] text-lg font-bold">
                            Nothing to see here
                          </div>
                        )}
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={processedData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              className="stroke-muted"
                            />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip
                              formatter={(value) =>
                                formatCurrency(Number(value))
                              }
                              contentStyle={{
                                background: "white",
                                border: "1px solid #ccc",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="total_bookings"
                              stroke="#f97316"
                              name="User Activities"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </TabsContent>

                  {/* //REVENUE ANALYSIS CHART */}
                  <TabsContent value="revenue-analysis" className="mt-0">
                    <h3 className="text-lg font-semibold mb-4">
                      Revenue Analysis
                    </h3>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div className="h-[400px]">
                        {processedData.length === 0 && (
                          <div className="text-center mt-[15%] text-lg font-bold">
                            Nothing to see here
                          </div>
                        )}
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={processedData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              className="stroke-muted"
                            />
                            <XAxis dataKey="label" />
                            <YAxis tickFormatter={formatCurrency} />
                            <Tooltip
                              formatter={(value) =>
                                formatCurrency(Number(value))
                              }
                              contentStyle={{
                                background: "white",
                                border: "1px solid #ccc",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="total_revenue"
                              stroke="#eab308"
                              name="Revenue"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
}
