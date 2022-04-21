import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Loading from "./components/Loading/Loading.component";
import { getCurrentUser } from "./redux/actions/account.actions";
import { getCartFromDTB } from "./redux/actions/cart.actions";
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
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.loaded) {
      dispatch(getCartFromDTB());
    }
  }, [user.loaded, dispatch]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            {routes.map((route: IRoutes, idx: number) => {
              if (route.redirectIfAuthenticated && user.profile) {
                return (
                  <Route
                    key={idx}
                    path={route.path}
                    element={<Navigate to="/" />}
                  />
                );
              } else if (route.private && !user.profile) {
                return (
                  <Route
                    key={idx}
                    path={route.path}
                    element={
                      !user.loaded ? (
                        <Loading>
                          <Spin size="large" indicator={<LoadingOutlined />} />
                        </Loading>
                      ) : (
                        <Navigate to={ROUTES.SIGN_IN} />
                      )
                    }
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
    </>
  );
}

export default App;
