import { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "./hooks/redux.hooks";
import { getCurrentUser } from "./redux/slices/user.slice";
import routes, { Routes as IRoutes } from "./routes/allRoutes";
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

  return (
    <Suspense fallback={<div></div>}>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            {routes.map((route: IRoutes, idx: number) => {
              if (!user.loaded) return null;

              if (route.redirectIfAuthenticated && user.profile) {
                return (
                  <Route
                    key={idx}
                    path={route.path}
                    element={<Navigate to="/" />}
                  />
                );
              }

              if (route.admin) {
                return (
                  <Route
                    key={idx}
                    path={route.path}
                    element={
                      user.profile?.role.name === "user" ? (
                        <Navigate to="/" />
                      ) : (
                        route.component
                      )
                    }
                  />
                );
              }

              if (route.private && !user.profile) {
                return (
                  <Route
                    key={idx}
                    path={route.path}
                    element={<Navigate to={ROUTES.SIGN_IN} />}
                  />
                );
              }

              return (
                <Route key={idx} path={route.path} element={route.component} />
              );
            })}
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
