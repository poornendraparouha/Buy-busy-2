// Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Pages/App/Products";
import SignIn from "./Pages/App/SignIn";
import SignUp from "./Pages/App/SignUp";
import Page404 from "./Pages/Misc/Page 404/Page404";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CartPage from "./Pages/App/Cart";
import OrderPage from "./Pages/App/Orders";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App() {
  // Creating router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Products /> },
        { path: "/signIn", element: <SignIn /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/orders", element: <OrderPage /> }
      ]
    }
  ])
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      {/* Notification Component */}
      <ToastContainer />
    </>
  );
}

export default App;
