const API_URL = "http://127.0.0.1:8000/api";
const BE_URL = "http://127.0.0.1:8000";

enum ROUTES {
  "SIGN_IN" = "/sign-in",
  "SIGN_OUT" = "/sign-out",
  "SIGN_UP" = "/sign-up",
  "PURCHASE_HISTORY" = "/purchase-history",
  "CART" = "/cart",
  "CREATE_COURSE" = "/create-course",
  "INSTRUCTOR_BIO" = "/instructor/profile/:slug",
}

export { API_URL, BE_URL, ROUTES };
