import { InputProps as NextUIInputProps, Input as NextUIInput } from '@nextui-org/react';
import { ReactNode, forwardRef } from 'react';

interface InputProps extends NextUIInputProps {
  label: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <NextUIInput {...props} ref={ref} />;
});

Input.displayName = 'Input';
