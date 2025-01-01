import { PropsWithChildren } from "react";
import Portal from "./portal";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  handleClose: () => void;
  isBackdropClosable?: boolean;
}

const Modal = ({
  isOpen,
  handleClose,
  isBackdropClosable = true,
  children,
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <Portal elementId="modal">
          <div
            className="fixed inset-0 z-[99] bg-[rgba(0,0,0,0.7)]"
            onClick={() => isBackdropClosable && handleClose()}
          />
          <div className="fixed left-1/2 top-1/2 z-[100] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white">
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Modal;
