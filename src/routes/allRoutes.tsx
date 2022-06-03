import React from "react";
import CheckoutLayout from "../layouts/checkout.layout";
import { LearningProvider } from "../pages/learning/hooks/leaning.hooks";
import { ROUTES } from "../utils/constants";

const BasicLayout = React.lazy(() => import("../layouts/basic.layout"));
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
  () => import("../pages/create-course/page/createCourse.page")
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

export type Routes = {
  exact?: boolean;
  path: string;
  component: JSX.Element;
  layout?: JSX.Element;
  redirectIfAuthenticated?: boolean;
  private?: boolean;
  admin?: boolean;
};

const routes: Routes[] = [
  {
    path: "/",
    component: (
      <BasicLayout>
        <Home />
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
      <InstructorView>
        <InstructorCoursesPage />
      </InstructorView>
    ),
    private: true,
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
    path: ROUTES.detail_course(),
    component: (
      <BasicLayout>
        <DetailCoursePage />
      </BasicLayout>
    ),
  },
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
    path: ROUTES.OVERVIEW,
    component: (
      <InstructorView>
        <OverviewPage />
      </InstructorView>
    ),
    private: true,
  },
  {
    path: ROUTES.PROFILE,
    component: <ProfilePage />,
    private: true,
  },
  {
    path: ROUTES.ADMIN_REVIEW,
    component: (
      <InstructorView>
        <AdminReviewPage />
      </InstructorView>
    ),
    private: true,
    admin: true,
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
    path: ROUTES.landing_page_draft(),
    component: (
      <BasicLayout>
        <LandingPageDraft />
      </BasicLayout>
    ),
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
    path: "*",
    component: (
      <BasicLayout>
        <NotFound />
      </BasicLayout>
    ),
  },
];

export default routes;
