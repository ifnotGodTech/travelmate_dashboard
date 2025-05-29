"use client";
import { useState, useEffect } from "react";
import {
  UserDetailsDialog,
  UserDeactivationDialog,
  UserDropdown,
  LoadingUser,
} from "@/components/molecues/user/AllUserComponents";

import { useGetUsers, useExportCSV, useGetUser } from "@/hooks/api/user";
import Button from "@/components/reuseables/Button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
export const UsersTable = ({ searchTerm, selectedOption }: any) => {
  const router = useRouter();
  const {
    users,
    loadNext,
    loadPrevious,
    loading,
    error,
    nextPageUrl,
    previousPageUrl,
    setSearchTerm,
    setIsActive,
  } = useGetUsers();

  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm, setSearchTerm]);

  useEffect(() => {
    setIsActive(selectedOption === "" ? null : selectedOption);
  }, [selectedOption, setIsActive]);

  const [selectedUser, setSelectedUser] = useState(null);
  console.log({ searchTerm, selectedOption });
  const [userId, setUserId] = useState<string | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState(null);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);

  const { data: userDetails, loading: userLoading } = useGetUser({
    UserId: userId as string,
    initalFetch: !!userId,
    successCallback: (message) => {
      console.log("User details fetched successfully:", message);
    },
    errorCallback: (error) => {
      console.error("Error fetching user details:", error);
    },
  });

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setUserId(user.id);
  };

  const handleDeactivateUser = (user: any) => {
    setDeactivatingUser(user);
    setIsDeactivateDialogOpen(true);
  };

  const confirmDeactivation = () => {
    if (deactivatingUser) {
      setDeactivatingUser(null);
      setIsDeactivateDialogOpen(false);
    }
  };

  const cancelDeactivation = () => {
    setDeactivatingUser(null);
    setIsDeactivateDialogOpen(false);
  };

  const handleDialogClose = () => {
    setSelectedUser(null);
    setUserId(null);
  };

  return (
    <div className="">
      <div className="bg-white rounded-[20px]  border border-gray-300 w-full overflow-hidden">
        <div className="max-w-[95vw] lg:max-w-full overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            {loading ? (
              <LoadingUser />
            ) : (
              <>
                {users.length === 0 ? (
                  <div className="h-[80px] flex justify-center items-center">
                    <p className="ttext-[20px] font-[500] text-[#181818]">
                      No data found
                    </p>
                  </div>
                ) : (
                  <>
                    {error ? (
                      <div className="h-[80px] flex justify-center items-center">
                        <p className="ttext-[20px] font-[500] text-[#181818]">
                          We cannot Fetch users at the moment please try again.
                        </p>
                      </div>
                    ) : (
                      <Table className="w-full min-w-[800px]">
                        <TableHeader className="bg-gray-100">
                          <TableRow>
                            <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left">
                              User ID
                            </TableHead>
                            <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left">
                              Name
                            </TableHead>
                            <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left">
                              Email Address
                            </TableHead>
                            <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left">
                              Registration Date
                            </TableHead>
                            <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left">
                              Status
                            </TableHead>
                            <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-center">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow
                              key={user.id}
                              className="bg-white hover:bg-gray-50 transition duration-200 cursor-pointer"
                            >
                              <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818]">
                                {user.id}
                              </TableCell>
                              <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818]">
                                {`${user.first_name || "---"} ${
                                  user.last_name || "---"
                                }`}
                              </TableCell>
                              <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818]">
                                {user.email}
                              </TableCell>
                              <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818]">
                                {format(
                                  new Date(user.date_created),
                                  "MM/dd/yyyy"
                                )}
                              </TableCell>
                              <TableCell className="py-6 px-6 text-sm">
                                <span
                                  className={`p-[10px] border-[1px] rounded-[12px] text-[14px] font-[400] ${
                                    user.is_active
                                      ? "bg-[#2D9C5E1A] text-green-700 border-[#2D9C5E]"
                                      : "bg-[#D726380D] text-red-700 border-[#D72638]"
                                  }`}
                                >
                                  {user.is_active ? "Active" : "Deactivated"}
                                </span>
                              </TableCell>
                              <TableCell className="py-6 px-6 text-center">
                                <UserDropdown
                                  parentWidth={180}
                                  onViewDetails={() => handleViewDetails(user)}
                                  onDeactivate={() =>
                                    handleDeactivateUser(user)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* {loading && } */}
      <div className="flex w-full justify-end space-x-5 mt-[20px]">
        <div
          className={`text-[#023E8A] text-[14px] font-[400] py-2 px-3 border-[1px] border-[#023E8A] rounded-[8px] cursor-pointer ${
            previousPageUrl
              ? "border-[#023E8A]"
              : "border-[#a3a3a3] cursor-not-allowed"
          }`}
          onClick={previousPageUrl ? loadPrevious : undefined}
        >
          Previous
        </div>
        <div
          className={`text-[#023E8A] text-[14px] font-[400] py-2 px-3 border-[1px]  rounded-[8px] cursor-pointer ${
            nextPageUrl
              ? "border-[#023E8A]"
              : "border-[#a3a3a3] cursor-not-allowed"
          }`}
          onClick={nextPageUrl ? loadNext : undefined}
        >
          Next
        </div>
      </div>

      {/* {error && (
        <div className="h-[80px] flex justify-center items-center">
          <p className="ttext-[20px] font-[500] text-[#181818]">
            We cannot Fetch users at the moment please try again.
          </p>
        </div>
      )} */}

      <UserDetailsDialog
        selectedUser={selectedUser}
        userDetails={userDetails}
        userLoading={userLoading}
        onClose={handleDialogClose}
      />
      <UserDeactivationDialog
        deactivatingUser={deactivatingUser}
        isOpen={isDeactivateDialogOpen}
        onConfirm={confirmDeactivation}
        onCancel={cancelDeactivation}
      />
    </div>
  );
};
