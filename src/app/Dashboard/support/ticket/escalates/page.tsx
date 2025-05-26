"use client";
import { Filter } from "@/components/molecues/support/AllEscalatedTicketCmonents";
import { EscaleteTable } from "@/components/molecues/support/EscalatedTable";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="space-y-6">
      <div className="">
        <img src="/assets/icons/arrow-back.svg" alt="" className="" />
      </div>
      <Filter />
      <EscaleteTable />
    </div>
  );
};

export default page;
