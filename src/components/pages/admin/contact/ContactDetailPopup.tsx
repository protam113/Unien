'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const ContactDetailPopup = ({
  contact,
  open,
  onClose,
}: {
  contact: any;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-2xl font-semibold">
              Contact Detail
            </Dialog.Title>

            <Dialog.Close asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <strong>Name:</strong> {contact?.name}
            </div>
            <div>
              <strong>Email:</strong> {contact?.email}
            </div>
            <div>
              <strong>Phone Number:</strong> {contact?.phone_number}
            </div>
            <div>
              <strong>Message:</strong> {contact?.message}
            </div>
            <div>
              <strong>Service:</strong> {contact?.service?.name}
            </div>
            <div>
              <strong>Status:</strong> {contact?.status}
            </div>
            <div>
              <strong>Created At:</strong>{' '}
              {new Date(contact?.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>Updated At:</strong>{' '}
              {new Date(contact?.updatedAt).toLocaleString()}
            </div>
          </div>

          <div className="pt-4 text-right">
            <Button onClick={onClose}>Close</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ContactDetailPopup;
