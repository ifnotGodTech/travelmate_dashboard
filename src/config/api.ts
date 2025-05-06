const api = () => {
  const BASE_URL_LINK = "https://travelmate-backend-0suw.onrender.com";

  return {
    auth: BASE_URL_LINK + "/api/auth/",
    user: BASE_URL_LINK + "/api/users",
    bookings: BASE_URL_LINK + "/api/admin/bookings",
    faq: BASE_URL_LINK + "/api/admin/faqs",
    ticket: BASE_URL_LINK + "/api/admin/tickets/",
    messae: BASE_URL_LINK + "/api/admin/tickets/",
    escalation: BASE_URL_LINK + "/api/admin/escalation-levels",
    admin: BASE_URL_LINK + "/api/admin",
    chat: BASE_URL_LINK + "/api/admin/chats",
    users: BASE_URL_LINK + "/api/superuser/",
  };
};

export default api;
