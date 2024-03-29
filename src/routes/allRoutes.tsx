import AdminLayout from "layouts/admin-view.layout";
import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import CheckoutLayout from "../layouts/checkout.layout";
import QualityReviewLayout from "../layouts/quality-review.layout";
import { CheckVideoProvider } from "../pages/draft/hooks/leaning.hooks";
import CheckVideoPage from "../pages/draft/pages/learning.page";

import { LearningProvider } from "../pages/learning/hooks/leaning.hooks";

import SignoutPage from "../pages/signout/pages/signout.page";

import { ROUTES } from "../utils/constants";

const BasicLayout = React.lazy(() => import("../layouts/basic.layout"));
const SearchPage = React.lazy(() => import("../pages/search/page/Search.page"));
const InstructorCourseLayout = React.lazy(
  () => import("../layouts/instructor-course.layout")
);
const InstructorView = React.lazy(
  () => import("../layouts/instructor-view.layout")
);
const LearningLayout = React.lazy(() => import("../layouts/learning.layout"));
const NotFound = React.lazy(() => import("../pages/404/pages/not-found.page"));
const AdminReviewPage = React.lazy(
  () => import("../pages/admin-review/page/admin-review.page")
);
const CartPage = React.lazy(() => import("../pages/cart/page/cart.page"));
const CategoriesPage = React.lazy(
  () => import("../pages/categories/pages/categories.page")
);
const CheckoutPage = React.lazy(
  () => import("../pages/checkout/page/checkout.page")
);
const CreateCoursePage = React.lazy(
  () => import("../pages/create-course/page/create-course.page")
);
const DetailCoursePage = React.lazy(
  () => import("../pages/detail-course/page/detail-course.page")
);
const LandingPageDraft = React.lazy(
  () => import("../pages/draft/pages/course-landing-page.page")
);
const BasicsPage = React.lazy(
  () => import("../pages/edit-course/pages/basics.page")
);
const CurriculumPage = React.lazy(
  () => import("../pages/edit-course/pages/curriculum.page")
);
const ImageAndVideoPage = React.lazy(
  () => import("../pages/edit-course/pages/image-and-video.page")
);
const IntendedLearnersPage = React.lazy(
  () => import("../pages/edit-course/pages/intended-learners.page")
);
const PricePage = React.lazy(
  () => import("../pages/edit-course/pages/price.page")
);
const PromotionsPage = React.lazy(
  () => import("../pages/edit-course/pages/promotions.page")
);
const Home = React.lazy(() => import("../pages/home/page/index.page"));
const InstructorBioPage = React.lazy(
  () => import("../pages/instructor-bio/page/instructor-bio.page")
);
const InstructorCoursesPage = React.lazy(
  () => import("../pages/instructor-courses/page/instructor-courses.page")
);
const LearningPage = React.lazy(
  () => import("../pages/learning/page/learning.page")
);
const MyLearningPage = React.lazy(
  () => import("../pages/my-learning/page/my-learning.page")
);
const OverviewPage = React.lazy(
  () => import("../pages/overview/page/overview.page")
);
const ProfilePage = React.lazy(
  () => import("../pages/profile/page/profile.page")
);
const PurchaseHistoryPage = React.lazy(
  () => import("../pages/purchase-history/page/purchase-history.page")
);
const SigninPage = React.lazy(() => import("../pages/signin/page/signin.page"));
const SignupPage = React.lazy(() => import("../pages/signup/page/signup.page"));
const QualityReviewPage = React.lazy(
  () => import("../pages/quality-review/pages/quality-review.page")
);
const QualityCourseReviewPage = React.lazy(
  () => import("../pages/quality-review/pages/quality-course-review.page")
);
const ReviewFilterPage = React.lazy(
  () => import("../pages/review-filter/pages/review-filter.page")
);
const YourReachPage = React.lazy(
  () => import("pages/analytics/pages/your-reach.page")
);
const AnalyticsAdminPage = React.lazy(
  () => import("pages/analytics/pages/analytics-admin.page")
);
const InstructorRevenuePage = React.lazy(
  () => import("pages/instructor-revenue/pages/instructor-revenue.page")
);
const InstructorManagementPage = React.lazy(
  () => import("../pages/instructor-management/pages/quality-review.page")
);
const StudentManagementPage = React.lazy(
  () => import("../pages/user-management/pages/student-management.page")
);

