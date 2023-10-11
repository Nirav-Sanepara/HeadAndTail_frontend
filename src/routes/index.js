import Login from '../Pages/Login'
import Home from "../Pages/Home"
import Page404 from '../Pages/Page404';
import Register from '../Pages/Register';
import About from '../Pages/About';
import HeadAndTail from '../Pages/HeadAndTail';

// All routes
export const ROUTES = [
  {
    path: "/login",
    isPrivate: false,
    Component: Login,
  },
  {
    path: "/register",
    isPrivate: false,
    Component: Register,
  },
  {
    path: "/head&tail",
    isPrivate: true,
    Component: HeadAndTail,
  },
  {
    path: "/about",
    isPrivate: true,
    Component: About,
  },
  {
    path: "/",
    isPrivate: true,
    Component: Home,
  },
  {
    path: "*",
    isPrivate: false,
    Component: Page404,
  },
];