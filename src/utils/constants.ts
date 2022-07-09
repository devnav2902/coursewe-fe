import { Role } from "../ts/types/user.types";

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
};
type CheckVideoParams = {
  course_id: string | number;
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
  ADMIN_REVIEW: "/admin/submission-courses-list",
  CHECKOUT: "/cart/checkout",
  NOT_FOUND: "/404",
  QUALITY_REVIEW: "/quan-ly/doi-ngu-chuyen-mon",
  USER_MANAGE: "/quan-ly/nguoi-dung",
  INSTRUCTOR_MANAGE: "/quan-ly/giang-vien",
  QUALITY_COURSE_REVIEW: "/quan-ly/danh-gia-chat-luong-khoa-hoc",

  home: (role: Role) =>
    role === "admin"
      ? "/quan-ly/tong-quan"
      : role === "quality_review"
      ? "/quan-ly/danh-gia-chat-luong-khoa-hoc"
      : "/",

  detail_course: (slug?: string) => `/khoa-hoc/${slug ? slug : ":slug"}`,

  instructor_bio: (slug?: string) => `/user/${slug ? slug : ":slug"}`,

  landing_page_draft: (id?: number | string) =>
    `/khoa-hoc/ban-nhap/${id ? id : ":id"}`,

  course_basics: (id?: string | number) =>
    `/quan-ly/khoa-hoc/${id ? id : ":id"}/thong-tin-co-ban`,

  learning: (params?: LearningParams) => {
    if (params) {
      return `/hoc-tap/khoa-hoc/${params.course_slug}`;
    }
    return `/hoc-tap/khoa-hoc/:course_slug`;
  },
  search: () => `/tim-kiem/khoa-hoc/`,

  check_video: (params?: CheckVideoParams) => {
    if (params) {
      return `/khoa-hoc/${params.course_id}/video/draft`;
    }
    return `/khoa-hoc/:course_id/video/draft`;
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
