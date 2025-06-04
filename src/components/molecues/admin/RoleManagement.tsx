import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { FC, JSX } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/Dashboard/admin/loading";
import { on } from "events";

interface Role {
  id: string;
  name: string;
  description: string;
  assigned_users: any[]; // Array of assigned users, can be empty
  current_permission_group_slugs: string[]; // Optional property for the person's name
  is_superuser: boolean;
  created_by: string;

}
interface RoleManagementProps {
  roles: Role[]; // Array of roles to display
  // searchValue: string; // Controlled search input value
  // onSearchChange: (value: string) => void; // Callback for search input changes
  onCreateRoleOpen: () => void; // Callback to open Create Role modal
  isLoading: boolean; 
 onStartEdit: (role: Role) => void;
}

const RoleManagement: FC<RoleManagementProps> = ({
  roles,
  onCreateRoleOpen,
  isLoading,
  onStartEdit
}): JSX.Element => {
  const router = useRouter();

  const ManageUsers = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;
    const isSuperAdmin = role.name === "Super Admin" || role.is_superuser;
    router.push(
      isSuperAdmin
        ? `/Dashboard/admin/manage-super-admin/${roleId}/`
        : `/Dashboard/admin/manage-user/${roleId}/`
    );
  };

  // console.log
  return (
    <div className="p-3 lg:p-0 ">
      <div className="flex justify-between items-center md:gap-32 gap-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search roles..." className="pl-9 rounded-4xl" />
        </div>
        <div className="flex items-center gap-2 justify-normal">
          <Button
            className="bg-[#023E8A] hover:bg-blue-800 cursor-pointer"
            onClick={onCreateRoleOpen}
          >
            <Plus className="md:mr-2 mr-0 h-4 w-4" />
            <span className="hidden md:block">Create New Role</span>
          </Button>
        </div>
      </div>
      <div className="border rounded-lg mt-3">
        <table className="w-full  md:overflow-hidden">
          <thead className="w-full">
            <tr className="bg-muted">
              <th className="text-left p-3 font-medium md:text-sm text-xs">
                Role Name
              </th>
              <th className="text-left p-3 font-medium md:text-sm text-xs">
                Description
              </th>
              <th className="text-left p-3 font-medium md:text-sm text-xs text-nowrap">
                Assigned Users
              </th>
              <th className="text-left p-3 font-medium md:text-sm text-xs pl-8">
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
                  {isLoading ? <Loading /> : "No roles found"}
                </td>
              </tr>
            ) : (
              roles?.map((role) => (
                <tr className="border-t" key={role.id}>
                  <td className="pl-3 p-2 md:text-base text-xs capitalize">
                    {role.is_superuser ? "Super Admin" : role.name}
                  </td>
                  <td className="pl-3 p-2 capitalize text-muted-foreground md:text-base text-xs">
                    {role.is_superuser
                      ? "Manage overall dashboard and settings"
                      : role.description}
                  </td>
                  <td className="pl-3 p-2 md:text-base text-xs">
                    {role.assigned_users.length} User
                    {role.assigned_users.length > 1 && "s"}
                  </td>

                  <td className="pl-3 p-2 flex md:flex-row md:gap-2 gap-0 flex-col md:justify-normal justify-items-start items-start md:items-center">
                    <Button
                      variant="link"
                      className="text-[#023E8A] cursor-pointer hover:text-blue-800 p-0 md:mr-4 text-xs md:text-base"
                      onClick={()=>{
                        onCreateRoleOpen() 
                        onStartEdit(role)}}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-green-600 hover:text-green-800 p-0 cursor-pointer text-xs md:text-base"
                      onClick={() => ManageUsers(role.id)}
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
    </div>
  );
};
export default RoleManagement;
