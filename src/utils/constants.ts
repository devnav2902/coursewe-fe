const API_URL = "http://127.0.0.1:8000/api";
const BE_URL = "http://127.0.0.1:8000";

type TopicParams = {
  slug: string;
  sub: string;
  topic: string;
};

type SubcategoryParams = {
  slug: string;
  sub: string;
};
type LearningParams = {
  course_slug: string;
  lectureId: number | string;
};

const ROUTES = {
  SIGN_IN: "/dang-nhap",
  SIGN_OUT: "/dang-xuat",
  SIGN_UP: "/dang-ky-tai-khoan",
  PURCHASE_HISTORY: "/lich-su-thanh-toan",
  CART: "/gio-hang",
  CREATE_COURSE: "/tao-khoa-hoc",
  INSTRUCTOR_COURSES: "/quan-ly/khoa-hoc",
  OVERVIEW: "/quan-ly/tong-quan",
  USER_BIO: "/user/bio",
  PROFILE: "/user/profile",
  MY_LEARNING: "/hoc-tap/danh-sach-khoa-hoc",
  LEARNING: "/khoahoc/:course_slug/baigiang/:lectureId",
  ADMIN_REVIEW: "/admin/submission-courses-list",
  CHECKOUT: "/cart/checkout",
  COURSE_DASH_REDIRECT: "/course_dash_redirect",

  course_dash_redirect: (id?: number) =>
    `/course_dash_redirect/${id ? "?course_id=" + id : ""}`,
  detail_course: (slug?: string) => `/khoa-hoc/${slug ? slug : ":slug"}`,

  instructor_bio: (slug?: string) => `/user/${slug ? slug : ":slug"}`,

  landing_page_draft: (id?: number | string) =>
    `/khoa-hoc/ban-nhap/${id ? id : ":id"}`,

  course_basics: (id?: string | number) =>
    `/quan-ly/khoa-hoc/${id ? id : ":id"}/thong-tin-co-ban`,

  learning: (params?: LearningParams) => {
    if (params) {
      return `/khoahoc/${params.course_slug}/baigiang/${params.lectureId}`;
    }
    return `/khoahoc/:course_slug/baigiang/:lectureId`;
  },

  intended_learners: (id?: string | number) =>
    `/quan-ly/khoa-hoc/${id ? id : ":id"}/muc-tieu-va-yeu-cau`,

  image_and_preview_video: (id?: string | number) =>
    `/quan-ly/khoa-hoc/${id ? id : ":id"}/hinh-anh-va-video-gioi-thieu`,

  curriculum: (id?: string | number) =>
    `/quan-ly/khoa-hoc/${id ? id : ":id"}/chuong-trinh-hoc`,

  promotions: (id?: string | number) =>
    `/quan-ly/khoa-hoc/${id ? id : ":id"}/khuyen-mai`,

  price: (id?: string | number) =>
    `/quan-ly/khoa-hoc/${id ? id : ":id"}/gia-ban`,

  categories: (slug?: string) => `/danh-muc/${slug ? slug : ":slug"}`,

  subcategories: (params?: SubcategoryParams) => {
    if (!params) return "/danh-muc/:slug/:sub";

    const { slug, sub } = params;
    return `/danh-muc/${slug}/${sub}`;
  },

  topics: (params?: TopicParams) => {
    if (!params) {
      return "/danh-muc/:slug/:sub/:topic";
    }

    const { slug, sub, topic } = params;
    return `/danh-muc/${slug}/${sub}/${topic}`;
  },
} as const;

export { API_URL, BE_URL, ROUTES };
