import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/common/login";
import { RegisterPage } from "./pages/common/register";
import { AuthLayout } from "./pages/common/auth-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppLayout } from "./pages/common/app-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello World</h1>,
  },
  {
    path: "auth",
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
