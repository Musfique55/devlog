import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  openingButtonText?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  children,
  title,
  description,
  openingButtonText,
  open,
  setOpen,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {openingButtonText ? (
        <DialogTrigger asChild>
          <Button variant="outline">{openingButtonText}</Button>
        </DialogTrigger>
      ) : (
        ""
      )}

      <DialogContent className="sm:max-w-sm ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description && description}</DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
