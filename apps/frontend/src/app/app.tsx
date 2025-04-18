import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { LoginPage, RegisterPage, AppLayout, AuthLayout } from '../pages/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { HomePage, BookFeedPage, BookPage, SubscribedBooksTable } from '../pages/user';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { AdminHomePage } from '../pages/admin';
import { AdminNavbar } from '../components/admin-navbar';

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <AuthLayout>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthLayout>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/book/:bookId',
        element: <BookPage />,
      },
      {
        path: '/feed',
        element: <BookFeedPage />,
      },
      {
        path: '/subscribed',
        element: <SubscribedBooksTable />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <main className="bg-gray-100 dark:bg-background/80 h-screen">
        <AdminNavbar />
        <AdminHomePage />
      </main>
    ),
  },
  {
    path: 'auth',
    element: <Outlet />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
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
