import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading/Loading.component";
import { getCurrentUser } from "./redux/actions/account.actions";
import { getCartFromDTB } from "./redux/actions/cart.actions";
import routes, { Routes as IRoutes } from "./routes/allRoutes";
import { ROUTES } from "./utils/constants";

function App(): JSX.Element {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.profile) dispatch(getCartFromDTB());
  }, [user.profile, dispatch]);

  return (
    <>
      <BrowserRouter>
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
            } else if (route.nested) {
              return (
                <Route key={idx} path={route.path} element={route.component}>
                  {route.nested}
                </Route>
              );
            }
            return (
              <Route key={idx} path={route.path} element={route.component} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
