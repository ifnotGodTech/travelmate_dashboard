import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/Dashboard/admin/loading";
import axios from "axios";
import { showErrorToast } from "@/utils/toasters";
import env from "@/config/env";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuthContext } from "@/context/AuthContext";

interface Role {
  id: string;
  name: string;
  description: string;
  assigned_users: any[];
  current_permission_group_slugs: string[];
  // person: string;
  is_superuser: boolean;
  created_by: string;
  invited_users: any[];
}
interface RoleAssignmentProps {
  roles: Role[]; // Array of roles to display
  onCreateRoleOpen: () => void; // Callback to open Create Role modal
  onAddMemberOpen: () => void;
  isLoading?: boolean;
  revokeInvite: (id: string, email: string) => void;
}
const RoleAssignment: FC<RoleAssignmentProps> = ({
  onAddMemberOpen,
  roles,
  isLoading,
  revokeInvite,
}) => {
  const { accessToken } = useAuthContext();
  const [showSuccessRemoveModal, setShowSuccessRemoveModal] = useState(false);
  const route = useRouter();

  const ManageUsers = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;
    const isSuperAdmin = role.name === "Super Admin" || role.is_superuser;
    route.push(
      isSuperAdmin
        ? `/Dashboard/admin/manage-super-admin/${roleId}/`
        : `/Dashboard/admin/manage-user/${roleId}/`
    );
  };

  const handleRemoveUser = async (roleId: string) => {
    const emailsToRemove = roles
      .filter((role) => String(role.id) === String(roleId))
      .flatMap((role) => role.assigned_users.map((user) => user.email.trim()));
    try {
      await axios.post(
        `${env.api.superadmin}roles/${roleId}/remove/`,
        { email: emailsToRemove.join(",") },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setShowSuccessRemoveModal(true);
    } catch (error: any) {
      console.log(error);
      showErrorToast({
        message: error?.response?.data?.message || "Failed to remove users.",
      });
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

const filteredRoles = useMemo(() => {
  return roles.filter((role) => {
    const query = searchQuery.toLowerCase();
    const isRoleNameMatch = role.name.toLowerCase().includes(query);
    const isAssignedUserMatch = role?.assigned_users?.some((user) =>
      (user.name || "").toLowerCase().includes(query)
    );
    return isRoleNameMatch || isAssignedUserMatch;
  });
}, [roles, searchQuery]);

  return (
    <>
      <div className="p-4 lg:p-0">
        <div className="flex justify-between items-center md:gap-32 gap-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              className="pl-9 rounded-4xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            className="bg-[#023E8A] hover:bg-blue-800 cursor-pointer"
            onClick={onAddMemberOpen}
          >
            <Plus className="md:mr-2 mr-0 h-4 w-4" />
            <span className="hidden md:block">Invite New Member</span>
          </Button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          filteredRoles.map((role, index) => (
            <div key={index} className="space-y-3 pt-5">
              <div>
                <h3 className="text-lg font-medium">{role.name || ""}</h3>
                <p className="text-muted-foreground text-sm pt-2 py-3">
                  {role.description || ""}
                </p>
                <p className="pt-2 text-[16px]">
                  Assigned users ({role.assigned_users?.length})
                </p>
              </div>
              {role.assigned_users?.map((assigned, i) => (
                <div
                  className=" flex justify-between w-full items-center"
                  key={i}
                >
                  <p className="font-medium">
                    {assigned?.name || assigned?.email}
                  </p>

                  {role.name !== "Super Admin" && (
                    <Button
                      variant="link"
                      className={`text-red-600
                       hover:text-red-800 p-0`}
                      onClick={() => handleRemoveUser(role.id)} //
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {role.invited_users?.map((invited, i) => (
                <div
                  className=" flex justify-between w-full items-center"
                  key={i}
                >
                  <p className="font-medium">{invited.name || ""}</p>
                  <Button
                    variant="link"
                    className={`text-blue-600
                      hover:text-blue-800 p-0`}
                  >
                    Invited
                  </Button>
                  <Button
                    onClick={() => revokeInvite(role.id, invited.email)}
                    variant="link"
                    className={` text-green-600
                      hover:text-green-800 p-0`}
                  >
                   Revoke Invite
                  </Button>
                </div>
              ))}
              <Button
                className="w-full h-12 bg-[#CCD8E8] text-[#023E8A] hover:bg-muted/80 cursor-pointer"
                onClick={() => ManageUsers(role.id)}
              >
                Manage Users
              </Button>
            </div>
          ))
        )}
        <Dialog
          open={showSuccessRemoveModal}
          onOpenChange={setShowSuccessRemoveModal}
        >
          <DialogContent className="w-full lg:max-w-sm max-w-sm p-8">
            <div className="flex flex-col items-center">
              <DialogHeader className="text-center">
                <DialogTitle className="text-xl font-[500] text-[#181818]"></DialogTitle>
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
      </div>
    </>
  );
};
export default RoleAssignment;
