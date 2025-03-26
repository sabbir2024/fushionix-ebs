import { createBrowserRouter } from "react-router";
import Main from "../leyout/Main";
import Home from "../pages/home/Home";
import Dashbord from "../leyout/Dashbord";
import AddProduct from "../pages/dashbord/addProduct/AddProduct";
import Products from "../pages/dashbord/products/Products";
import UpdateProducts from "../pages/dashbord/updateProduct/UpdateProducts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AddCustomer from "../pages/dashbord/add-customer/AddCustomer";


const axiosSecure = useAxiosSecure()

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "/",
        Component: Home,

      },
    ],
  },
  {
    path: 'dashbord',
    Component: Dashbord,
    children: [
      {
        path: 'add-product',
        Component: AddProduct
      },
      {
        path: 'products',
        Component: Products
      },
      {
        path: 'update-product/:id',
        Component: UpdateProducts,
        loader: async ({ params }) => {
          const { data } = await axiosSecure.get(`/product/${params.id}`);
          return data;
        }
      },
      {
        path: 'add-customer',
        Component: AddCustomer
      },
    ]
  }
]);

export default Router;