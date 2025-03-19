import React from "react";

type LayoutWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const ContentWrapper = ({ children, className = "" }: LayoutWrapperProps) => {
  return (
    <div className="max-screen-wrapper">
      <div className="max-screen-inner lg:py-[20px]">
        <div className="hidden w-full lg:block">
          <img
            src="/assets/icons/arrow-back.svg"
            alt=""
            className="w-10 h-10 cursor-pointer"
          />
        </div>
        <div className="lg:w-full lg:max-w-[754px] w-full lg:rounded-[20px] lg:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContentWrapper;
