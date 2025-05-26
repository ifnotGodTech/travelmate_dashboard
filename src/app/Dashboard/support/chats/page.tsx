import { MessageTabContent } from "@/components/molecues/support/Chats/MessageChat";
import { Filter } from "@/components/molecues/support/Reuseables";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="space-y-6">
      <Filter filterOption={"chat"} />
      <div className="p-4 rounded-[20px] bg-white shadow-md">
        <MessageTabContent />
      </div>
    </div>
  );
};

export default page;
