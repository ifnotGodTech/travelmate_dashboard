"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { SuccessModal } from "@/components/reuseables/SuccessModal";
import { useParams } from "next/navigation";
import { useRespondToTicket, useGetTicket } from "@/hooks/api/ticket";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ConfirmResolution } from "@/components/molecues/support/Reuseables";
import * as Yup from "yup";

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

const page = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { loadingTicket, ticket } = useGetTicket({
    TicketId: id as string,
    initalFetch: true,
    successCallback: (message) => console.log(message),
    errorCallback: (error) => console.error(error),
  });

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <img
            src="/assets/icons/arrow-back.svg"
            alt="Back"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <div className="flex space-x-6">
            <button
              className="rounded-[8px] border border-[#D72638] text-[#D72638] font-medium p-4"
              onClick={() =>
                router.push(`/Dashboard/support/ticket/${ticket?.id}/escalate`)
              }
            >
              Escalate Ticket
            </button>
            <button
              className="rounded-[8px] bg-[#023E8A] text-white font-medium p-4"
              onClick={() => setShowConfirmModal(true)}
            >
              Mark as Resolved
            </button>
          </div>
        </div>

        {loadingTicket ? (
          <DetailsLoader />
        ) : (
          <div className="space-y-4">
            <p className="font-medium text-[16px] text-[#181818]">
              {formatDate(ticket?.created_at)}
            </p>
            <h2 className="text-[22px] font-semibold text-[#181818]">
              {ticket?.title}
            </h2>
            <div className="flex space-x-3 items-center">
              <p className="text-[16px] font-semibold text-[#4E4F52]">
                Customer:{" "}
                <span className="font-medium">
                  {ticket?.user.first_name} {ticket?.user.last_name}
                </span>
              </p>
              <div className="w-2 h-2 bg-[#9B9EA4] rounded-full"></div>
              <p className="text-[16px] font-semibold text-[#4E4F52]">
                Category:{" "}
                <span className="font-medium">{ticket?.category}</span>
              </p>
              <div className="w-2 h-2 bg-[#9B9EA4] rounded-full"></div>
              <p className="text-[16px] font-semibold text-[#4E4F52]">
                Chat Status:{" "}
                <span className="font-medium">{ticket?.status}</span>
              </p>
            </div>
          </div>
        )}

        <Chat ticket={ticket} loadingTicket={loadingTicket} />
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Ticket Resolved Successfully"
          description="You have successfully resolved this ticket."
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {showConfirmModal && (
        <ConfirmResolution
          selectedTicket={ticket}
          onClose={() => setShowConfirmModal(false)}
          setShowModal={setShowSuccessModal}
        />
      )}
    </>
  );
};

