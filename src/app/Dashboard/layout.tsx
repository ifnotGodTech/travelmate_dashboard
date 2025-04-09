"use client";
import DashboardLayout from "../dashboard-layout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { accessToken } = useAuthContext();

  useEffect(() => {
    if (!accessToken) router.push("/auth/login");
  }, [accessToken]);

  return (
    <DashboardLayout>
      <div className="">{children}</div>
    </DashboardLayout>
  );
}
