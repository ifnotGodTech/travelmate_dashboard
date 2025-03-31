"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import About from "@/components/molecues/legal/About";
import Privacy from "@/components/molecues/legal/Privacy";
import Terms from "@/components/molecues/legal/Terms";
import Partner from "@/components/molecues/legal/Partner";
import Button from "@/components/reuseables/Button";


const page = () => {
  return (
    <div>
      <ContentTab />
    </div>
  );
};

const ContentTab = () => {
  return (
    <div className="bg-[#fff] rounded-[8px] py-4 px-6 space-y-10">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="font-[600] text-[14px] lg:text-[20px] text-[#181818] leading-[100%] ">
            Manage Information and Policies
          </p>
          <div className=" cursor-pointer py-2 px-4 rounded-[4px] bg-[#023E8A] font-[600] text-[16px] leading-[100%] text-[#FFFFFF] ">
            Edit
          </div>
        </div>
        <Tabs defaultValue="about" className="w-full space-y-8">
          <TabsList className="w-full bg-transparent border-[#CDCED1] border-b-[1px] pb-[6px] rounded-none">
            <TabsTrigger
              value="about"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              Privacy <span className="hidden lg:block ">Policy</span>
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              Terms
            </TabsTrigger>
            <TabsTrigger
              value="partner"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              <span className="hidden lg:block ">Our Trusted</span> Partners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <About />
          </TabsContent>
          <TabsContent value="privacy">
            <Privacy />
          </TabsContent>
          <TabsContent value="terms">
            <Terms />
          </TabsContent>
          <TabsContent value="partner">
            <Partner />
          </TabsContent>
        </Tabs>
      </div>

      <Button full variant="success" title="GO TO BACK TO SERVICES" />
    </div>
  );
};

export default page;
