import React from "react";
import Modal from "../modal/modal";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmModal = ({
  description,
  handleClose,
  handleConfirm,
  isOpen,
  title,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} isBackdropClosable={true}>
      <div className="w-[300px] px-4 pb-4 pt-7">
        <h2 className="text-semibold-18 mb-5 text-center">{title}</h2>
        <p className="whitespace-pre-line text-center">{description}</p>

        <div className="mt-[18px] flex h-[64px] items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={handleClose}>
            <p className="text-medium-16 text-[#adb5bd]">취소</p>
          </Button>
          <Button size="sm" onClick={handleConfirm}>
            <p className="text-medium-16 text-white">확인</p>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
