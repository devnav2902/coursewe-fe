import Home from "../pages/home/page/index.page";
import NotFound from "../pages/404/pages/index";
import SigninPage from "../pages/signin/page/signin.page";
import SignupPage from "../pages/signup/page/signup.page";
import { ROUTES } from "../utils/constants";
import PurchaseHistoryPage from "../pages/purchase-history/page/purchaseHistory.page";
import CartPage from "../pages/cart/page/cart.page";
import CreateCoursePage from "../pages/create-course/page/createCourse.page";
import InstructorBioPage from "../pages/instructor-bio/page/instructor-bio.page";
import DetailCoursePage from "../pages/detail-course/page/detail-course.page";
import MyLearningPage from "../pages/my-learning/page/my-learning.page";
import LearningPage from "../pages/learning/page/learning.page";
import InstructorCourseLayout from "../layouts/instructor-course.layout";
import BasicsPage from "../pages/edit-course/pages/basics.page";
import IntendedLearnersPage from "../pages/edit-course/pages/intended-learners.page";
import CurriculumPage from "../pages/edit-course/pages/curriculum.page";
import BasicLayout from "../layouts/basic.layout";

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
    exact: true,
    path: "/",
    component: (
      <BasicLayout>
        <Home />
      </BasicLayout>
    ),
  },
  {
    exact: true,
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
    exact: true,
    path: ROUTES.INTENDED_LEARNERS,
    component: (
      <InstructorCourseLayout>
        {(props: any) => <IntendedLearnersPage {...props} />}
      </InstructorCourseLayout>
    ),
    private: true,
  },
  {
    exact: true,
    path: ROUTES.CURRICULUM,
    component: (
      <InstructorCourseLayout>
        {(props: any) => <CurriculumPage {...props} />}
      </InstructorCourseLayout>
    ),
    private: true,
  },
  {
    exact: true,
    path: ROUTES.LEARNING,
    component: (
      <BasicLayout>
        <LearningPage />
      </BasicLayout>
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
    exact: true,
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
    component: <CreateCoursePage />,
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
    path: "*",
    component: (
      <BasicLayout>
        <NotFound />
      </BasicLayout>
    ),
  },
];

export default routes;
