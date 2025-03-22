import Stats from "@/components/molecues/support/Stats";
import Tab from "@/components/molecues/support/Tab";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="px-[16px] lg:px-[37px] bg-[white] lg:bg-transparent min-h-screeen space-y-10 ">
      <Stats />
      <Tab />
    </div>
  );
};

export default page;
