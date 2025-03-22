"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "../dashboard-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="">{children}</div>
    </DashboardLayout>
  );
}
