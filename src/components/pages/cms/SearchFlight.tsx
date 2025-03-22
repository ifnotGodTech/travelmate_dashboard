import Button from "@/components/reuseables/Button";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import React from "react";

type Props = {};

const SearchFlight = (props: Props) => {
  return (
    <ContentWrapper>
      <div className="">
        <SearchComponent />
      </div>
    </ContentWrapper>
  );
};

const SearchComponent = () => {
  return (
    <div className="py-[20px]  space-y-[40px] bg-[#fff] lg:rounded-[20px] ">
      <div className="py-[24px] px-[40px] space-y-6">
        <div className="w-full py-4 px-6 bg-[#ccd8e8] ">
          <p className="text-[#023e8a] font-inter text-[20px] leading-[100%] tracking-[0%] uppercase font-[600] text-center ">
            Check Existing Airlines
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="font-[700] text-[18px] text-[#333333]">
            Search Airlines
          </h2>
          <p className="font-[500] text-[12px] text-[#67696d]">
            Search here to confirm if the airline is still active and not
            already registered on your platform.
          </p>
        </div>
        <div className="flex items-center space-x-4 py-[19px] px-[24px] rounded-[12px] border-[1px] border-[#9b9ea4] w-full ">
          <input
            type="text"
            placeholder="Enter airline name"
            className="flex-1 placeholder:font-[400] placeholder:text-[16px] placeholder:text-[#9b9ea4] text-[#181818] outline-none font-[500] text-[16px]"
          />

          <img src="/assets/icons/search.svg" alt="" className="" />
        </div>

        <div className="flex items-center justify-between space-x-4 py-[19px] px-[24px] rounded-[12px] w-full">
          <p className="text-[#181818] outline-none font-[500] text-[16px]">
            Flamingo Airway
          </p>

          <input type="checkbox" name="" id="" className="size-[24px]" />
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#EBECED]"></div>

      <div className="w-full px-[40px]">
        <Button title="continue" weight="600" variant="gray" full />
      </div>
    </div>
  );
};

export default SearchFlight;
