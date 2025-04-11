const api = () => {
  const BASE_URL_LINK = "https://travelmate-backend-0suw.onrender.com";

  return {
    auth: BASE_URL_LINK + "/api/auth/",
    user: BASE_URL_LINK + "/api/users",
  };
};

export default api;

// 
