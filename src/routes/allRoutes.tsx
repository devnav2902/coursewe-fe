import Home from "../pages/home/pages/index";
import NotFound from "../pages/404/pages/index";

export type Routes = { exact?: boolean; path: string; component: JSX.Element };

const routes: Routes[] = [
  { exact: true, path: "/", component: <Home /> },
  { path: "*", component: <NotFound /> },
];

export default routes;
