"use client";

import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";

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
import { permission } from "process";

// Sample users
const users = Array(6)
  .fill(null)
  .map((_, i) => ({
    name: "Jane Smith",
    email: "jane.smith@example.com",
  }));
interface Role {
  id: string;
  name: string;
  description: string;
  assignedUsers: number;
  permissions: string[];
}
const availablePermissions = {
  "Booking Management": [
    "view-bookings",
    "create-bookings",
    "edit-bookings",
    "support-agent",
  ],
  "Customer Data": [
    "view-customer-data",
    "create-customers",
    "edit-customer-data",
    "delete-customers",
    "export-customer-data",
  ],
  "Payment Information": [
    "view-payment-data",
    "process-payments",
    "issue-refunds",
    "export-payment-reports",
  ],
  "Content Management": [
    "view-content",
    "create-content",
    "edit-content",
    "delete-content",
    "publish-content",
  ],
};
const AdminRolesPage: React.FC = () => {
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState("role-management");
  const [roles, setRoles] = useState<Role[]>([]);

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

  // Handle role details input changes
  const handleChangeRoleDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleDetails((prev) => ({ ...prev, [name]: value }));
  };
  // Handle permission checkbox changes
  const handlePermissionChange = (permission: string, checked: boolean) => {
    setRoleDetails((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permission]
        : prev.permissions.filter((p) => p !== permission),
    }));
  };
  useEffect(() => {
    if (showSuccessModal) {
      const timeout = setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  });
  // Save new role
  const saveRole = () => {
    if (!roleDetails.name) {
      alert("Role name is required");
      return;
    }
    const newRole: Role = {
      id: crypto.randomUUID(),
      name: roleDetails.name,
      description: roleDetails.description,
      assignedUsers: 1,
      permissions: roleDetails.permissions,
    };
    setRoles((prev) => [...prev, newRole]);
    setRoleDetails({ name: "", description: "", permissions: [] }); // Reset form
    setIsCreateRoleOpen(false);
  };
  // Add new member
  const addMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) {
      alert("All fields are required");
      return;
    }
    // Find the role and increment assignedUsers
    setRoles((prev) =>
      prev.map((role) =>
        role.name === newMember.role
          ? { ...role, assignedUsers: role.assignedUsers + 1 }
          : role
      )
    );
    setNewMember({ name: "", email: "", role: "" }); // Reset form
    setIsAddMemberOpen(false);
    setShowSuccessModal(true);
  };
  return (
    <div className="flex min-h-screen bg-background rounded-lg">
      {/* Main Content */}
      <main className="w-full">
        <div className="rounded-lg bg-card md:px-5 px-0 pt-5">
          <h2 className="text-lg font-medium pb-6">
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
                onManageUsersOpen={(roleId) => setIsManageUsersOpen(true)}
                roles={roles}
                onAddMemberOpen={() => setIsAddMemberOpen(true)}
                onCreateRoleOpen={() => setIsCreateRoleOpen(true)}
              />
            </TabsContent>

            <TabsContent value="role-assignments" className="space-y-8">
              <RoleAssignment
                onCreateRoleOpen={() => setIsCreateRoleOpen(true)}
                roles={roles}
                onManageUsersOpen={(roleId) => setIsManageUsersOpen(true)}
              />
            </TabsContent>
          </Tabs>
        </div>
        {/* Create Role Dialog */}
        <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
          <DialogContent className="fixed md:top-[10vh] top-[20vh] left-1/2 max-w-2xl mt-64 mb-64 overflow-y-auto w-[90vw] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Role Name</label>
                  <Input
                    name="name"
                    value={roleDetails.name}
                    onChange={handleChangeRoleDetails}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    name="description"
                    value={roleDetails.description}
                    onChange={handleChangeRoleDetails}
                  />
                </div>
              </div>
              <div className="space-y-6">
                {Object.entries(availablePermissions).map(
                  ([category, perms]) => (
                    <div key={category} className="space-y-4">
                      <h4 className="font-medium">{category}</h4>
                      <div className="space-y-2">
                        {perms.map((permission) => (
                          <div
                            key={permission}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={permission}
                              checked={roleDetails.permissions.includes(
                                permission
                              )}
                              onCheckedChange={(checked: boolean) =>
                                handlePermissionChange(permission, checked)
                              }
                            />
                            <label htmlFor={permission} className="capitalize">
                              {permission.replace(/-/g, " ")}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
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
                  onClick={saveRole}
                  className="bg-blue-50 border-blue-100 hover:bg-blue-100 text-blue-600 cursor-pointer"
                >
                  SAVE ROLE
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Add New Membver Dialog  */}
        <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <DialogContent>
            <DialogHeader className="border-b pb-2">
              <DialogTitle className="text-center">Add New Member</DialogTitle>
            </DialogHeader>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={roleDetails.name}
                  onChange={handleChangeRoleDetails}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email Address</label>
                <Input
                  type="text"
                  placeholder="Enter Email Address"
                  // value={roleDetails.email}
                  onChange={handleChangeRoleDetails}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="role">Role</label>
                <Input
                  type="text"
                  placeholder="Enter Role"
                  // value={roleDetails.role}
                  onChange={handleChangeRoleDetails}
                />
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
                  onClick={addMember}
                  type="submit"
                  className="bg-[#023E8A] border-blue-100 hover:bg-blue-100 text-white cursor-pointer"
                >
                  Add Member
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {/* Manage Users Dialog */}
        <Dialog open={isManageUsersOpen} onOpenChange={setIsManageUsersOpen}>
          <DialogContent className="fixed md:top-[10vh] top-[20vh] left-1/2 max-w-2xl mt-64 mb-64 overflow-y-auto w-[90vw] max-h-[85vh]">
            <DialogHeader>
              <DialogTitle>Manage User</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Choose Users</h4>

                {users.map((user, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <span>{user.name}</span>

                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-800 p-0"
                    >
                      Add User
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Current Users</h4>

                {users.slice(0, 2).map((user, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <span>{user.name}</span>

                    <Button
                      variant="link"
                      className="text-red-600 hover:text-red-800 p-0"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
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
