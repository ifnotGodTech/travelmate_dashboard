"use client";
import React from "react";

const AuthWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="lg:bg-[#f5f5f5] min-h-screen py-[40px] flex justify-center items-center">
      <div className="space-y-[38px] lg:w-[800px] w-full ">
        <div className="space-y-4 text-center">
          <div className="p-[10px]">
            <p className="text-[#181818]  lg:text-[28px] font-[600] text-[20px] lg:font-[600] leading-[100%]">
              Authentication
            </p>
          </div>
          <p className=" text-[20px] lg:text-[28px] font lg:font-[600] font-[500]  leading-[100%] text-[#023E8A]">
            Log in process
          </p>
        </div>
        <div className="space-x-[32px]">
          <div className=""></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
