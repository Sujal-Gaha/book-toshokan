import { useLocation } from 'react-router-dom';
import { getAppsPath } from '../utils/getAppsPath';

export const usePathState = () => {
  const {
    homePage,
    feedPage,
    forgotPasswordPage,
    loginPage,
    registerPage,
    myBooksPage,
  } = getAppsPath();

  const { pathname } = useLocation();

  const isHomePage = pathname === homePage;
  const isFeedPage = pathname === feedPage;
  const isForgotPasswordPage = pathname === forgotPasswordPage;
  const isLoginPage = pathname === loginPage;
  const isRegisterPage = pathname === registerPage;
  const isMyBooksPage = pathname === myBooksPage;

  return {
    isHomePage,
    isFeedPage,
    isForgotPasswordPage,
    isLoginPage,
    isRegisterPage,
    isMyBooksPage,
  } as const;
};
