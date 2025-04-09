"use client";
import React from "react";
import AuthWrapper from "@/app/auth/AuthWrapper";
import Button from "@/components/reuseables/Button";
import { InputReuseables } from "@/app/auth/login/page";
import Link from "next/link";
import { useField } from "formik";
import { FieldMetaProps } from "formik/dist/types";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";  
import * as Yup from "yup";
import { useForgotPassword, useNewPassword } from "@/hooks/api/auth";
import AuthService from "@/services/auth";

interface ResetPasswordFormProps {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleSuccess: ({
    message,
    targetPage,
  }: {
    message?: string;
    targetPage: "reset" | "otp" | "newPassword" | "success";
  }) => void;
}

const NewPassword = ({
  handleSuccess,
  form,
  setForm,
}: ResetPasswordFormProps) => {
  return (
    <AuthWrapper>
      <div className="">
        <ResetComponent
          handleSuccess={handleSuccess}
          form={form}
          setForm={setForm}
        />
      </div>
    </AuthWrapper>
  );
};

export const ResetComponent = ({
  handleSuccess,
  form,
  setForm,
}: ResetPasswordFormProps) => {
  const [errorMsg, setErrorMsg] = React.useState("");

  const { loading, onNewPassword } = useNewPassword({
    Service: AuthService,
  });

  // Update handleSubmit to accept and pass password and confirmPassword
  const handleSubmit = (values: {
    password: string;
    confirmPassword: string;
  }) => {
    const { email, otp } = form || {};
    const { password, confirmPassword } = values;
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    // console.log({ email, otp, password, confirmPassword });

    const payload = {
      email,
      token: otp,
      new_password: password,
      re_new_password: confirmPassword,
    };

    onNewPassword({
      payload,
      successCallback: (message) => {
        handleSuccess({ targetPage: "success" });
      },
      errorCallback: ({ message }) => {
        setErrorMsg(message || "");
      },
    });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }} // Include password and confirmPassword in initialValues
      onSubmit={handleSubmit}
    >
      {({ isValid, values }) => (
        <div className="bg-[#fff] p-[40px] space-y-10 rounded-[20px]">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/assets/images/company-logo.svg"
              alt=""
              className="lg:w-28 w-[53px] "
            />
            <p className="text-[#181818] lg:text-2xl lg:font-semibold font-[500] text-[18px] ">
              Reset Password
            </p>
          </div>
          <Form className="space-y-10">
            <Inputs />
            <div className="">
              <Button
                title="CONFIRM PASSWORD"
                variant={isValid ? "blue" : "gray"}
                full
                weight="600"
                type="submit"
                disabled={!isValid || loading}
                loading={loading}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

const Inputs = () => {
  return (
    <div className="space-y-10">
      <InputReuseables
        label="New Password"
        placeholder="Enter new password"
        name="password"
        type="password"
      />
      <InputReuseables
        label="Confirm Password"
        placeholder="confirm new password"
        name="confirmPassword"
        type="password"
      />
    </div>
  );
};

// Reuse the FieldError component from your login page
const FieldError = ({ meta }: { meta: FieldMetaProps<any> }) => {
  if (meta.touched && meta.error) {
    return (
      <div className="mt-1 font-gordita text-xs leading-5 font-normal text-[#FF0000]">
        {meta.error}
      </div>
    );
  }
  return null;
};

export default NewPassword;
