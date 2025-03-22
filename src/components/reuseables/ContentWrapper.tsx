import React from "react";
import Link from "next/link";

type LayoutWrapperProps = {
  children: React.ReactNode;
  redirectLink: string
};

const ContentWrapper = ({ children, redirectLink }: LayoutWrapperProps) => {
  return (
    <div className="max-screen-wrapper">
      <div className="max-screen-inner lg:py-[20px]">
        <div className="hidden w-full lg:block">
          <Link href={redirectLink} >
          <img
            src="/assets/icons/arrow-back.svg"
            alt=""
            className="w-10 h-10 cursor-pointer"
          />
          </Link>
        </div>
        <div className="lg:w-full lg:max-w-[754px] w-full lg:rounded-[20px] lg:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContentWrapper;
