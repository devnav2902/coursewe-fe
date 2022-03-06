import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes/allRoutes";
import { Routes as IRoutes } from "./routes/allRoutes";
import TopNav from "./components/TopNav/TopNav.component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser, login } from "./redux/actions/account.actions";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Loading from "./components/Loading/Loading.component";
import { ROUTES } from "./utils/constants";

function App(): JSX.Element {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <TopNav />
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
      </BrowserRouter>
    </>
  );
}

export default App;
