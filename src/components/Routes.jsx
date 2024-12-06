import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "./Root/Root";
import ProductDetails from "../Pages/Products/ProductDetails";
import ProfilePage from "./ProfilePage";
import Product from "../Pages/Products/Product";
import Dashboard from "./Dashboard/Dashboard";
import AdminRoute from "../components/shared/AdminRoute";
import CreateProduct from "./Dashboard/Createproduct";
import AllProducts from "./Dashboard/AllProducts";
import Modal from "./shared/Modal/Modal";
import DeleteProduct from "./Dashboard/DeleteProduct";
import ErrorPage from "./shared/ErrorPage";
import Cart from "../Pages/Cart/Cart";

const router = createBrowserRouter([
  {
    element: <Root></Root>,
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/register",
        element: <Modal></Modal>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
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
        element: <CreateProduct></CreateProduct>,
      },
      {
        path: "productlist",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "deleteproduct",
        element: <DeleteProduct></DeleteProduct>,
      },
    ],
  },
]);

export default router;
