import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Button from "./Button";

export const SuccessModal = ({
  onClose,
  title,
  description,
  dlink = "",
  refetch,
}: {
  onClose: () => void;
  title: string;
  description: string;
  dlink?: string;
  refetch?: () => void;
}) => {
  const router = useRouter();

  const handleRedirect = async () => {
    await router.push(dlink || "/Dashboard/support");

    onClose();
    if (refetch) {
      refetch();
    }
  };

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
          <div className="w-full" onClick={handleRedirect}>
            <Button title="GO BACK TO DASHBOARD" variant="blue" full />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
