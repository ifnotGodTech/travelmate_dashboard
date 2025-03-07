import React from "react";
import Button from "@/components/reuseables/Button";
import ContentWrapper from "@/components/reuseables/ContentWrapper";

type Props = {};

const SingleFlight = (props: Props) => {
  return (
    <ContentWrapper>
      <div className="bg-[#fff]">
        <AirlineDetails />

        <div className="flex flex-col-reverse lg:flex-row px-[40px] gap-[24px] py-[20px]">
          <Button
            title="Delete details"
            variant="light-red"
            weight="500"
            icon="/assets/icons/delete.svg"
            iconPosition="left"
          />
          <Button
            title="UPDATE AGENCY FEE"
            variant="light-blue"
            weight="500"
            icon="/assets/icons/mode_edit.svg"
            iconPosition="left"
          />
        </div>
      </div>
    </ContentWrapper>
  );
};

const AirlineDetails = () => {
  return (
    <div className="py-[20px] px-[40px] space-y-[24px]">
      <div className="">
        <h3 className=" font-[500] text-[16px] text-[#181818]">
          Thursday 13th of Feb., 2025 | 08:43AM
        </h3>
      </div>
      <div className="space-y-[40px]">
        <div className="">
          <h3 className="font-inter font-medium text-[20px] leading-[100%] tracking-[0%] ">
            New Airline Details
          </h3>
        </div>
        <div className="space-y-6">
          <h3 className="font-inter font-medium text-[20px] leading-[100%] tracking-[0%] ">
            Airline Logo
          </h3>
          <img src="/assets/images/flight-logo.svg" alt="" className="" />
        </div>
        <div className="space-y-6">
          <h3 className="font-inter font-medium text-[20px] leading-[100%] tracking-[0%] ">
            Airline Information
          </h3>
          <div className="space-y-6 w-full">
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Name
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  Flamingo Air
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Code
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  FA
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Call Sign
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  White Bird
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Country
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  Nigeria
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Headquarters
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  Lagos
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Status
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  Active
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Fleet Size
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  100
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Routes Covered
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  73
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Phone Number
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  +234800000000
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Email Address
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  fly@flamingoair.ng
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Website
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  flamingoairng.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="font-inter font-medium text-[20px] leading-[100%] tracking-[0%] ">
            Flight Information
          </h3>
          <div className="space-y-6 w-full">
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Route
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  LOS - LON
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Fee
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  N1,000,000
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Agency Fee
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  N200,000
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-1/2">
                <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                  Total
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                  N1,200,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFlight;
