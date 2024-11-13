import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/common/login";
import { RegisterPage } from "./pages/common/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello World</h1>,
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