export type Route = {
  exact?: boolean;
  path: string;
  component: JSX.Element;
  layout?: JSX.Element;
  redirectIfAuthenticated?: boolean;
  private?: boolean;
  admin?: boolean;
};
export type Routes = Route[];

interface RoleAndRoutes {
  role: "user" | "admin" | "quality_review";
  routes: Routes;
}

// Các route sử dụng chung cho tất cả role
const commonRoutes: Routes = [
  {
    path: ROUTES.SIGN_IN,
    component: (
      <BasicLayout>
        <SigninPage />
      </BasicLayout>
    ),
    redirectIfAuthenticated: true,
  },
  {
    path: ROUTES.SIGN_OUT,
    component: <SignoutPage />,
    private: true,
  },
  {
    path: ROUTES.PROFILE,
    component: <ProfilePage />,
    private: true,
  },

  {
    path: ROUTES.landing_page_draft(),
    component: <LandingPageDraft />,
  },
  {
    path: ROUTES.instructor_bio(),
    component: (
      <BasicLayout>
        <InstructorBioPage />
      </BasicLayout>
    ),
  },
  {
    path: ROUTES.check_video(),
    component: (
      <CheckVideoProvider>
        <CheckVideoPage />
      </CheckVideoProvider>
    ),
  },
];

export const adminRoutes: RoleAndRoutes = {
  role: "admin",
  routes: [
    ...commonRoutes,
    {
      path: ROUTES.OVERVIEW,
      component: (
        <AdminLayout
          breadcrumb={["Quản lý", <Link to={ROUTES.OVERVIEW}>Tổng quan</Link>]}
        >
          <OverviewPage />
        </AdminLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.ADMIN_REVIEW,
      component: (
        <AdminLayout
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.ADMIN_REVIEW}>Khóa học cần xét duyệt</Link>,
          ]}
        >
          <AdminReviewPage />
        </AdminLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.INSTRUCTOR_MANAGEMENT,
      component: (
        <AdminLayout
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.INSTRUCTOR_MANAGEMENT}>Giảng viên</Link>,
          ]}
        >
          <InstructorManagementPage />
        </AdminLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.STUDENT_MANAGEMENT,
      component: (
        <AdminLayout
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.STUDENT_MANAGEMENT}>Học viên</Link>,
          ]}
        >
          <StudentManagementPage />
        </AdminLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.QUALITY_REVIEW,
      component: (
        <AdminLayout
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.QUALITY_REVIEW}>Đội ngũ chuyên môn</Link>,
          ]}
        >
          <QualityReviewPage />
        </AdminLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.ANALYTICS_ADMIN,
      component: (
        <AdminLayout
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.ANALYTICS_ADMIN}>Phạm vi tiếp cận</Link>,
          ]}
        >
          <AnalyticsAdminPage />
        </AdminLayout>
      ),
      private: true,
    },
    {
      path: "*",
      component: (
        <AdminLayout>
          <NotFound />
        </AdminLayout>
      ),
    },
  ],
};

export const qualityReviewRoutes: RoleAndRoutes = {
  role: "quality_review",
  routes: [
    ...commonRoutes,
    {
      path: ROUTES.QUALITY_COURSE_REVIEW,
      component: (
        <QualityReviewLayout
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.QUALITY_COURSE_REVIEW}>
              Kiểm duyệt chất lượng khóa học
            </Link>,
          ]}
        >
          <QualityCourseReviewPage />
        </QualityReviewLayout>
      ),
      private: true,
    },
    {
      path: "*",
      component: (
        <QualityReviewLayout>
          <NotFound />
        </QualityReviewLayout>
      ),
    },
  ],
};

