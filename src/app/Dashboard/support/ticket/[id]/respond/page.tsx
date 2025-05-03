"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import React from "react";
import Button, { ToggleButton } from "@/components/reuseables/Button";
import { SuccessModal } from "@/components/reuseables/SuccessModal";
import { useParams } from "next/navigation";
import { useRespondToTicket, useGetTicket } from "@/hooks/api/ticket";
import { format } from "date-fns";

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const { id }: { id: string } = useParams();

  const { data, loading } = useGetTicket({
    TicketId: id as string,
    initalFetch: true,
    successCallback: (message) => {
      console.log(message);
    },
    errorCallback: (error) => {
      console.error(error);
    },
  });

  const { responding, onRespondToTicket } = useRespondToTicket();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachment(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .min(5, "Content must be at least 5 characters")
        .required("Content is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("content", values.content);
      if (attachment) formData.append("attachment", attachment);

      onRespondToTicket({
        TicketId: id,
        payload: formData,
        successCallback: () => {
          setShowModal(true);
          console.log("Ticket escalated successfully");
        },
      });
    },
  });

  return (
    <>
      <ContentWrapper>
        <div className="bg-[#fff] lg:rounded-[20px]">
          <div className="space-y-6 p-10">
            <div className="">
              <h3 className="font-[500] lg:text-[16px] text-[14px] text-[#181818]">
                {data?.created_at
                  ? format(
                      new Date(data.created_at),
                      "EEEE do 'of' MMM.yyyy | hh:mmaaa"
                    )
                  : "Date not available"}
              </h3>
            </div>
            <div className="py-4 px-6 space-y-4 bg-[#ebeced]">
              <p className="font-[400] lg:text-[18px] text-[14px] text-[#4e4f52]">
                Customer: {data?.user?.first_name || "N/A"}{" "}
                {data?.user?.last_name || "N/A"}
              </p>
              <p className="font-[400] lg:text-[18px] text-[14px] text-[#4e4f52]">
                Subject: {data?.description || "N/A"}
              </p>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <h1 className="font-[500] lg:text-[20px] text-[14px] text-[#181818]">
                  Respond to Customer
                </h1>
                <textarea
                  name="content"
                  id="content"
                  className="w-full rounded-[12px] py-[16px] px-[24px] placeholder:text-[16px] font-[500] text-[#181818] outline-none border-[1px] border-gray-300"
                  placeholder="Type your message here..."
                  rows={9}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                ></textarea>
                {formik.touched.content && formik.errors.content ? (
                  <p className="text-red-500 text-sm">
                    {formik.errors.content}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col lg:flex-row justify-between gap-[24px] py-[20px]">
                <div className="relative">
                  {/* Button for adding attachment */}
                  <Button
                    title="Add attachment"
                    variant="gray-white"
                    border
                    weight="600"
                    icon="/assets/icons/dark-plus.svg"
                    iconPosition="left" full
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {attachment && (
                    <p className="mt-2 text-sm text-gray-700">
                      {attachment.name}
                    </p>
                  )}
                </div>
                <ToggleButton
                  title="Mark as resolved"
                  isActive={isResolved}
                  onClick={() => setIsResolved(!isResolved)}
                  variant="gray-white"
                  border
                />
              </div>

              <Button
                title="ESCALATE REQUEST"
                variant={
                  !formik.isValid || responding || !formik.dirty
                    ? "gray"
                    : "blue"
                }
                full
                icon="/assets/icons/white-caution.svg"
                iconPosition="left"
                disabled={!formik.isValid || responding || !formik.dirty}
                loading={responding}
                size="16"
                weight="600"
                className="transition-all ease-in-out"
                type="submit"
              />
            </form>
          </div>
        </div>
      </ContentWrapper>
      {showModal && (
        <SuccessModal
          title="Ticket escalated Successfully"
          description="You have successfully escalated this ticket."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default page;
