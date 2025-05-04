import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { FC } from "react";
import { useRouter } from "next/navigation";
interface Role {
  id: string;
  name: string;
  description: string;
  assignedUsers: number;
}
interface RoleAssignmentProps {
  roles: Role[]; // Array of roles to display
  onCreateRoleOpen: () => void; // Callback to open Create Role modal
  onManageUsersOpen: (roleId: string) => void;
  onAddMemberOpen: () => void;
}
const RoleAssignment: FC<RoleAssignmentProps> = ({
  onAddMemberOpen,
  roles,
  onManageUsersOpen,
}) => {
  const route = useRouter();
  return (
    <>
      <div className="flex justify-between items-center md:gap-32 gap-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search roles..." className="pl-9 rounded-4xl" />
        </div>
        <Button
          className="bg-[#023E8A] hover:bg-blue-800 cursor-pointer"
          onClick={onAddMemberOpen}
        >
          <Plus className="md:mr-2 mr-0 h-4 w-4" />
          <span className="hidden md:block">Invite New Member</span>
        </Button>
      </div>
      {roles.map((role) => (
        <div key={role.name} className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">{role.name}</h3>
            <p className="text-muted-foreground text-sm pt-2">
              {role.description}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Assigned Users ({role.assignedUsers})</p>
            {Array(role.assignedUsers)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span>Jane Smith</span>
                  <Button
                    variant="link"
                    className="text-red-600 hover:text-red-800 p-0"
                  >
                    {role.name !== "Super Admin" && "Remove"}
                  </Button>
                </div>
              ))}
          </div>
          <Button
            className="w-full h-12 bg-[#CCD8E8] text-[#023E8A] hover:bg-muted/80 cursor-pointer"
            onClick={() =>route.push('/Dashboard/admin/manage-user')}
          >
            Manage Users
          </Button>
        </div>
      ))}
    </>
  );
};
export default RoleAssignment;
