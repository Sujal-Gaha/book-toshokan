import { ReactNode } from 'react';
import { useTheme } from 'next-themes';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return <main className={theme}>{children}</main>;
};