export const userRoutes: RoleAndRoutes = {
  role: "user",
  routes: [
    ...commonRoutes,
    {
      path: ROUTES.OVERVIEW,
      component: (
        <InstructorView
          breadcrumb={["Quản lý", <Link to={ROUTES.OVERVIEW}>Tổng quan</Link>]}
        >
          <OverviewPage />
        </InstructorView>
      ),
      private: true,
    },
    {
      path: ROUTES.home("user"),
      component: (
        <BasicLayout>
          <Home />
        </BasicLayout>
      ),
    },
    {
      path: ROUTES.search(),
      component: (
        <BasicLayout>
          <SearchPage />
        </BasicLayout>
      ),
    },
    {
      path: ROUTES.subcategories(),
      component: (
        <BasicLayout key={ROUTES.subcategories()}>
          <CategoriesPage />
        </BasicLayout>
      ),
    },
    {
      path: ROUTES.topics(),
      component: (
        <BasicLayout key={ROUTES.topics()}>
          <CategoriesPage />
        </BasicLayout>
      ),
    },
    {
      path: ROUTES.categories(),
      component: (
        <BasicLayout key={ROUTES.categories()}>
          <CategoriesPage />
        </BasicLayout>
      ),
    },
    {
      path: ROUTES.course_basics(),
      component: (
        <InstructorCourseLayout key={ROUTES.course_basics()}>
          {(props: any) => <BasicsPage {...props} />}
          {/* callback => children() sẽ return <BasicsPage /> */}
        </InstructorCourseLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.price(),
      component: (
        <InstructorCourseLayout key={ROUTES.price()}>
          {(props: any) => <PricePage {...props} />}
        </InstructorCourseLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.intended_learners(),
      component: (
        <InstructorCourseLayout key={ROUTES.intended_learners()}>
          {(props) => <IntendedLearnersPage {...props} />}
        </InstructorCourseLayout>
      ),
      private: true,
    },
    {
      path: ROUTES["image_and_preview_video"](),
      component: (
        <InstructorCourseLayout key={ROUTES["image_and_preview_video"]()}>
          {(props: any) => <ImageAndVideoPage {...props} />}
        </InstructorCourseLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.curriculum(),
      component: (
        <InstructorCourseLayout key={ROUTES.curriculum()}>
          {(props: any) => <CurriculumPage {...props} />}
        </InstructorCourseLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.promotions(),
      component: (
        <InstructorCourseLayout key={ROUTES.promotions()}>
          {(props: any) => <PromotionsPage {...props} />}
        </InstructorCourseLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.learning(),
      component: (
        <LearningLayout>
          <LearningProvider>
            <LearningPage />
          </LearningProvider>
        </LearningLayout>
      ),
    },
    {
      path: ROUTES.MY_LEARNING,
      component: (
        <BasicLayout>
          <MyLearningPage />
        </BasicLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.INSTRUCTOR_COURSES,
      component: (
        <InstructorView
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.INSTRUCTOR_COURSES}>Khóa học</Link>,
          ]}
        >
          <InstructorCoursesPage />
        </InstructorView>
      ),
      private: true,
    },
    {
      path: ROUTES.detail_course(),
      component: (
        <BasicLayout>
          <DetailCoursePage />
        </BasicLayout>
      ),
    },
    {
      path: ROUTES.SIGN_UP,
      component: (
        <BasicLayout>
          <SignupPage />
        </BasicLayout>
      ),
      redirectIfAuthenticated: true,
    },
    {
      path: ROUTES.PURCHASE_HISTORY,
      component: (
        <BasicLayout>
          <PurchaseHistoryPage />
        </BasicLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.CREATE_COURSE,
      component: (
        <BasicLayout>
          <CreateCoursePage />
        </BasicLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.CHECKOUT,
      component: (
        <CheckoutLayout>
          <CheckoutPage />
        </CheckoutLayout>
      ),
      private: true,
    },
    {
      path: ROUTES.CART,
      component: (
        <BasicLayout>
          <CartPage />
        </BasicLayout>
      ),
    },
    {
      path: ROUTES.REVIEW_FILTER,
      component: (
        <InstructorView
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.REVIEW_FILTER}>Đánh giá từ học viên</Link>,
          ]}
        >
          <ReviewFilterPage />
        </InstructorView>
      ),
    },
    {
      path: ROUTES.INSTRUCTOR_REVENUE,
      component: (
        <InstructorView
          breadcrumb={[
            "Quản lý",
            <Link to={ROUTES.INSTRUCTOR_REVENUE}>Doanh thu khóa học</Link>,
          ]}
        >
          <InstructorRevenuePage />
        </InstructorView>
      ),
    },
    {
      path: ROUTES.YOUR_REACH,
      component: (
        <InstructorView
          breadcrumb={[
            "Giảng viên",
            <Link to={ROUTES.YOUR_REACH}>Phạm vi tiếp cận</Link>,
          ]}
        >
          <YourReachPage />
        </InstructorView>
      ),
    },
    {
      path: "*",
      component: (
        <BasicLayout>
          <NotFound />
        </BasicLayout>
      ),
    },
  ],
};

const allRoutes: Routes = _.uniqBy(
  [...userRoutes.routes, ...adminRoutes.routes, ...qualityReviewRoutes.routes],
  "path"
);

export default allRoutes;