const Chat = ({ ticket, loadingTicket }: any) => {
  const { responding, onRespondToTicket } = useRespondToTicket();

  // State for managing older and new messages
  const [messages, setMessages] = useState(ticket?.messages || []);

  // Ref for the last message
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Sync messages with ticket prop when ticket changes
  useEffect(() => {
    setMessages(ticket?.messages || []);
  }, [ticket]);

  // Scroll to the last message whenever messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onRespondToTicket({
        TicketId: ticket?.id,
        payload: { content: values.message },
        successCallback: () => {
          console.log("Message sent successfully");

          // Append the new message to the state
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: Date.now(), // Temporary ID for new message
              sender: { id: "currentUserId" }, // Replace with actual user ID
              content: values.message,
              attachment: null,
              timestamp: new Date().toISOString(),
            },
          ]);

          resetForm(); // Clear the input field
        },
        errorCallback: (error: any) => {
          console.error("Error sending message", error);
        },
      });
    },
  });

  return (
    <div className="w-full pt-[24px] border-[1px] border-[#CDCED1] bg-[#F5F5F5] rounded-[24px] space-y-[40px] flex flex-col">
      <div className="flex justify-center items-center space-x-4">
        <div className="w-[220px] h-[1px] bg-[#181818]"></div>
        <div className="rounded-[100px] border-[1px] border-[#181818] py-[10px] px-[14px] font-[400] text-[#181818]">
          {ticket?.claimed_admin ? (
            <>
              Responding:{" "}
              {ticket.claimed_admin.first_name || ticket.claimed_admin.email} -{" "}
              {ticket.claim_timestamp
                ? format(
                    new Date(ticket.claim_timestamp),
                    "dd/MM/yyyy | hh:mm a"
                  )
                : "Unknown Time"}
            </>
          ) : (
            "No admin claimed"
          )}
        </div>
        <div className="w-[220px] h-[1px] bg-[#181818]"></div>
      </div>
      {loadingTicket ? (
        <MessageLoading />
      ) : (
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {messages.map((mes: any, index: number) => {
            const isUser = ticket?.user.id === mes.sender.id;
            return (
              <div
                key={mes.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <div className="space-y-1 max-w-[80%]">
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

                  <span
                    className={`block text-sm font-light text-[#67696D] ${
                      isUser ? "text-right" : "text-left"
                    }`}
                  >
                    {format(new Date(mes.timestamp), "p")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <form
        onSubmit={formik.handleSubmit}
        className="sticky bottom-0 rounded-b-[24px] bg-[#fff]"
      >
        {ticket?.status == "resolved" ? (
          <div className="">
            <p className="text-center p-4  text-[14px] lg:text-[24px] font-[500] text-[#181818] ">
              This Ticket has been marked as resolved
            </p>
          </div>
        ) : (
          <div className="p-4 flex items-center gap-4 w-full">
            {loadingTicket ? (
              <div className="w-full bg-[#f5f5f5] animate-pulse h-[20px] "></div>
            ) : (
              <>
                <div className="bg-[#EBECED] flex-1 p-3 border rounded-lg flex items-center space-x-4">
                  <img
                    src="/assets/icons/emoji.svg"
                    alt="Emoji"
                    className="cursor-pointer"
                  />
                  <input
                    type="text"
                    name="message"
                    placeholder="Type a message..."
                    className="flex-1 outline-none bg-transparent"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="p-3 bg-[#023E8A] flex space-x-2 items-center text-white rounded-lg cursor-pointer"
                >
                  <img src="/assets/icons/white-send.svg" alt="Send" />
                  <span className="text-[#fff] font-[500] text-[20px]">
                    Send
                  </span>
                </button>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

const MessageLoading = () => {
  return (
    <div className="space-y-6 animate-pulse w-full px-3">
      {/* Skeleton for Admin Message */}
      <div className="flex justify-start">
        <div className="space-y-2 w-[80%]">
          {/* Message Bubble */}
          <div className="py-3 px-4 bg-[#e1e1e1] w-full rounded-xl shadow-md h-8"></div>
          <div className="py-3 px-4 bg-[#E0E0E0] rounded-xl shadow-md w-2/3 h-6"></div>
          {/* Time */}
          <div className="h-3 w-1/3 bg-[#E0E0E0] rounded"></div>
        </div>
      </div>

      {/* Skeleton for User Message */}
      <div className="flex justify-end">
        <div className="space-y-2 w-[80%]">
          {/* Message Bubble */}
          <div className="py-3 px-4 bg-[#E0E0E0] rounded-xl w-full shadow-md h-8"></div>
          <div className="py-3 px-4 bg-[#E0E0E0] rounded-xl shadow-md w-2/4 h-6"></div>
          {/* Time */}
          <div className="h-3 w-1/4 bg-[#E0E0E0] rounded"></div>
        </div>
      </div>

      {/* Skeleton for Admin Message */}
      <div className="flex justify-start">
        <div className="space-y-2 w-[80%]">
          {/* Message Bubble */}
          <div className="py-3 px-4 bg-[#E0E0E0] rounded-xl shadow-md w-full h-10"></div>
          <div className="py-3 px-4 bg-[#E0E0E0] rounded-xl shadow-md w-4/5 h-8"></div>
          {/* Time */}
          <div className="h-3 w-1/3 bg-[#E0E0E0] rounded"></div>
        </div>
      </div>
    </div>
  );
};

const DetailsLoader = () => {
  return (
    <div className="space-y-2">
      <div className="w-[300px] h-[20px] bg-[#f2f2f2] rounded-[8px] animate-pulse"></div>
      <div className="w-[100px] h-[20px] bg-[#f5f5f5] rounded-[8px] animate-pulse"></div>
      <div className="w-[300px] h-[20px] bg-[#f5f5f5] rounded-[8px] animate-pulse"></div>
    </div>
  );
};

export default page;
