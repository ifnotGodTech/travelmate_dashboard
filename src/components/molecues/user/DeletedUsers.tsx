"use client";
import { useState } from "react";
import {
  UserDetailsDialog,
  UserDeactivationDialog,
  UserDropdown,
  LoadingUser,
} from "@/components/molecues/user/DeleteUserComponent";

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

export const DeletedUsersTable = () => {
  const router = useRouter();
  const { users = [], loadMore, loading, error, nextPageUrl } = useGetUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState(null);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

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

  const handleCheckboxChange = (userId: string) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(userId)
        ? prevCheckedRows.filter((id) => id !== userId)
        : [...prevCheckedRows, userId]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setCheckedRows([]); // Deselect all rows
    } else {
      // setCheckedRows(users.map((user) => user.id));
    }
    setIsAllSelected(!isAllSelected);
  };

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
    <div className="bg-white rounded-[20px]  border border-gray-300 w-full overflow-hidden">
      <div className="max-w-[95vw] lg:max-w-full overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <Table className="w-full min-w-[800px]">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left w-1/12">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-400"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left w-1/12">
                  User ID
                </TableHead>
                <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left w-2/12">
                  Name
                </TableHead>
                <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left w-2/12">
                  Email Address
                </TableHead>
                <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left w-1/12">
                  Registration Date
                </TableHead>
                <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left w-1/12">
                  Deletion Date
                </TableHead>
                <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left w-2/12">
                  Deletion Reason
                </TableHead>
                <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-center w-1/12">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50 transition duration-200 cursor-pointer"
                >
                  <TableCell className="py-6 pr-6 text-center w-1/12">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-400"
                      // checked={checkedRows.includes(user.id)}
                      // onChange={() => handleCheckboxChange(user.id)}
                    />
                  </TableCell>
                  <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818] w-1/12 min-h-[60px]">
                    {user.id}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818] w-2/12 min-h-[60px]">
                    {`${user.first_name || "---"} ${user.last_name || "---"}`}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818] w-2/12 min-h-[60px]">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818] w-1/12 min-h-[60px]">
                    {format(new Date(user.date_created), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818] w-1/12 min-h-[60px]">
                    {user.date_created
                      ? format(new Date(user.date_created), "MM/dd/yyyy")
                      : "---"}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-[14px] font-[400] text-[#181818] w-1/12 min-h-[60px]">
                    {user?.date_created || "---"}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-center w-1/12 min-h-[60px]">
                    <UserDropdown
                      parentWidth={180}
                      onViewDetails={() => handleViewDetails(user)}
                      onDeactivate={() => handleDeactivateUser(user)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {loading && <LoadingUser />}
      {error && <p className="text-center text-red-500">{String(error)}</p>}

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
