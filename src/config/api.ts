const api = () => {
  const BASE_URL_LINK = "https://travelmate-backend-0suw.onrender.com";

  return {
    auth: BASE_URL_LINK + "/api/auth/",
    user: BASE_URL_LINK + "/api/users",
    bookings: BASE_URL_LINK + "/api/admin/bookings",
    faq: BASE_URL_LINK + "/api/admin/faqs",
  };
};

export default api;
