import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import CustomButton from "./CustomButton";

export function Modal({ setIsOpen, isOpen }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg border bg-white p-12 rounded-lg">
          <DialogTitle className="font-bold text-center">
            Are You Sure?
          </DialogTitle>
          <Description className="text-center mt-2">
            You will lose all your progress!
          </Description>
          <div className="flex">
            <CustomButton type="error" onClick={() => setIsOpen(false)}>
              Cancel
            </CustomButton>
            <CustomButton
              type="success"
              onClick={() => window.location.reload()}
            >
              Yes
            </CustomButton>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
