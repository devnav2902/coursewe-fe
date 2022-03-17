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
    path: ROUTES.LEARNING,
    component: <LearningPage />,
  },
  {
    path: ROUTES.MY_LEARNING,
    component: <MyLearningPage />,
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
    path: ROUTES.CART,
    component: <CartPage />,
  },
  { path: "*", component: <NotFound /> },
];

export default routes;
