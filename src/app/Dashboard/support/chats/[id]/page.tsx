import React from "react";
import { MainChatComponents } from "@/components/molecues/support/Chats/MainChatComponents";
import { getCookies } from "@/context/Auth-Cookies";
// import { useParams } from "next/navigation";

const page = async ({ params }: { params: { sessionId: string } }) => {
  const { accessToken } = await getCookies();
  // const { id } = useParams<{ id: string }>();
  return (
    <div className="">
      <MainChatComponents sessionId={params.sessionId} accessToken={accessToken} />
    </div>
  );
};

export default page;
