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

type Props = {};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const ManageUsers = (props: Props) => {
  const [defaultTab, setDefaultTab] = useState("addNewUser");
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const options = [
    "Admin",
    "Super Admin",
    "User",
    "Manager",
    "Editor",
    "Viewer",
    "Guest",
  ];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
              onClick={()=> route.back()}
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
                        // onClick={() => handleSelect(option)}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  className="
                bg-[#023E8A] hover:bg-blue-800 cursor-pointer mt-24 w-full text-center"
                >
                  Add
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="removeExistingUser" className="space-y-8">
              <div>
                <p className="font-bold">Select Users to remove</p>
                <div className="flex justify-between items-center py-3 w-full">
                  <div>
                    <p>James Smith</p>
                    <p>jamsakjsad@gmail.com</p>
                  </div>
                  <input type="checkbox" name="remove" id="remove" />
                </div>
                <div className="flex justify-between items-center py-3 w-full">
                  <div>
                    <p>James Smith</p>
                    <p>jamsakjsad@gmail.com</p>
                  </div>
                  <input type="checkbox" name="remove" id="remove" />
                </div>
                <Button className="
                bg-[#D72638] hover:bg-red-800 cursor-pointer mt-24 w-full text-center">Remove</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
