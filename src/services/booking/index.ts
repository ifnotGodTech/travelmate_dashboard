import axios from "axios";
import env from "@/config/env";
import instance from "@/hooks/initializers/useAxiosDefaults";

class Service {
  getBookings({
    designId,
    page = 1,
    limit = 5,
    orderBy = "",
    sortOrder = "desc",
    cursor = "",
  }: {
    designId?: string;
    page?: number;
    limit?: number;
    orderBy?: string;
    sortOrder?: "asc" | "desc";
    cursor?: string;
  }) {
    const queryParams = new URLSearchParams({
      limit: String(limit),
      sortOrder,
      orderBy,
      cursor,
    });
    return instance.get(`${env.api.bookings}/${designId}?${queryParams}`);
  }

  getSingleBooking({ bookingId }: { bookingId?: string }) {
    return instance.get(env.api.bookings + "/" + bookingId + "/");
  }

  cancelBooking({ bookingId }: { bookingId?: string }) {
    return instance.post(env.api.bookings + "/" + bookingId + "/cancel_booking/");
  }

  updateBooking({ bookingId, payload }: { bookingId?: string; payload?: any }) {
    return instance.post(
      env.api.bookings + "/" + bookingId + "/update_booking/",
      payload
    );
  }
}
const BookingService = new Service();
export default BookingService;
