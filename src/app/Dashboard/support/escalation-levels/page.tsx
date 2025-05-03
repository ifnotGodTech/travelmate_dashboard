"use client"
import React, { useState } from "react";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import Button from "@/components/reuseables/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateEscalationLevel } from "@/hooks/api/ticket";
import { SuccessModal } from "@/components/reuseables/SuccessModal";

type Props = {};

const page = (props: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <EscalationInput onSuccess={() => setShowModal(true)} />
      </div>

      {showModal && (
        <SuccessModal
          title="Escalation Level Successfully Added"
          description="You have successfully added an escalation level."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const EscalationInput = ({ onSuccess }: { onSuccess: () => void }) => {
  const { loading, onEsccalationLevel } = useCreateEscalationLevel();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .required("Description is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      await onEsccalationLevel({
        TicketId: "12345", // Replace with actual TicketId if available
        payload: values,
        successCallback: onSuccess,
      });
    },
  });

  return (
    <ContentWrapper>
      <div className="bg-[#fff] lg:rounded-[20px]">
        <form onSubmit={formik.handleSubmit} className="space-y-6 p-10">
          <div className="space-y-6">
            <h1 className="text-[16px] font-[600] leading-[100%] lg:text-[28px] text-[#181818]">
              Set Escalation Levels
            </h1>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <div className="text-[16px] font-[500] text-[#181818]">
              Name:
            </div>
            <input
              type="text"
              {...formik.getFieldProps("name")}
              className="w-full p-4 rounded-full border-[#9b9ea4] border-[1px] bg-transparent text-[16px] font-[400]"
              placeholder="Enter level e.g. supervisor or director"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <div className="text-[16px] font-[500] text-[#181818]">
              Description:
            </div>
            <input
              type="text"
              {...formik.getFieldProps("description")}
              className="w-full p-4 rounded-full border-[#9b9ea4] border-[1px] bg-transparent text-[16px] font-[400]"
              placeholder="Add a description..."
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <div className="text-[16px] font-[500] text-[#181818]">
              Email:
            </div>
            <input
              type="text"
              {...formik.getFieldProps("email")}
              className="w-full p-4 rounded-full border-[#9b9ea4] border-[1px] bg-transparent text-[16px] font-[400]"
              placeholder="Add the email of the escalation level"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              title="CONFIRM ESCALATION"
              variant={
                !formik.isValid || loading || !formik.dirty ? "gray" : "blue"
              }
              full
              icon="/assets/icons/white-caution.svg"
              iconPosition="left"
              disabled={!formik.isValid || loading || !formik.dirty}
              loading={loading}
              size="16"
              weight="600"
              className="transition-all ease-in-out"
              type="submit"
            />
          </div>
        </form>
      </div>
    </ContentWrapper>
  );
};

export default page;
