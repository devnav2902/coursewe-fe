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
import { InstructorCoursesPage } from "../pages/instructor-courses/page/instructor-courses.page";
import OverviewPage from "../pages/overview/page/overview.page";
import ProfilePage from "../pages/profile/page/profile.page";
import DraftPage from "../pages/draft/page/draft.page";

export type Routes = {
  exact?: boolean;
  path: string;
  component: JSX.Element;
  redirectIfAuthenticated?: boolean;
  private?: boolean;
};

const routes: Routes[] = [
  {
    exact: true,
    path: "/",
    component: <Home />,
  },
  {
    exact: true,
    path: ROUTES.INSTRUCTOR_COURSES,
    component: <InstructorCoursesPage />,
    private: true,
  },
  {
    exact: true,
    path: ROUTES.INSTRUCTOR_BIO,
    component: <InstructorBioPage />,
  },
  {
    path: ROUTES.DETAIL_COURSE,
    component: <DetailCoursePage />,
  },
  {
    path: ROUTES.SIGN_IN,
    component: <SigninPage />,
    redirectIfAuthenticated: true,
  },
  {
    path: ROUTES.SIGN_UP,
    component: <SignupPage />,
    redirectIfAuthenticated: true,
  },
  {
    path: ROUTES.PURCHASE_HISTORY,
    component: <PurchaseHistoryPage />,
    private: true,
  },
  {
    path: ROUTES.CREATE_COURSE,
    component: <CreateCoursePage />,
    private: true,
  },
  {
    path: ROUTES.OVERVIEW,
    component: <OverviewPage />,
    private: true,
  },
  {
    path: ROUTES.PROFILE,
    component: <ProfilePage />,
    private: true,
  },
  {
    path: ROUTES.COURSE_DRAFT,
    component: <DraftPage />,
    private: true,
  },
  {
    path: ROUTES.CART,
    component: <CartPage />,
  },
  { path: "*", component: <NotFound /> },
];

export default routes;
