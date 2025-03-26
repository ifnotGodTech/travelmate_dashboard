"use client";
import DashboardLayout from "../dashboard-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <DashboardLayout>
      <div className="">{children}</div>
    </DashboardLayout>
  );
}
