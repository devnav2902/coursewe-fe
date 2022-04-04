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
  "COURSE_DRAFT" = "/course/draft/:id",
  "MY_LEARNING" = "/my-learning",
  "LEARNING" = "/learning/:slug",
  "COURSE_BASICS" = "/instructor/course/:id/basics",
  "INTENDED_LEARNERS" = "/instructor/course/:id/goals",
  "CURRICULUM" = "instructor/course/:id/curriculum",
  "PRICE" = "instructor/course/:id/price",
  "ADMIN_REVIEW" = "/admin/submission-courses-list",
  "CHECKOUT" = "/cart/checkout",
  "CATEGORIES" = "/courses/:slug",
  "SUBCATEGORIES" = ":sub",
  "TOPICS" = ":sub/:topic",
}

const routesWithParams = {
  detail_course: (slug: string) => `/course/${slug}`,
  instructor_bio: (slug: string) => `/instructor/profile/${slug}`,
  course_draft: (id: number) => `/course/draft/${id}`,
  course_basics: (id: string) => `/instructor/course/${id}/basics`,
  learning: (slug: string) => `/learning/${slug}`,
  intended_learners: (id: string | number) => `/instructor/course/${id}/goals`,
  curriculum: (id: string | number) => `/instructor/course/${id}/curriculum`,
  price: (id: string | number) => `/instructor/course/${id}/price`,
  categories: (slug: string) => `/courses/${slug}`,
  subcategories: (slug: string, sub: string) => `/courses/${slug}/${sub}`,
  topics: (slug: string, sub: string, topic: string) =>
    `/courses/${slug}/${sub}/${topic}`,
};

export { API_URL, BE_URL, ROUTES, routesWithParams };
