import {
  InputProps as NextUIInputProps,
  Input as NextUIInput,
} from '@nextui-org/react';
import { ReactNode } from 'react';

interface InputProps extends NextUIInputProps {
  label: ReactNode;
}

export const Input = (props: InputProps) => {
  return <NextUIInput {...props} />;
};
