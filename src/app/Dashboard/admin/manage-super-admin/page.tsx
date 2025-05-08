"use client";

import Image from "next/image";
import { useState } from "react";
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
} from "@/components/ui/dialog";

type Props = {};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";

const ManageSuperAdmin = (props: Props) => {
  const [defaultTab, setDefaultTab] = useState("addNewUser");
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const [addUSerModal, setIsAddUserModal] = useState(false);
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
  const users = Array(4)
    .fill(null)
    .map((_, i) => ({
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Admin",
    }));
  return (
    <div className="flex min-h-screen bg-background rounded-lg">
      {/* Main Content */}
      <main className="w-full">
        <div className="rounded-lg bg-card md:px-5 px-0 pt-5">
          <div className="flex items-center justify-normal gap-72 mb-5">
            <Image
              src="/assets/icons/arrow-back.svg"
              alt="arrow-back"
              width={20}
              height={20}
              className="font-bold cursor-pointer"
              onClick={() => route.back()}
            />
            <h1 className=" font-bold text-center ">Manage Super Admin role</h1>
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
                Transfer to existing user
              </TabsTrigger>

              <TabsTrigger
                value="removeExistingUser"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 cursor-pointer"
              >
                Invite new user
              </TabsTrigger>
            </TabsList>

            <TabsContent value="addNewUser" className="space-y-4">
              <div>
                <p>Select user to transfer super admin privileges to</p>
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
                    {users.map((users, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="w-full text-center px-4 py-2 hover:bg-gray-200"
                        // onClick={() => handleSelect(option)}
                      >
                        {users.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="pt-5">
                  <p>After transfer, select what happens to your account</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="" id="" />
                      <label htmlFor="change-role">Change my role</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="" id="" />
                      <label htmlFor="remove-access">
                        Remove my access completely
                      </label>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full p-2 py-3 rounded-[8px] space-x-4 mt-3 border-[#9b9ea4] border-[1px] flex justify-between bg-transparent">
                        <span>{selectedOption || "Select Role"}</span>
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
                      {users.map((role, index) => (
                        <DropdownMenuItem
                          key={index}
                          className="w-full text-center px-4 py-2 hover:bg-gray-200"
                          // onClick={() => handleSelect(option)}
                        >
                          {role.role}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button
                  onClick={() => setIsAddUserModal(true)}
                  className="
                bg-[#023E8A] hover:bg-blue-800 cursor-pointer mt-24 w-full text-center"
                >
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="removeExistingUser" className="space-y-8">
              <div>
                <p className="font-bold">Add New Super Admin Information</p>
                <div className="flex justify-between items-center py-3 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-semibold">Name</p>
                    <input
                      type="text"
                      className="border border-black rounded-md p-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-semibold">Email Address</p>
                    <input
                      type="email"
                      className="border border-black rounded-md p-2 w-full"
                    />
                  </div>
                </div>
                <div className="">
                  <p>After transfer, select what happens to your account</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="" id="" />
                      <label htmlFor="change-role">Change my role</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="" id="" />
                      <label htmlFor="remove-access">
                        Remove my access completely
                      </label>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full p-2 py-3 rounded-[8px] space-x-4 mt-3 border-[#9b9ea4] border-[1px] flex justify-between bg-transparent">
                        <span>{selectedOption || "Select Role"}</span>
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
                      {users.map((role, index) => (
                        <DropdownMenuItem
                          key={index}
                          className="w-full text-center px-4 py-2 hover:bg-gray-200"
                          // onClick={() => handleSelect(option)}
                        >
                          {role.role}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button
                  className="
                bg-[#023E8A] hover:bg-blue-800 cursor-pointer mt-24 w-full text-center"
                >
                  Send invitation
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Manage Users Dialog */}
        <Dialog open={addUSerModal} onOpenChange={setIsAddUserModal}>
          <DialogContent className="fixed md:top-[10vh] top-[20vh] left-1/2 max-w-2xl mt-64 mb-64 overflow-y-auto w-[90vw] max-h-[85vh]">
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4 py-10">
                <div className="flex justify-normal items-center relative">
                  <SearchIcon className="w-5 absolute left-3" />
                  <input
                    type="search"
                    className="w-full border border-black rounded-lg p-2 pl-10"
                    placeholder="Search Users"
                  />
                </div>

                {users.map((user, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div className="flex justify-normal items-center gap-10">
                      <input type="checkbox" name="user" id="user" />
                      <div>
                        <p>{user.name}</p>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <p className="text-blue-500">{user.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ManageSuperAdmin;
