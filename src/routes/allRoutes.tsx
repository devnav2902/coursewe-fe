import BasicLayout from "../layouts/basic.layout";
import InstructorCourseLayout from "../layouts/instructor-course.layout";
import InstructorView from "../layouts/instructor-view.layout";
import LearningLayout from "../layouts/learning.layout";
import NotFound from "../pages/404/pages/index";
import AdminReviewPage from "../pages/admin-review/page/admin-review.page";
import CartPage from "../pages/cart/page/cart.page";
import CategoriesPage from "../pages/categories/pages/categories.page";
import CheckoutPage from "../pages/checkout/page/checkout.page";
import CreateCoursePage from "../pages/create-course/page/createCourse.page";
import DetailCoursePage from "../pages/detail-course/page/detail-course.page";
import DraftPage from "../pages/draft/page/draft.page";
import BasicsPage from "../pages/edit-course/pages/basics.page";
import CurriculumPage from "../pages/edit-course/pages/curriculum.page";
import ImageAndVideoPage from "../pages/edit-course/pages/image-and-video.page";
import IntendedLearnersPage from "../pages/edit-course/pages/intended-learners.page";
import PricePage from "../pages/edit-course/pages/price.page";
import PromotionsPage from "../pages/edit-course/pages/promotions.page";
import Home from "../pages/home/page/index.page";
import InstructorBioPage from "../pages/instructor-bio/page/instructor-bio.page";
import InstructorCoursesPage from "../pages/instructor-courses/page/instructor-courses.page";
import LearningPage from "../pages/learning/page/learning.page";
import MyLearningPage from "../pages/my-learning/page/my-learning.page";
import OverviewPage from "../pages/overview/page/overview.page";
import ProfilePage from "../pages/profile/page/profile.page";
import PurchaseHistoryPage from "../pages/purchase-history/page/purchase-history.page";
import SigninPage from "../pages/signin/page/signin.page";
import SignupPage from "../pages/signup/page/signup.page";
import { ROUTES } from "../utils/constants";

export type Routes = {
  exact?: boolean;
  path: string;
  component: JSX.Element;
  layout?: JSX.Element;
  redirectIfAuthenticated?: boolean;
  private?: boolean;
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
        <LearningPage />
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
  },
  {
    path: ROUTES.CHECKOUT,
    component: <CheckoutPage />,
    private: true,
  },
  {
    path: ROUTES.course_draft(),
    component: <DraftPage />,
    // private: true,
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
