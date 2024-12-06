import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "./Root/Root";
import ProductDetails from "../Pages/Products/ProductDetails";
import ProfilePage from "./ProfilePage";
import Product from "../Pages/Products/Product";
import Dashboard from "./Dashboard/Dashboard";
import AdminRoute from "../components/shared/AdminRoute";
const router = createBrowserRouter([
  {
    element: <Root></Root>,
    path: "/",
    // errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "/product",
        element: <Product></Product>,
      },
      {
        path: "products/:id",
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) =>
          fetch(
            `https://test-2-tan-chi.vercel.app/api/v1/products/${params.id}`
          ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <Dashboard></Dashboard>
      </AdminRoute>
    ),
    children: [
      {
        path: "",
      },
    ],
  },
]);

export default router;
