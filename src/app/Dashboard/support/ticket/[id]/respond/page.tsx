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
import { useRouter } from "next/navigation";

const formatDate = (isoDate: any) => {
  if (!isoDate) {
    return "Invalid date";
  }

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return format(date, "EEEE dd/MM/yyyy | hh:mm a");
};

const formatChatDate = (isoDate: any) => {
  if (!isoDate) {
    return "Invalid date";
  }

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return format(date, "EEEE hh:mm a");
};

const page = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const { id }: { id: string } = useParams();

  const { loadingTicket, ticket } = useGetTicket({
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
      <div className="space-y-6">
        <div className="flex justify-between">
          <img src="/assets/icons/arrow-back.svg" alt="" className="" />

          <div className="flex space-x-6">
            <div
              className="rounded-[8px] border-[1px] border-[#D72638] text-[#D72638] font-[500] cursor-pointer p-4"
              onClick={() =>
                router.push(`/Dashboard/support/ticket/${ticket?.id}/escalate`)
              }
            >
              Escalate ticket
            </div>
            <div className="rounded-[8px] bg-[#023E8A] text-[#fff] font-[500] cursor-pointer p-4">
              Mark as resolved
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-[500] text-[16px] text-[#181818]">
            {formatDate(ticket?.created_at)}
          </p>
          <h2 className="text-[22px] font-[600] text-[#181818]">
            {ticket?.title}
          </h2>
          <div className="flex space-x-3 items-center">
            <p className="text-[16px] font-[600] text-[#4E4F52] ">
              Customer:{" "}
              <span className="font-[500]">
                {ticket?.user.first_name} {ticket?.user.last_name}
              </span>
            </p>
            <div className="w-2 h-2 bg-[#9B9EA4] rounded-full"></div>
            <p className="text-[16px] font-[600] text-[#4E4F52] ">
              Category: <span className="font-[500]">{ticket?.category}</span>
            </p>
            <div className="w-2 h-2 bg-[#9B9EA4] rounded-full"></div>
            <p className="text-[16px] font-[600] text-[#4E4F52] ">
              Chat Status: <span className="font-[500]">{ticket?.status}</span>
            </p>
          </div>
        </div>

        <Chat ticket={ticket} />
      </div>

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

const Chat = ({ ticket }: any) => {
  return (
    <div className="w-full pt-[24px] border-[1px] border-[#CDCED1] bg-[#F5F5F5] rounded-[24px] space-y-[40px]  flex flex-col">
      <div className="flex justify-center items-center space-x-4">
        <div className="w-[220px] h-[1px] bg-[#181818]"></div>
        <div className="rounded-[100px] border-[1px] border-[#181818] py-[10px] px-[14px] font-[400] text-[#181818]">
          Responding: Elvis- 17/07/2025 | 11:07AM
        </div>
        <div className="w-[220px] h-[1px] bg-[#181818]"></div>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {ticket?.messages.map((mes: any) => {
          const isUser = ticket?.user.id === mes.sender.id;
          return (
            <div
              key={mes.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div className="space-y-2 max-w-[80%]">
                {/* Message Content */}
                {mes.content && (
                  <div
                    className={`py-3 px-4 text-[16px] font-medium rounded-xl shadow-md ${
                      isUser
                        ? "bg-[#f0f0f0] text-[#181818] text-end "
                        : "bg-[#023E8A] text-white"
                    }`}
                  >
                    {mes.content}
                  </div>
                )}

                {/* Attachment */}
                {mes.attachment && (
                  <div
                    className={`mt-2 ${isUser ? "text-right" : "text-left"}`}
                  >
                    <img
                      src={mes.attachment}
                      alt="Attachment"
                      className="w-[250px] h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {/* Timestamp */}
                <span
                  className={`block text-sm font-light text-[#67696D] ${
                    isUser ? "text-right" : "text-left"
                  }`}
                >
                  {mes.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 rounded-b-[24px] bg-[#fff]">
        <div className="p-4 flex items-center gap-4 w-full">
          <div className="bg-[#EBECED] flex-1 p-3 border rounded-lg flex items-center space-x-4">
            <img
              src="/assets/icons/emoji.svg"
              alt="Emoji"
              className="cursor-pointer"
            />
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 outline-none bg-transparent"
            />
          </div>
          <button className="p-3 bg-[#023E8A] flex space-x-2 items-center text-white rounded-lg cursor-pointer ">
            <img src="/assets/icons/white-send.svg" alt="Send" />
            <span className="text-[#fff] font-[500] text-[20px] ">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
