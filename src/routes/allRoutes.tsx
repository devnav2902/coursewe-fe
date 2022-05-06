import BasicLayout from "../layouts/basic.layout";
import InstructorCourseLayout from "../layouts/instructor-course.layout";
import LearningLayout from "../layouts/learning.layout";
import OverviewLayout from "../layouts/overview.layout";
import ProfileLayout from "../layouts/profile.layout";
import NotFound from "../pages/404/pages/index";
import AdminReviewPage from "../pages/admin-review/page/admin-review.page";
import CartPage from "../pages/cart/page/cart.page";
import CategoriesPage from "../pages/categories/pages/categories.page";
import CheckoutPage from "../pages/checkout/page/checkout.page";
import CourseDashRedirestPage from "../pages/course-dash-redirect/page/course-dash-redirest.page";
import CreateCoursePage from "../pages/create-course/page/createCourse.page";
import DetailCoursePage from "../pages/detail-course/page/detail-course.page";
import DraftPage from "../pages/draft/page/draft.page";
import BasicsPage from "../pages/edit-course/pages/basics.page";
import CurriculumPage from "../pages/edit-course/pages/curriculum.page";
import IntendedLearnersPage from "../pages/edit-course/pages/intended-learners.page";
import PricePage from "../pages/edit-course/pages/price.page";
import Home from "../pages/home/page/index.page";
import InstructorBioPage from "../pages/instructor-bio/page/instructor-bio.page";
import InstructorCoursesPage from "../pages/instructor-courses/page/instructor-courses.page";
import LearningPage from "../pages/learning/page/learning.page";
import MyLearningPage from "../pages/my-learning/page/my-learning.page";
import OverviewPage from "../pages/overview/page/overview.page";
import ProfilePage from "../pages/profile/page/profile.page";
import PurchaseHistoryPage from "../pages/purchase-history/page/purchaseHistory.page";
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
    path: ROUTES.SUBCATEGORIES,
    component: (
      <BasicLayout key={ROUTES.SUBCATEGORIES}>
        <CategoriesPage />
      </BasicLayout>
    ),
  },
  {
    path: ROUTES.TOPICS,
    component: (
      <BasicLayout key={ROUTES.TOPICS}>
        <CategoriesPage />
      </BasicLayout>
    ),
  },
  {
    path: ROUTES.CATEGORIES,
    component: (
      <BasicLayout key={ROUTES.CATEGORIES}>
        <CategoriesPage />
      </BasicLayout>
    ),
  },
  {
    path: ROUTES.COURSE_BASICS,
    component: (
      <InstructorCourseLayout>
        {(props: any) => <BasicsPage {...props} />}
        {/* callback => children() sẽ return <BasicsPage /> */}
      </InstructorCourseLayout>
    ),
    private: true,
  },
  {
    path: ROUTES.PRICE,
    component: (
      <InstructorCourseLayout>
        {(props: any) => <PricePage {...props} />}
      </InstructorCourseLayout>
    ),
    private: true,
  },
  {
    path: ROUTES.INTENDED_LEARNERS,
    component: (
      <InstructorCourseLayout>
        {(props: any) => <IntendedLearnersPage {...props} />}
      </InstructorCourseLayout>
    ),
    private: true,
  },
  {
    path: ROUTES.CURRICULUM,
    component: (
      <InstructorCourseLayout>
        {(props: any) => <CurriculumPage {...props} />}
      </InstructorCourseLayout>
    ),
    private: true,
  },
  {
    path: ROUTES.LEARNING,
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
    path: ROUTES.COURSE_DASH_REDIRECT,
    component: <CourseDashRedirestPage />,
    private: true,
  },
  {
    path: ROUTES.INSTRUCTOR_COURSES,
    component: (
      <OverviewLayout>
        <InstructorCoursesPage />
      </OverviewLayout>
    ),
    private: true,
  },
  {
    path: ROUTES.INSTRUCTOR_BIO,
    component: (
      <BasicLayout>
        <InstructorBioPage />
      </BasicLayout>
    ),
  },
  {
    path: ROUTES.DETAIL_COURSE,
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
      <OverviewLayout>
        <OverviewPage />
      </OverviewLayout>
    ),
    private: true,
  },
  {
    exact: true,
    path: ROUTES.PROFILE,
    component: (
      <ProfileLayout>
        {(props: any) => <ProfilePage {...props} />}
      </ProfileLayout>
    ),
    private: true,
  },
  {
    path: ROUTES.ADMIN_REVIEW,
    component: (
      <OverviewLayout>
        <AdminReviewPage />
      </OverviewLayout>
    ),
    private: true,
  },
  {
    path: ROUTES.CHECKOUT,
    component: <CheckoutPage />,
    private: true,
  },
  {
    path: ROUTES.COURSE_DRAFT,
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
