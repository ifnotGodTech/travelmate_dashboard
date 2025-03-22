import React from "react";
import AuthWrapper from "../AuthWrapper";
import Button from "@/components/reuseables/Button";
import { InputReuseables } from "../login/page";
import Link from "next/link";



const page = () => {
  return (
    <AuthWrapper>
      <ResetComponent />
    </AuthWrapper>
  );
};

const ResetComponent = () => {
  return (
    <div className="bg-[#fff] p-[40px] space-y-10 rounded-[20px]">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/assets/images/Lock.svg"
          alt=""
          className="lg:w-28 w-[53px] "
        />
        <p className="text-[#181818] lg:text-2xl lg:font-semibold font-[500] text-[18px] ">
          Reset Password
        </p>
      </div>
      <Inputs />
      <div className="">
        <Link href={"/auth/otp"} className="w-full">
          <Button
            title="SEND RECOVERY EMAIL"
            variant="blue"
            full
            weight="600"
          />{" "}
        </Link>
      </div>
      <div>
        <Link href={"/auth/login"} className="w-full">
          <Button title="BACK TO LOG IN" variant="outline" full weight="600" />{" "}
        </Link>
      </div>
    </div>
  );
};

const Inputs = () => {
  return (
    <div className="space-y-10">
      <InputReuseables
        label="Email Address"
        placeholder="admin@travelmate.com"
      />
    </div>
  );
};

export default page;
