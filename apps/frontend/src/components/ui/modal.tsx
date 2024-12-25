'use client';

import {
  Modal as NextUIModal,
  ModalContent as NextUIModalContent,
  ModalHeader as NextUIModalHeader,
  ModalBody as NextUIModalBody,
  ModalProps as NextUIModalProps,
} from '@nextui-org/react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalComponentProps extends Omit<NextUIModalProps, 'backdrop'> {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  title: string;
  children: ReactNode;
}

export const ModalComponent = ({
  children,
  title,
  ...props
}: ModalComponentProps) => {
  return (
    <NextUIModal backdrop="transparent" {...props}>
      <NextUIModalContent>
        {() => (
          <>
            <NextUIModalHeader className="flex flex-col gap-1">
              {title}
            </NextUIModalHeader>
            <NextUIModalBody>{children}</NextUIModalBody>
          </>
        )}
      </NextUIModalContent>
    </NextUIModal>
  );
};
