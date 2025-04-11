import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ErrorModal = ({
  isOpen,
  onClose,
  title = "Oops!",
  message = "Something went wrong.",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">{title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {message}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
