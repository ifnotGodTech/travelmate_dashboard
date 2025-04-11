"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  ChevronDown,
  LayoutDashboard,
  Users,
  BookOpen,
  Database,
  HeadphonesIcon,
  PieChart,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for roles
const roles = [
  {
    name: "Super Admin",
    description: "Full access to all system features and data",
    assignedUsers: 1,
  },
  {
    name: "Support Agent",
    description: "Customer support and booking management",
    assignedUsers: 2,
  },
  {
    name: "Content Manager",
    description: "Manages website content and packages",
    assignedUsers: 2,
  },
]

// Sample users
const users = Array(6)
  .fill(null)
  .map((_, i) => ({
    name: "Jane Smith",
    email: "jane.smith@example.com",
  }))

export default function AdminRolesPage() {
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("role-management")

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card px-4 py-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary">TravelMate</h2>
        </div>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            Bookings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Database className="mr-2 h-4 w-4" />
            CMS
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HeadphonesIcon className="mr-2 h-4 w-4" />
            Customer Support
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <PieChart className="mr-2 h-4 w-4" />
            Report & Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start bg-accent">
            <Settings className="mr-2 h-4 w-4" />
            Admin Roles
          </Button>
        </nav>

        <div className="mt-auto pt-4">
          <Button variant="ghost" className="w-full justify-start text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Admin Roles and Permissions</h1>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="font-medium">Admin</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-medium mb-6">Manage access control for your travel agency dashboard</h2>

          <Tabs defaultValue="role-management" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList className="w-full border-b rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="role-management"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
              >
                Role Management
              </TabsTrigger>
              <TabsTrigger
                value="role-assignments"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
              >
                Role Assignments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="role-management" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search roles..." className="pl-9" />
                </div>
                <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => setIsCreateRoleOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Role
                </Button>
              </div>

              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 font-medium">Role Name</th>
                      <th className="text-left p-3 font-medium">Description</th>
                      <th className="text-left p-3 font-medium">Assigned Users</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.name} className="border-t">
                        <td className="p-3">{role.name}</td>
                        <td className="p-3 text-muted-foreground">{role.description}</td>
                        <td className="p-3">
                          {role.assignedUsers} User{role.assignedUsers !== 1 && "s"}
                        </td>
                        <td className="p-3">
                          <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 mr-4">
                            Edit
                          </Button>
                          <Button
                            variant="link"
                            className="text-green-600 hover:text-green-800 p-0"
                            onClick={() => setIsManageUsersOpen(true)}
                          >
                            Manage User
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="role-assignments" className="space-y-8">
              {roles.map((role) => (
                <div key={role.name} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">{role.name}</h3>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Assigned Users ({role.assignedUsers})</p>
                    {Array(role.assignedUsers)
                      .fill(null)
                      .map((_, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b">
                          <span>Jane Smith</span>
                          <Button variant="link" className="text-red-600 hover:text-red-800 p-0">
                            Remove
                          </Button>
                        </div>
                      ))}
                  </div>

                  <Button className="w-full bg-muted hover:bg-muted/80" onClick={() => setIsManageUsersOpen(true)}>
                    Manage Users
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Create Role Dialog */}
        <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Role Name</label>
                  <Input />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Booking Management</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="view-bookings" />
                      <label htmlFor="view-bookings">View Bookings</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="create-bookings" />
                      <label htmlFor="create-bookings">Create Bookings</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="edit-bookings" />
                      <label htmlFor="edit-bookings">Edit Bookings</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="support-agent" />
                      <label htmlFor="support-agent">Support Agent</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Customer Data</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="view-customer-data" />
                      <label htmlFor="view-customer-data">View Customer Data</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="create-customers" />
                      <label htmlFor="create-customers">Create Customers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="edit-customer-data" />
                      <label htmlFor="edit-customer-data">Edit Customer Data</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="delete-customers" />
                      <label htmlFor="delete-customers">Delete Customers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="export-customer-data" />
                      <label htmlFor="export-customer-data">Export Customer Data</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Payment Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="view-payment-data" />
                      <label htmlFor="view-payment-data">View Payment Data</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="process-payments" />
                      <label htmlFor="process-payments">Process Payments</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="issue-refunds" />
                      <label htmlFor="issue-refunds">Issue Refunds</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="export-payment-reports" />
                      <label htmlFor="export-payment-reports">Export Payment Reports</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Content Management</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="view-content" />
                      <label htmlFor="view-content">View Content</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="create-content" />
                      <label htmlFor="create-content">Create Content</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="edit-content" />
                      <label htmlFor="edit-content">Edit Content</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="delete-content" />
                      <label htmlFor="delete-content">Delete Content</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="publish-content" />
                      <label htmlFor="publish-content">Publish Content</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateRoleOpen(false)}
                  className="bg-red-50 border-red-100 hover:bg-red-100 text-red-600 cursor-pointer"
                >
                  CANCEL
                </Button>
                <Button className="bg-blue-50 border-blue-100 hover:bg-blue-100 text-blue-600 cursor-pointer">SAVE ROLE</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Manage Users Dialog */}
        <Dialog open={isManageUsersOpen} onOpenChange={setIsManageUsersOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage User</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Choose Users</h4>
                {users.map((user, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b">
                    <span>{user.name}</span>
                    <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
                      Add User
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Current Users</h4>
                {users.slice(0, 2).map((user, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b">
                    <span>{user.name}</span>
                    <Button variant="link" className="text-red-600 hover:text-red-800 p-0">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

