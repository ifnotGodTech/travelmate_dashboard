import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";
import Button from "./Button";
export const SuccessModal = ({
  onClose,
  title,
  description,
}: {
  onClose: () => void;
  title: string;
  description: string;
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-full lg:min-w-[800px] p-[40px]">
        <div className="space-y-[40px] flex flex-col items-center">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-[500] text-[#181818]">
              {title}
            </DialogTitle>
          </DialogHeader>
          <img
            src="/assets/icons/success-big.svg"
            alt="Success"
            className="w-20 h-20 my-6"
          />
          <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
            {description}
          </DialogDescription>
          <Link href="/Dashboard/support" className="w-full">
            <Button title="GO BACK TO DASHBOARD" variant="blue" full />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
