"use client";
import { useState, useEffect } from "react";
import {
  UserDeactivationDialog,
  UserDropdown,
  UserDetailsDialog,
  LoadingUser,
} from "@/components/molecues/user/DeleteUserComponent";

import { useGetDeletedUsers, useGetUser } from "@/hooks/api/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export const DeletedUsersTable = ({ searchTerm, selectedOption }: any) => {
  const {
    users,
    loadNext,
    loadPrevious,
    loading,
    error,
    setSearchTerm,
    setIsActive,
    nextPageUrl,
    previousPageUrl,
  } = useGetDeletedUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState(null);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

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

  useEffect(() => {
    setSearchTerm(searchTerm || "");
    setIsActive(selectedOption || null);
  }, [searchTerm, selectedOption, setSearchTerm, setIsActive]);

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

  const confirmBulkDeletion = () => {
    console.log("Deleting users with IDs:", selectedUserIds);
    setSelectedUserIds([]);
    setIsDeactivateDialogOpen(false);
  };

  const handleDialogClose = () => {
    setSelectedUser(null);
    setUserId(null);
  };

  const cancelDeactivation = () => {
    setDeactivatingUser(null);
    setIsDeactivateDialogOpen(false);
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="">
      {selectedUserIds.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
            onClick={() => setIsDeactivateDialogOpen(true)}
          >
            Delete Selected Users
          </button>
        </div>
      )}
      <div className="bg-white rounded-[20px] border border-gray-300 w-full overflow-hidden">
        <div className="max-w-[95vw] lg:max-w-full overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <Table className="w-full min-w-[800px]">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="py-4 px-6 text-sm font-semibold text-gray-700 text-left w-1/12">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-400"
                      onChange={(e) =>
                        setSelectedUserIds(
                          e.target.checked ? users.map((user) => user.id) : []
                        )
                      }
                      checked={selectedUserIds.length === users.length}
                    />
                  </TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Deletion Date</TableHead>
                  <TableHead>Deletion Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-gray-50 transition duration-200 cursor-pointer"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-400"
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user?.date_created || "---"}
                    </TableCell>
                    <TableCell>
                      {user.deleted_at
                        ? format(new Date(user.deleted_at), "MM/dd/yyyy")
                        : "---"}
                    </TableCell>
                    <TableCell>{user?.reason || "---"}</TableCell>
                    <TableCell>
                      <UserDropdown
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
        {error && (
          <div className="h-[80px] flex justify-center items-center">
            <p>We cannot Fetch users at the moment, please try again.</p>
          </div>
        )}
        {isDeactivateDialogOpen && (
          <UserDeactivationDialog
            isOpen={isDeactivateDialogOpen}
            deactivatingUser={deactivatingUser || selectedUserIds}
            onConfirm={
              deactivatingUser ? confirmDeactivation : confirmBulkDeletion
            }
            onCancel={cancelDeactivation}
          />
        )}
        {selectedUser && (
          <UserDetailsDialog
            selectedUser={selectedUser}
            userDetails={userDetails}
            userLoading={userLoading}
            onClose={handleDialogClose}
          />
        )}
      </div>
      <div className="flex justify-end mt-4 space-x-4">
        <button
          className={`py-2 px-4 border rounded-lg ${
            previousPageUrl ? "border-blue-500" : "border-gray-300 cursor-not-allowed"
          }`}
          onClick={previousPageUrl ? loadPrevious : undefined}
        >
          Previous
        </button>
        <button
          className={`py-2 px-4 border rounded-lg ${
            nextPageUrl ? "border-blue-500" : "border-gray-300 cursor-not-allowed"
          }`}
          onClick={nextPageUrl ? loadNext : undefined}
        >
          Next
        </button>
      </div>
    </div>
  );
};
