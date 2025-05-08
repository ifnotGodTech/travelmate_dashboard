"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
// import ConfirmWindow from "@/components/molecues/admin/ConfirmWindow";
const ManageUsers = (props: Props) => {
  const [defaultTab, setDefaultTab] = useState("addNewUser");
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const [addUSerModal, setIsAddUserModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // New state for "Remove Existing Users" modals
  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
  const [showSuccessRemoveModal, setShowSuccessRemoveModal] = useState(false);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsAddUserModal(false); // Close the dialog after selecting an option
  };

  const options = [
    "Admin",
    "Super Admin",
    "User",
    "Manager",
    "Editor",
    "Viewer",
    "Guest",
  ];

  // Sample users
  const users = Array(6)
    .fill(null)
    .map((_, i) => ({
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Admin",
    }));

  useEffect(() => {
    if (showSuccessModal || showSuccessRemoveModal) {
      const timeout = setTimeout(() => {
        setShowSuccessModal(false);
        setShowSuccessRemoveModal(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  });

  return (
    <div className="flex min-h-screen bg-background rounded-lg">
      <main className="w-full">
        <div className="rounded-lg bg-card md:px-5 px-0 pt-5">
          <div className="flex items-center justify-normal lg:gap-72 gap-32 mb-5">
            <Image
              src="/assets/icons/arrow-back.svg"
              alt="arrow-back"
              width={20}
              height={20}
              className="font-bold cursor-pointer"
              onClick={() => route.back()}
            />
            <h1 className="text-lg font-bold text-center ">Manage User</h1>
          </div>
          <Tabs
            defaultValue="addNewUser"
            className="space-y-6"
            onValueChange={setDefaultTab}
          >
            <TabsList className="w-full border-b rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="addNewUser"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 cursor-pointer"
              >
                Add New User
              </TabsTrigger>

              <TabsTrigger
                value="removeExistingUser"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 cursor-pointer"
              >
                Remove Existing User
              </TabsTrigger>
            </TabsList>

            <TabsContent value="addNewUser" className="space-y-4">
              <div>
                <p>Assign user from another role</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full p-2 py-3 rounded-[8px] space-x-4 mt-3 border-[#9b9ea4] border-[1px] flex justify-between bg-transparent">
                      <span>{selectedOption || "Select User"}</span>
                      <img
                        src="/assets/icons/arrow-down.svg"
                        alt=""
                        className="w-4 h-4 ml-auto"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)]"
                  >
                    {options.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        className="w-full text-center px-4 py-2 hover:bg-gray-200"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  onClick={() => setShowConfirmModal(true)}
                  className="bg-[#023E8A] hover:bg-blue-800 cursor-pointer mt-24 w-full text-center"
                >
                  Add
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="removeExistingUser" className="space-y-8">
              <div>
                <p className="font-bold">Select Users to remove</p>
                {users.map((user, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 w-full"
                  >
                    <div>
                      <p>{user.name}</p>
                      <p>{user.email}</p>
                    </div>
                    <input type="checkbox" name="remove" id="remove" />
                  </div>
                ))}
                <Button
                  onClick={() => setShowConfirmRemoveModal(true)}
                  className="bg-[#D72638] hover:bg-red-800 cursor-pointer mt-24 w-full text-center"
                >
                  Remove
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Confirm Member Transfer Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent className="w-full lg:max-w-lg max-w-sm p-4">
            <div className="space-y-[40px] flex flex-col items-center">
              <DialogHeader className="text-left">
                <DialogTitle className="text-xl font-bold text-[#181818]">
                  Confirm Member Transfer?
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="lg:text-base text-[12px] text-gray-700 text-left px-4 font-[500]">
                You are about to add 2 selected users to this role. These users
                will be removed from their current roles. Do you want to
                proceed?
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2 justify-end pt-5">
              <Button
                className="border text-black border-[#023E8A] p-2 bg-transparent hover:bg-transparent cursor-pointer"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowSuccessModal(true);
                  setShowConfirmModal(false);
                }}
                className="bg-[#023E8A] p-2 px-4 hover:bg-blue-700 cursor-pointer"
              >
                Yes, Proceed
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Modal for Adding New User */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="w-full lg:max-w-sm max-w-sm p-8">
            <div className="flex flex-col items-center">
              <DialogHeader className="text-center">
                <DialogTitle className="text-xl font-[500] text-[#181818]">
                  Success
                </DialogTitle>
              </DialogHeader>
              <img
                src="/assets/icons/blue-success.svg"
                alt="Success"
                className="w-20 h-20 my-6"
              />
              <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-bold">
                User Added Successfully
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>

        {/* Confirm Remove Users Modal */}
        <Dialog
          open={showConfirmRemoveModal}
          onOpenChange={setShowConfirmRemoveModal}
        >
          <DialogContent className="w-full lg:max-w-lg max-w-sm p-4">
            <div className="space-y-[40px] flex flex-col items-center">
              <DialogHeader className="text-left">
                <DialogTitle className="text-xl font-bold text-[#181818]">
                  Confirm Remove Users?
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="lg:text-base text-[12px] text-gray-700 text-left px-4 font-[500]">
              You are about to remove the selected users from Support Agent role. They will no longer have access to these role permissions. Do you want to proceed?
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2 justify-end pt-5">
              <Button
                className="border text-black border-[#023E8A] p-2 bg-transparent hover:bg-transparent cursor-pointer"
                onClick={() => setShowConfirmRemoveModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowSuccessRemoveModal(true);
                  setShowConfirmRemoveModal(false);
                }}
                className="bg-[#023E8A] p-2 px-4 hover:bg-blue-700 cursor-pointer"
              >
                Yes, Proceed
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Modal for Removing Users */}
        <Dialog
          open={showSuccessRemoveModal}
          onOpenChange={setShowSuccessRemoveModal}
        >
          <DialogContent className="w-full lg:max-w-sm max-w-sm p-8">
            <div className="flex flex-col items-center">
              <DialogHeader className="text-center">
                <DialogTitle className="text-xl font-[500] text-[#181818]">
                </DialogTitle>
              </DialogHeader>
              <img
                src="/assets/icons/blue-success.svg"
                alt="Success"
                className="w-20 h-20 my-6"
              />
              <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-bold">
                Users Removed Successfully
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ManageUsers;
