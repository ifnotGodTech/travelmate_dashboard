import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { FC, JSX } from "react";

interface Role {
  id: string;
  name: string;
  description: string;
  assignedUsers: number;
}
interface RoleManagementProps {
  roles: Role[]; // Array of roles to display
  // searchValue: string; // Controlled search input value
  // onSearchChange: (value: string) => void; // Callback for search input changes
  onAddMemberOpen: () => void; // Callback to open Add Member modal
  onCreateRoleOpen: () => void; // Callback to open Create Role modal
  onManageUsersOpen: (roleId: string) => void; // Callback to open Manage Users modal
  // onEditRole: (roleId: string) => void; // Callback to edit a role
}
const RoleManagement: FC<RoleManagementProps> = ({
  roles,
  onAddMemberOpen,
  onCreateRoleOpen,
  onManageUsersOpen,
}): JSX.Element => {
  return (
    <>
      <div className="flex justify-between items-center md:gap-32 gap-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search roles..." className="pl-9 rounded-4xl" />
        </div>
        <div className="flex items-center gap-2 justify-normal">
          <Button
            className="bg-[#023E8A] hover:bg-blue-800 cursor-pointer"
            onClick={onAddMemberOpen}
          >
            <Plus className="md:mr-2 mr-0 h-4 w-4" />
            <span className="hidden md:block">Add New member</span>
          </Button>
          <Button
            className="bg-[#023E8A] hover:bg-blue-800 cursor-pointer"
            onClick={onCreateRoleOpen}
          >
            <Plus className="md:mr-2 mr-0 h-4 w-4" />
            <span className="hidden md:block">Create New Role</span>
          </Button>
        </div>
      </div>
      <div className="border rounded-lg">
        <table className="md:w-full  md:overflow-hidden">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-3 font-medium md:text-base text-xs">
                Role Name
              </th>
              <th className="text-left p-3 font-medium md:text-base text-xs">
                Description
              </th>
              <th className="text-left p-3 font-medium md:text-base text-xs">
                Assigned Users
              </th>
              <th className="text-left p-3 font-medium md:text-base text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-base">
            {roles.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-muted-foreground"
                >
                  No roles found
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr className="border-t" key={role.id}>
                  <td className="pl-3 p-2 md:text-base text-xs">
                    {role.name || "No name available"}
                  </td>
                  <td className="pl-3 p-2 text-muted-foreground md:text-base text-xs">
                    {role.description || "No description available"}
                  </td>
                  <td className="pl-3 p-2 md:text-base text-xs">
                    {role.assignedUsers} User
                    {role.assignedUsers !== 1 && "s"}
                  </td>

                  <td className="pl-3 p-2 flex md:flex-row md:gap-2 gap-0 flex-col md:justify-normal justify-items-start items-start md:items-center">
                    <Button
                      variant="link"
                      className="text-[#023E8A] cursor-pointer hover:text-blue-800 p-0 md:mr-4 text-xs md:text-base"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-green-600 hover:text-green-800 p-0 cursor-pointer text-xs md:text-base"
                      onClick={() => onManageUsersOpen(role.id)}
                    >
                      Manage User
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default RoleManagement;
