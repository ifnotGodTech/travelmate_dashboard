"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import RoleManagement from "../../../components/molecues/admin/RoleManagement";
import RoleAssignment from "../../../components/molecues/admin/RoleAssignment";
import axios from "axios";
import env from "@/config/env";
import { useAuthContext } from "@/context/AuthContext";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import Loading from "./loading";
import { permission } from "process";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { previousDay } from "date-fns";
interface Role {
  id: string;
  name: string;
  description: string;
  assigned_users: any[];
  permissions: string[];
  // person: string;
  is_superuser: boolean;
  created_by: string;
}
type Permissions = {
  group: string;
  permissions: { id: string; name: string }[];
};

const AdminRolesPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeTab, setActiveTab] = useState("role-management");
  const [adminDetails, setAdminDetails] = useState<Role[]>([]);
  const { accessToken } = useAuthContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [availablePermissions, setAvailablePermissions] = useState<
    Permissions[]
  >([]);

  const [roleDetails, setRoleDetails] = useState<{
    name: string;
    description: string;
    permissions: string[];
  }>({
    name: "",
    description: "",
    permissions: [],
  });

  const [newMember, setNewMember] = useState<{
    name: string;
    email: string;
    role: string;
  }>({
    name: "",
    email: "",
    role: "",
  });
  // FETCH PERMISSIONS TO CREATE NEW ROLE
  const fetchPermissions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${env.api.superadmin}permissions/`, {
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      });
      setAvailablePermissions(
        Array.isArray(response.data) ? response.data : []
      );
      console.log("Permissions:", response.data);
    } catch (error: any) {
      console.error(
        "Error fetching permissions:",
        error.response?.data || error.message
      );
      setAvailablePermissions([]); // Ensure array on error
      showErrorToast({ message:  error.response?.data || error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // FETCH ALL ROLES
  const fetchAllRoles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${env.api.superadmin}roles/`, {
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
          "Content-Type": "application/json",
        },
      });
      setAdminDetails(
        Array.isArray(response.data.results) ? response.data.results : []
      );
      console.log(
        "Roles:",
        Array.isArray(response.data.results) ? response.data.results : []
      );
    } catch (error: any) {
      console.error(
        "Error fetching roles:",
        error.response?.data || error.message
      );
      showErrorToast({ message: "Failed to fetch roles" });
    } finally {
      setIsLoading(false);
    }
  };
  //EDIR ADMIN ROLES AND PERMISSIONS
  const UpdateRole = async (roleId: string, updatedRole: Role) => {
    try {
      const response = await axios.patch(
        `${env.api.superadmin}roles/${roleId}/`,
        updatedRole,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAdminDetails((prev) =>
        prev.map((role) => (role.id === roleId ? response.data : role))
      );
      showSuccessToast({
        message: "Role updated successfully",
      });
    } catch (error: any) {
      console.error(
        "Error updating role:",
        error.response?.data || error.message
      );
      showErrorToast({ message: "Failed to update role" });
    }
  };
  //CREATE NEW ROLE OR SAVE
  const saveRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !roleDetails.name ||
      roleDetails.name.trim() === "" ||
      !roleDetails.description ||
      !roleDetails.permissions.length
    ) {
      showErrorToast({
        message: "Fill in complete details and assign permissions to role",
      });
      return;
    }

    if (isEditing && editingRoleId) {
      await UpdateRole(editingRoleId, {
        id: editingRoleId,
        name: roleDetails.name,
        description: roleDetails.description,
        permissions: roleDetails.permissions,
        assigned_users: [],
        // person: "",
        is_superuser: false,
        created_by: "",
      });
    } else {
      try {
        const response = await axios.post(
          `${env.api.superadmin}roles/`,
          {
            name: roleDetails.name,
            description: roleDetails.description,
            permission_ids: roleDetails.permissions.map(Number),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAdminDetails((prev) => [...prev, response.data]);
        showSuccessToast({
          message: response.data.message,
          description: response.data.description,
        });
      } catch (err) {
        console.log("Error Creating new Role", err);
        showErrorToast({ message: "An error occurred" });
      }
    }

    setRoleDetails({ name: "", description: "", permissions: [] });
    setIsCreateRoleOpen(false);
    setIsEditing(false);
    setEditingRoleId(null);
  };

  useEffect(() => {
    fetchPermissions();
    fetchAllRoles();
  }, []);

  // Handle role details input changes
  const handleChangeRoleDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleNewInvite = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };
  // Handle permission checkbox changes
  const handlePermissionChange = (id: string, checked: boolean) => {
    setRoleDetails((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, id]
        : prev.permissions.filter((permId) => permId !== id),
    }));
  };
  //EDIT ADMIN ROLES
  const handleEditRole = (role: Role) => {
    setRoleDetails({
      name: role.name,
      description: role.description,
      permissions: role.permissions.map((permission) => String(permission)),
    });
    setEditingRoleId(role.id);
    setIsEditing(true);
    setIsCreateRoleOpen(true);
  };

  // Add new member
  const addMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email || !newMember.role) {
      alert("All fields are required");
      return;
    }
    // Find the role and increment assignedUsers
    setAdminDetails((prev) =>
      prev.map((role) =>
        role.name === newMember.role
          ? { ...role, assigned_users: role.assigned_users }
          : role
      )
    );
    // setNewMember({ name: "", email: "", role: "" }); // Reset form
    setIsAddMemberOpen(false);
    setShowConfirmModal(true);
  };

  return (
    <div className="flex min-h-screen bg-background rounded-lg">
      {/* Main Content */}
      <main className="w-full">
        <div className="rounded-lg bg-card md:px-5 px-0 pt-5">
          <h2
            className="text-lg font-medium pb-6 cursor-pointer"
            onClick={() => router.push("/accept-invite")}
          >
            Manage access control for your travel agency dashboard
          </h2>
          <Tabs
            defaultValue="role-management"
            className="space-y-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full border-b rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="role-management"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 cursor-pointer"
              >
                Role Management
              </TabsTrigger>

              <TabsTrigger
                value="role-assignments"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 cursor-pointer"
              >
                Role Assignments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="role-management" className="space-y-4">
              <RoleManagement
                roles={adminDetails}
                onCreateRoleOpen={() => setIsCreateRoleOpen(true)}
                isLoading={isLoading}
                onStartEdit={handleEditRole}
              />
            </TabsContent>

            <TabsContent value="role-assignments" className="space-y-8">
              <RoleAssignment
                onCreateRoleOpen={() => setIsCreateRoleOpen(true)}
                roles={adminDetails}
                onManageUsersOpen={(roleId) => setIsManageUsersOpen(true)}
                onAddMemberOpen={() => setIsAddMemberOpen(true)}
              />
            </TabsContent>
          </Tabs>
        </div>
        {/* Create Role Dialog */}
        <Dialog
          open={isCreateRoleOpen}
          onOpenChange={(open) => {
            setIsCreateRoleOpen(open);
            if (!open) {
              setIsEditing(false);
              setRoleDetails({ name: "", description: "", permissions: [] });
            }
          }}
        >
          <DialogContent className="fixed md:top-[10vh] top-[20vh] left-1/2 max-w-2xl mt-64 mb-64 overflow-y-auto w-[90vw] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={
                  saveRole
              }
            >
              <div className="space-y-4">
                <div className="pt-4">
                  <label className="text-sm font-medium">Role Name</label>
                  <Input
                    name="name"
                    value={roleDetails.name}
                    onChange={handleChangeRoleDetails}
                  />
                </div>
                <div className="pt-4">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    name="description"
                    value={roleDetails.description}
                    onChange={handleChangeRoleDetails}
                  />
                </div>
              </div>
              <div className="space-y-6 pt-4">
                {isLoading && <Loading />}
                {availablePermissions.map(({ group, permissions }) => (
                  <div key={group} className="space-y-4">
                    <h4 className="font-medium">{group}</h4>
                    <div className="space-y-2">
                      {permissions.map(({ id, name }) => (
                        <div key={id} className="flex items-center space-x-2">
                          <Checkbox
                            className="cursor-pointer"
                            id={String(id)}
                            checked={roleDetails.permissions.includes(id)}
                            onCheckedChange={(checked: boolean) =>
                              handlePermissionChange(id, checked)
                            }
                          />
                          <label htmlFor={String(id)} className="capitalize">
                            {name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateRoleOpen(false)}
                  className="bg-red-50 border-red-100 hover:bg-red-100 text-red-600 cursor-pointer"
                >
                  CANCEL
                </Button>

                <Button
                  type="submit"
                  className="bg-blue-50 border-blue-100 hover:bg-blue-100 text-blue-600 cursor-pointer"
                >
                  {isEditing ? "UPDATE ROLE" : "SAVE ROLE"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Invite New Membver Dialog  */}
        <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <DialogContent>
            <DialogHeader className="border-b pb-2">
              <DialogTitle className="text-center">
                Invite New Member
              </DialogTitle>
            </DialogHeader>
            <form className="flex flex-col gap-4" onSubmit={addMember}>
              <div className="flex flex-col gap-3">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={newMember.name}
                  name="name"
                  onChange={handleNewInvite}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email Address</label>
                <Input
                  type="text"
                  placeholder="Enter Email Address"
                  value={newMember.email}
                  name="email"
                  onChange={handleNewInvite}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="role">Role</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full p-2 py-3 rounded-[8px] space-x-4 mt-3 border-[#9b9ea4] border-[1px] flex justify-between bg-transparent items-center cursor-pointer">
                      <span className="text-sm">
                        {selectedOption || "Select User"}
                      </span>
                      <img
                        src="/assets/icons/arrow-down.svg"
                        alt=""
                        className="w-3 h-3 ml-auto"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)] cursor-pointer"
                  >
                    {adminDetails.map((user, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="w-full text-center px-4 py-2 hover:bg-gray-200"
                        onClick={() => {
                          setSelectedOption(user.name);
                          setNewMember((prev) => ({
                            ...prev,
                            // name: user.n,
                            role: user.name,
                          }));
                        }}
                      >
                        {user.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddMemberOpen(false)}
                  className=" border-[#023E8A] text-[#023E8A] cursor-pointer"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-[#023E8A] border-blue-100 hover:bg-blue-100 text-white cursor-pointer"
                >
                  Add Member
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* COnfirm Modal for Inviing new Member  */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent className="w-full lg:max-w-md max-w-sm p-8 ">
            <div className="space-y-[40px] flex flex-col items-center  ">
              <DialogHeader className="text-center">
                <DialogTitle className="text-xl font-[500] text-[#181818]">
                  Admin Added Successfully!
                </DialogTitle>
              </DialogHeader>

              <img
                src="/assets/images/Blue-check.svg"
                alt="Success"
                className="w-24 h-24 "
              />

              <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
                You have successfully added a new Admin. An invitation email has
                been sent to “xyz@gmail.com” to set up their account.
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};
export default AdminRolesPage;
