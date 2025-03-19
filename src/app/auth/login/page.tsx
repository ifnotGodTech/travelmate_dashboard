import React from "react";
import AuthWrapper from "../AuthWrapper";
import { Switch } from "@/components/ui/switch";
import Button from "@/components/reuseables/Button";

type Props = {};

const page = (props: Props) => {
  return (
    <AuthWrapper page="login">
      <LoginComponent />
    </AuthWrapper>
  );
};

const LoginComponent = () => {
  return (
    <div className="bg-[#fff] p-[40px] space-y-10 rounded-[20px]">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/assets/images/logo.svg"
          alt=""
          className="lg:w-28 w-[53px] "
        />
        <p className="text-[#181818] lg:text-2xl lg:font-semibold font-[500] text-[18px] ">
          TravelMate
        </p>
        <p className="text-[#181818] lg:text-lg text-[16px] font-medium">
          Admin Dashboard
        </p>
      </div>
      <Inputs />

      <div className="flex items-center space-x-4">
        <Switch id="airplane-mode" />
        <div className="text-[#181818] lg:text-[14px] font-[400] lg:font-medium text-[12px]">
          Remember me
        </div>
      </div>

      <div className="flex justify-end ">
        <p className="text-[#023E8A] lg:text-[14px] font-[400] lg:font-medium text-[12px]">
          Forgot password?
        </p>
      </div>

      <Button title="SIGN IN" variant="blue" full weight="600" />
    </div>
  );
};

const Inputs = () => {
  return (
    <div className="space-y-10">
      <InputReuseables
        label="Enter Email Address "
        placeholder="admin@travelmate.com"
      />
      <InputReuseables label="Password" placeholder="Enter your password" />
    </div>
  );
};

export const InputReuseables = ({
  placeholder,
  label,
}: {
  placeholder: string;
  label: string;
}) => {
  return (
    <div className="space-y-4">
      <p className="text-[#181818] lg:text-[16px] lg:font-semibold text-[14px] font-[500]">
        {label}{" "}
      </p>
      <input
        type="text"
        className="w-full border-[1px] border-[#9B9EA4] bg-[#f5f5f5] rounded-[8px] p-[16px] placeholder:text-[#9B9EA4] text-[#181818] placeholder:text-[16px] placeholder:font-[400]  lg:text-[16px] text-[14px] font-[400] "
        placeholder={placeholder}
      />
    </div>
  );
};

export default page;
