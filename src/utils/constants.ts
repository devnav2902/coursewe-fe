const API_URL = "http://127.0.0.1:8000/api";
const BE_URL = "http://127.0.0.1:8000";

const ROUTES = {
  SIGN_IN: "/dang-nhap",
  SIGN_OUT: "/dang-xuat",
  SIGN_UP: "/dang-ky-tai-khoan",
  PURCHASE_HISTORY: "/lich-su-thanh-toan",
  CART: "/gio-hang",
  CREATE_COURSE: "/create-course",
  INSTRUCTOR_BIO: "/instructor/profile/:slug",
  DETAIL_COURSE: "/khoa-hoc/:slug",
  INSTRUCTOR_COURSES: "/instructor/courses",
  USER_COURSES: "/user/courses",
  OVERVIEW: "/instructor/overview",
  USER_BIO: "/user/bio",
  PROFILE: "/user/profile",
  COURSE_DRAFT: "/course/draft/:id",
  MY_LEARNING: "/my-learning",
  LEARNING: "/khoa-hoc/:course_slug/bai-giang/:lectureId",
  COURSE_BASICS: "/instructor/course/:id/basics",
  INTENDED_LEARNERS: "/instructor/course/:id/goals",
  CURRICULUM: "instructor/course/:id/curriculum",
  PROMOTIONS: "giang-vien/khoa-hoc/:id/khuyen-mai",
  "COURSE_IMAGE_&_PREVIEW_VIDEO":
    "instructor/course/:id/course-image-and-preview-video",
  PRICE: "instructor/course/:id/price",
  ADMIN_REVIEW: "/admin/submission-courses-list",
  CHECKOUT: "/cart/checkout",
  CATEGORIES: "/danh-muc/:slug",
  SUBCATEGORIES: "/danh-muc/:slug/:sub",
  TOPICS: "/danh-muc/:slug/:sub/:topic",
  COURSE_DASH_REDIRECT: "/course_dash_redirect",
  NOT_FOUND: "/404",
} as const;

const routesWithParams = {
  detail_course: (slug: string) => `/khoa-hoc/${slug}`,
  instructor_bio: (slug: string) => `/instructor/profile/${slug}`,
  course_draft: (id: number) => `/course/draft/${id}`,
  learning: (course_slug: string, lectureId: number) =>
    `/khoa-hoc/${course_slug}/bai-giang/${lectureId}`,
  intended_learners: (id: string | number) => `/instructor/course/${id}/goals`,
  course_basics: (id: string | number) => `/instructor/course/${id}/basics`,
  image_and_preview_video: (id: string | number) =>
    `/instructor/course/${id}/course-image-and-preview-video`,
  curriculum: (id: string | number) => `/instructor/course/${id}/curriculum`,
  promotions: (id: string | number) => `/giang-vien/khoa-hoc/${id}/khuyen-mai`,
  price: (id: string | number) => `/instructor/course/${id}/price`,
  categories: (slug: string) => `/danh-muc/${slug}`,
  subcategories: (slug: string, sub: string) => `/danh-muc/${slug}/${sub}`,
  course_dash_redirect: (id: number) =>
    `/course_dash_redirect/?course_id=${id}`,
  topics: (slug: string, sub: string, topic: string) =>
    `/danh-muc/${slug}/${sub}/${topic}`,
};

export { API_URL, BE_URL, ROUTES, routesWithParams };
