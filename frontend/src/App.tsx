import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        element: <h1>Login Page</h1>,
      },
      {
        path: "register",
        element: <h1>Register Page</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
