"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface ModalComponentProps extends ModalProps {
  children: ReactNode;
  footer?: ReactNode;
}

export const ModalComponent = ({
  children,
  footer,
  ...props
}: ModalComponentProps) => {
  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {props.title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {footer ? (
                footer
              ) : (
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
