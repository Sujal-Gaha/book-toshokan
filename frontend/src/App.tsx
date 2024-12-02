import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/common/login";
import { RegisterPage } from "./pages/common/register";
import { AuthLayout } from "./pages/common/auth-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppLayout } from "./pages/common/app-layout";
import { HomePage } from "./pages/user/home.page";
import { BookPage } from "./pages/user/book.page";
import { BookRecommendationsPage } from "./pages/user/recommendation";
import { SubscribedBooksTable } from "./pages/user/subscribed";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/book/:bookId",
        element: <BookPage />,
      },
      {
        path: "/recommendation",
        element: <BookRecommendationsPage />,
      },
      {
        path: "/subscribed",
        element: <SubscribedBooksTable />,
      },
    ],
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
