"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { SuccessModal } from "@/components/reuseables/SuccessModal";
import { useParams } from "next/navigation";
import {
  useRespondToTicket,
  useGetTicket,
  useClaimTicket,
} from "@/hooks/api/ticket";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ConfirmResolution } from "@/components/molecues/support/Reuseables";
import * as Yup from "yup";
import { useAuthContext } from "@/context/AuthContext";
import { useMyRoles } from "@/hooks/api/roles";

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
  const { loading, data } = useMyRoles({ modalVisible: true });

  const { loadingTicket, ticket } = useGetTicket({
    TicketId: id as string,
    initalFetch: true,
  });

  const isAdmin =
    currentUser === ticket?.claimed_admin?.id ||
    (ticket?.escalated === true &&
      ticket?.escalation_role?.name === data?.name);

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
        <Chat
          ticket={ticket}
          loadingTicket={loadingTicket}
          isAdmin={isAdmin}
          currentUser={currentUser}
        />
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
          dlink="/Dashboard/support/ticket/escalates"
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

const Chat = ({ ticket, loadingTicket, isAdmin, currentUser }: any) => {
  const { claiming, onClaiming } = useClaimTicket();
  const { responding, onRespondToTicket } = useRespondToTicket();

  const [messages, setMessages] = useState(ticket?.messages || []);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state

  useEffect(() => {
    setMessages(ticket?.messages.results || []);
  }, [ticket]);

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
    onSubmit: async (values, { resetForm }) => {
      if (
        !ticket?.claimed_admin?.id ||
        ticket?.claimed_admin?.id !== currentUser
      ) {
        try {
          await onClaiming({
            TicketId: ticket?.id,
          });
        } catch (error) {
          return;
        }
      }

      setIsSubmitting(true); // Disable sending

      onRespondToTicket({
        TicketId: ticket?.id,
        payload: { content: values.message },
        successCallback: () => {
          const newMessage = {
            id: new Date().toISOString(),
            content: values.message,
            sender: { id: currentUser },
            timestamp: new Date().toISOString(),
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          resetForm();
          setIsSubmitting(false); // Re-enable sending
        },
        errorCallback: (error: any) => {
          setIsSubmitting(false); // Re-enable sending in case of error
        },
      });
    },
  });

  return (
    <div className="w-full pt-[24px] border-[1px] border-[#CDCED1] bg-[#F5F5F5] rounded-[24px] space-y-[40px] flex flex-col">
      {/* Full-screen Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/80 bg-opacity-75 flex justify-center items-center z-50 h-screen "
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Full-Screen Image"
            className="max-w-full max-h-[90%] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="flex justify-center items-center">
        <div className="hidden md:block w-[100px] lg:w-[220px] h-[1px] bg-[#181818]"></div>
        <div className="w-[70vw] md:w-auto mx-auto md:mx-4 rounded-[100px] border-[1px] border-[#181818] py-[8px] px-[10px] sm:py-[10px] sm:px-[14px] font-[400] text-[#181818] text-[10px] sm:text-[12px] lg:text-[14px] text-center">
          {ticket?.claimed_admin ? (
            <div className="flex items-center sm:justify-center sm:space-x-1">
              <span className="font-medium">Responding: </span>
              <span className="truncate">
                {ticket.claimed_admin.first_name ||
                ticket.claimed_admin.last_name
                  ? `${ticket.claimed_admin.first_name || ""} ${
                      ticket.claimed_admin.last_name || ""
                    }`.trim()
                  : ticket.claimed_admin.email || "---"}
              </span>
              <span className="text-[10px] sm:text-[12px] lg:text-[14px] text-gray-600">
                -{" "}
                {ticket.claim_timestamp
                  ? format(
                      new Date(ticket.claim_timestamp),
                      "dd/MM/yyyy | hh:mm a"
                    )
                  : "Unknown Time"}
              </span>
            </div>
          ) : (
            "No admin claimed"
          )}
        </div>
        <div className="hidden md:block w-[100px] lg:w-[220px] h-[1px] bg-[#181818]"></div>
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
                <div
                  className={`flex flex-col items-${
                    isUser ? "end" : "start"
                  } space-y-1 max-w-[80%]`}
                >
                  {/* Message Content */}
                  {mes.content && (
                    <div
                      className={`py-3 px-4 text-[16px] font-medium rounded-xl shadow-md ${
                        isUser
                          ? "bg-[#f0f0f0] text-[#181818] text-end"
                          : "bg-[#023E8A] text-white text-start"
                      }`}
                      style={{ maxWidth: "fit-content" }}
                    >
                      {mes.content}
                    </div>
                  )}

                  {/* Image Attachment */}
                  {mes.attachment && (
                    <div
                      className={`flex ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <img
                        src={mes.attachment}
                        alt="Attachment"
                        className="w-[250px] h-auto rounded-lg shadow-lg cursor-pointer"
                        onClick={() => setModalImage(mes.attachment)}
                      />
                    </div>
                  )}

                  {/* Timestamp */}
                  <span
                    className={`block text-[12px] font-light text-[#67696D] ${
                      isUser ? "text-right" : "text-left"
                    }`}
                  >
                    {format(new Date(mes.timestamp), "do MMMM : h:mmaaa")}
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
          <div className="text-center p-4 text-[14px] lg:text-[24px] font-[500] text-[#181818]">
            This Ticket has been marked as resolved
          </div>
        ) : (
          <div className="p-4 flex items-center gap-4 w-full">
            {loadingTicket ? (
              <div className="w-full bg-[#f5f5f5] animate-pulse h-[20px]"></div>
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
                    disabled={!isAdmin || isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={
                    !isAdmin || ticket?.status === "resolved" || isSubmitting
                  }
                  className={`p-3 rounded-[8px] items-center flex space-x-1 ${
                    !isAdmin || ticket?.status === "resolved" || isSubmitting
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
