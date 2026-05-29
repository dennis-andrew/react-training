import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.tsx";
import App from "./App.tsx";
import Cart from "./pages/Cart.tsx";
import Contact from "./pages/Contact.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Shop from "./pages/Shop.tsx";
import Signup from "./pages/Signup.tsx";

const routes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
);
