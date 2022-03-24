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
  "DETAIL_COURSE" = "/course/:slug",
  "INSTRUCTOR_COURSES" = "/instructor/courses",
  "USER_COURSES" = "/user/courses",
  "OVERVIEW" = "/instructor/overview",
  "USER_BIO" = "/user/bio",
  "PROFILE" = "/user/profile",
}

const routesWithParams = {
  detail_course: (slug: string) => `/course/${slug}`,
  instructor_bio: (slug: string) => `/instructor/profile/${slug}`,
  home: (slug: string) => `/`,
};

export { API_URL, BE_URL, ROUTES, routesWithParams };
