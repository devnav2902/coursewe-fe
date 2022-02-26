import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/allRoutes";
import { Routes as IRoutes } from "./routes/allRoutes";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route: IRoutes, idx: number) => {
          return (
            <Route key={idx} path={route.path} element={route.component} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
