import { ReactNode, useEffect, useState } from 'react';
import { authClient } from '../../auth/authClient';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@book-toshokan/libs/shared-ui';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await authClient.getSession();
        if (!res.data) {
          navigate('/auth/login');
        }
      } catch (e) {
        console.error('Session error:', e);
        navigate('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return <div>{children}</div>;
};
