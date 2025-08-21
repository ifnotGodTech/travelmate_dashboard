import instance from "@/hooks/initializers/useAxiosDefaults";
import env from "@/config/env";
import { showErrorToast } from "@/utils/toasters";

type DashboardSetters = {
  setBookings: (data: any) => void;
  setActivity: (data: any) => void;
  setMessages: (data: any) => void;
  setLoading: (data: boolean) => void;
  setRevenue: (data: any) => void;
  setUsers: (data: any) => void;
  setAllBookings: (data: any) => void;
};

type DashboardOptions = {
  isSuperadmin?: boolean;
  generateQueryParams: () => {
    breakdown: string;
    combined: string;
    summary: string;
  };
};

export async function fetchDashboardData(
  setters: DashboardSetters,
  options: DashboardOptions
) {
  const {
    setBookings,
    setActivity,
    setMessages,
    setLoading,
    setRevenue,
    setUsers,
    setAllBookings,
  } = setters;

  const { isSuperadmin, generateQueryParams } = options;

  try {
    setLoading(true);

    const queryParams = generateQueryParams();

    const [activities, messages, summaryResponse, allBookings] =
      await Promise.all([
        instance.get(env.api.dashboardactivities),
        instance.get(env.api.dashboardmessages),
        instance.get(queryParams.summary),
        instance.get(env.api.bookings),
      ]);

    setActivity(activities.data);
    setMessages(messages.data);

    const summaryData = summaryResponse.data;

    setBookings({
      total_bookings:
        summaryData?.total_bookings ?? summaryData?.bookings ?? 0,
    });

    setUsers({
      total_normal_users:
        summaryData?.total_users ?? summaryData?.users ?? 0,
    });

    if (isSuperadmin) {
      setRevenue({
        total_revenue:
          summaryData?.total_revenue ?? summaryData?.revenue ?? 0,
        car_revenue: summaryData?.car_revenue ?? 0,
        flight_revenue: summaryData?.flight_revenue ?? 0,
        currency: "NGN",
      });
    }

    setAllBookings(allBookings.data);
  } catch (error: any) {
    showErrorToast({
      message: error?.response?.data?.message || error?.message,
    });
  } finally {
    setLoading(false);
  }
}
