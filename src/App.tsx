import { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Loading from "./components/Loading/Loading.component";
import { useAppDispatch, useTypedSelector } from "./hooks/redux.hooks";
import { getCurrentUser } from "./redux/slices/user.slice";
import allRoutes, {
  adminRoutes,
  qualityReviewRoutes,
  Route as RouteType,
  userRoutes,
} from "./routes/allRoutes";
import { ROUTES } from "./utils/constants";

const ScrollToTop = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children;
};

function App(): JSX.Element {
  const user = useTypedSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser())
      .unwrap()
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  if (!user.loaded) return <Loading />;

  const role = user.profile?.role.name;
  let routes = allRoutes; // chưa đăng nhập sẽ lấy tất cả route

  switch (role) {
    case "admin":
      routes = adminRoutes.routes;
      break;
    case "user":
      routes = userRoutes.routes;
      break;
    case "quality_review":
      routes = qualityReviewRoutes.routes;
      break;

    default:
      break;
  }

  function routeCreated(route: RouteType, idx: number) {
    if (route.redirectIfAuthenticated && user.profile) {
      const path =
        role === "admin"
          ? ROUTES.home("admin")
          : role === "quality_review"
          ? ROUTES.home("quality_review")
          : ROUTES.home("user");

      return (
        <Route key={idx} path={route.path} element={<Navigate to={path} />} />
      );
    }

    if (route.private && !user.profile) {
      return (
        <Route
          path={route.path}
          key={idx}
          element={<Navigate to={ROUTES.SIGN_IN} />}
        />
      );
    }

    return <Route key={idx} path={route.path} element={route.component} />;
  }

  return (
    <Suspense fallback={<div></div>}>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            {routes.map((route, idx) => routeCreated(route, idx))}
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
