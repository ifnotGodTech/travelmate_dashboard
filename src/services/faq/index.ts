import axios from "axios";
import env from "@/config/env";

class Service {
  getAllFaq({ bookingId }: { bookingId?: string }) {
    return axios.get(env.api.faq + "/categories/");
  }

  cancelBooking({ bookingId }: { bookingId?: string }) {
    return axios.post(env.api.bookings + "/" + bookingId + "/cancel_booking/");
  }

  updateBooking({ bookingId, payload }: { bookingId?: string; payload?: any }) {
    return axios.post(
      env.api.bookings + "/" + bookingId + "/update_booking/",
      payload
    );
  }
}
const FaqService = new Service();
export default FaqService;
