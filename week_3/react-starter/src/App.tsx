import type { FC } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SummaryCard from "./components/SummaryCard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import UserDetails from "./pages/UserDetails";
import UserListing from "./UserListing";

const getTitle = (pathName: string) => {
  if (pathName === "/users") {
    return "Team Listing";
  }

  if (pathName === "/details") {
    return "User Details";
  }

  if (pathName === "/settings") {
    return "Settings";
  }

  return "Page Not Found";
};

const AppLayout: FC = () => {
  const location = useLocation();
  const title = getTitle(location.pathname);

  const isUsersPage = location.pathname === "/users";

  return (
    <>
      <Header title={title}></Header>
      <main>
        {isUsersPage && (
          <section className="summary-cards">
            <SummaryCard label="Total Users" value="6" note="4 active team members" />
            <SummaryCard label="Departments" value="6" note="Across product teams" />
            <SummaryCard label="Inactive Users" value="2" note="Need account review" />
          </section>
        )}

        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace></Navigate>,
      },
      {
        path: "users",
        element: <UserListing></UserListing>,
      },
      {
        path: "details",
        element: <UserDetails></UserDetails>,
      },
      {
        path: "settings",
        element: <Settings></Settings>,
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
