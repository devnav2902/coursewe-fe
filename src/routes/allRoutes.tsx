import Home from "../pages/home/page/index.page";
import NotFound from "../pages/404/pages/index";
import SigninPage from "../pages/signin/page/signin.page";
import SignupPage from "../pages/signup/page/signup.page";
import { ROUTES } from "../utils/constants";
import PurchaseHistoryPage from "../pages/purchase-history/page/purchaseHistory.page";

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
  { path: "*", component: <NotFound /> },
];

export default routes;
