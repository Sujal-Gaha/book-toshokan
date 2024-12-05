import { ReactNode } from 'react';
import { useThemeStore } from '../../store/useThemeStore';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { mode } = useThemeStore();
  return <main className={mode}>{children}</main>;
};
