// services/notification.ts
import axios from "axios";
import env from "@/config/env";
import instance from "@/hooks/initializers/useAxiosDefaults";

class NotificationService {
  /**
   * Fetch notifications with optional filters
   * @param params e.g. { page: 1, status: "unread", startDate: "2025-08-01", endDate: "2025-08-15" }
   */
  getAllNotification(params?: Record<string, any>) {
    return instance.get(env.api.notification, { params });
  }

  /**
   * Fetch notifications directly from a full URL (e.g. pagination links)
   */
  getAllNotificationByUrl(url: string) {
    return instance.get(url);
  }

  markNotificationAsRead = (payload: { ids: number[] }) => {
    return instance.patch(env.api.notification + "/mark-all-read", payload);
  };

  deleteNotification = (payload: any) => {
    return instance.delete(env.api.notification + "/delete-Notification", payload);
  };
}

export default new NotificationService();
