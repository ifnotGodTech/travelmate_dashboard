import React from "react";

type Props = {};

const Partner = (props: Props) => {
  return (
    <div className="space-y-[40px]">
      <Partners />
      <Partners />
      <Partners />
    </div>
  );
};

const Partners = () => {
  return (
    <div className="space-y-[20px]">
      <h1 className="text-[16px] lg:text-[20px] font-[400] text-[#181818] leading-[100%] ">
        Stay Partners
      </h1>
      <p className="text-[#4E4F52] text-[14px] lg:text-[20px] font-[400] leading-[100%] ">
        From luxury five-star hotels to cozy boutique stays and budget-friendly
        options, our accommodation partners offer variety and quality in every
        corner of the globe.
      </p>
      <ul className="flex space-x-10 flex-wrap">
        <li className="text-[#4E4F52] text-[14px] lg:text-[20px] font-[400] leading-[100%]">
          Marriott Hotels
        </li>
        <li className="text-[#4E4F52] text-[14px] lg:text-[20px] font-[400] leading-[100%]">
          Marriott Hotels
        </li>
        <li className="text-[#4E4F52] text-[14px] lg:text-[20px] font-[400] leading-[100%]">
          Marriott Hotels
        </li>
      </ul>
    </div>
  );
};

export default Partner;
