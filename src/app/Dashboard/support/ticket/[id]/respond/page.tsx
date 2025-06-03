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
import { useAuthContext } from "@/context/AuthContext";

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
  const APP_STATE = useAuthContext();
  const currentUser = APP_STATE?.user?.user_id;
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

  const isAdmin = currentUser === ticket?.claimed_admin?.id;

  return (
    <>
      <div className="space-y-6 pb-[72px] min-h-[100vh] ">
        {" "}
        {/* Add padding to account for sticky buttons */}
        <div className="flex justify-between items-center">
          <img
            src="/assets/icons/arrow-back.svg"
            alt="Back"
            className="cursor-pointer"
            onClick={router.back}
          />

          {ticket?.status !== "resolved" && (
            <div className="hidden lg:flex space-x-4">
              {!ticket?.escalated && (
                <button
                  className={`flex-1 rounded-[8px] border font-medium py-2 ${
                    isAdmin
                      ? "border-[#D72638] text-[#D72638]"
                      : "border-gray-500 text-gray-700 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    router.push(
                      `/Dashboard/support/ticket/${ticket?.id}/escalate`
                    )
                  }
                  disabled={!isAdmin}
                  aria-disabled={isAdmin}
                  title={isAdmin ? "Admins only" : "Escalate this ticket"}
                >
                  Escalate Ticket
                </button>
              )}
              <button
                className={`flex-1 rounded-[8px] text-white font-medium px-4 py-2 w-full ${
                  isAdmin ? "bg-[#023E8A]" : "bg-gray-500 cursor-not-allowed"
                }`}
                onClick={() => setShowConfirmModal(true)}
                disabled={!isAdmin}
                aria-disabled={!isAdmin}
                title={isAdmin ? "Admins only" : "Mark ticket as resolved"}
              >
                Mark as Resolved
              </button>
            </div>
          )}
        </div>
        {loadingTicket ? (
          <DetailsLoader />
        ) : (
          <div className="space-y-2">
            <p className="font-medium text-[12px] lg:text-[16px] text-[#181818]">
              {formatDate(ticket?.created_at)}{" "}
              {ticket?.escalated == true && (
                <span className="text-red-700">
                  | This is an escalated ticket{" "}
                </span>
              )}
            </p>
            <h2 className="lgtext-[22px] text-[18px] font-semibold text-[#181818]">
              {ticket?.title}
            </h2>
            <div className="flex space-x-3 items-center flex-wrap">
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
        <Chat ticket={ticket} loadingTicket={loadingTicket} isAdmin={isAdmin} />
      </div>
      {ticket?.status !== "resolved" && (
        <div className="  sticky lg:hidden bottom-0 bg-white p-4 flex justify-between items-end space-x-4 shadow-lg">
          {ticket?.escalated !== true && (
            <button
              className={`flex-1 rounded-[8px] border  font-medium py-2 ${
                !isAdmin
                  ? "border-gray-500 text-gray-700 cursor-not-allowed "
                  : "border-[#D72638] text-[#D72638]  "
              } `}
              onClick={() =>
                router.push(`/Dashboard/support/ticket/${ticket?.id}/escalate`)
              }
              disabled={!isAdmin}
            >
              Escalate Ticket
            </button>
          )}
          <button
            className={`flex-1 rounded-[8px]  text-white font-medium py-2 ${
              !isAdmin ? "bg-gray-600 cursor-not-allowed" : "bg-[#023E8A]"
            } `}
            onClick={() => setShowConfirmModal(true)}
            disabled={!isAdmin}
          >
            Mark as Resolved
          </button>
        </div>
      )}

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

const Chat = ({ ticket, loadingTicket, isAdmin }: any) => {
  const { responding, onRespondToTicket } = useRespondToTicket();

  // State for managing older and new messages
  const [messages, setMessages] = useState(ticket?.messages || []);

  // Ref for the last message
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Modal state for image attachments
  const [modalImage, setModalImage] = useState<string | null>(null);

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
        <div className="w-[31px] lg:w-[220px] h-[1px] bg-[#181818]"></div>
        <div className="rounded-[100px] border-[1px] border-[#181818] py-[10px] px-[14px] font-[400] text-[#181818] text-[12px] lg:text-[16px] ">
          {ticket?.claimed_admin ? (
            <>
              Responding: {ticket.claimed_admin.first_name || "---"} -{" "}
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
        <div className="w-[31px] lg:w-[220px] h-[1px] bg-[#181818]"></div>
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
                <div className="space-y-2 max-w-[80%]">
                  {/* Message Content */}
                  {mes.content && (
                    <div
                      className={`py-3 px-4 text-[16px] font-medium rounded-xl shadow-md ${
                        isUser
                          ? "bg-[#f0f0f0] text-[#181818] text-end"
                          : "bg-[#023E8A] text-white "
                      }`}
                      style={{ maxWidth: "fit-content" }}
                    >
                      {mes.content}
                    </div>
                  )}

                  {/* Attachment */}
                  {mes.attachment && (
                    <div
                      className={`mt-2 ${isUser ? "text-right" : "text-left"}`}
                      style={{ maxWidth: "100%" }}
                    >
                      <img
                        src={mes.attachment}
                        alt="Attachment"
                        className="w-[250px] h-auto rounded-lg shadow-lg cursor-pointer"
                        onClick={() => setModalImage(mes.attachment)}
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
                    disabled={!isAdmin}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isAdmin}
                  className={`p-3 bg-[#023E8A] flex space-x-2 rounded-[8px] items-center ${
                    !isAdmin
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#023E8A] text-white"
                  }`}
                >
                  {responding ? (
                    <div className="w-5 h-5 border-4 border-gray-100 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <img src="/assets/icons/white-send.svg" alt="Send" />
                  )}

                  <span className="text-[#fff] font-[500] text-[20px]">
                    Send
                  </span>
                </button>
              </>
            )}
          </div>
        )}
      </form>

      {/* Modal for Image */}
      {modalImage && (
        <Modal onClose={() => setModalImage(null)}>
          <img
            src={modalImage}
            alt="Modal Attachment"
            className="w-full h-auto max-w-[800px] max-h-[90vh] rounded-lg mx-auto"
          />
        </Modal>
      )}
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
