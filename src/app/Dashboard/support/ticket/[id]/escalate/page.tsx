"use client";
import { useState, useEffect } from "react";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import React from "react";
import { useFormik } from "formik";
import { SuccessModal } from "@/components/reuseables/SuccessModal";
import * as Yup from "yup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Button from "@/components/reuseables/Button";
import { useParams } from "next/navigation";
import {
  useGetTicket,
  useGetAllEscalationLevel,
  useGetAllEscalationReasons,
  useEscalateTicket,
} from "@/hooks/api/ticket";
import { format } from "date-fns";

const page = () => {
  const [showModal, setShowModal] = useState(false);
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

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <div>
        <ContentWrapper>
          <div className="bg-[#fff] lg:rounded-[20px]">
            <EscalateDetails
              data={data}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </ContentWrapper>
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

const EscalateDetails = ({ data, showModal, setShowModal }: any) => {
  return (
    <div className="p-[40px] space-y-[40px]">
      <div>
        <h3 className="font-[500] lg:text-[16px] text-[14px] text-[#181818]">
          {data?.created_at
            ? format(
                new Date(data.created_at),
                "EEEE do 'of' MMM.yyyy | hh:mmaaa"
              )
            : "Date not available"}
        </h3>
      </div>
      <div>
        <h1 className="font-[600] text-[16px] lg:text-[28px] text-[#181818]">
          Escalate Issue #{data?.ticket_id}
        </h1>
      </div>
      <Warning />
      <CustomerInfo user={data?.user} />
      <Selections
        id={data?.id}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

const Selections = ({ id, showModal, setShowModal }: any) => {
  const { escalating, onEscalateTicket } = useEscalateTicket();
  const { Leveldata, Levelloading } = useGetAllEscalationLevel({
    initalFetch: true,
  });
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleDropdownSelect = (option: any) => {
    setSelectedEmail(option?.email || "");
  };

  const formik = useFormik({
    initialValues: {
      escalation_level: "",
      escalation_reason: "",
      escalation_note: "",
      escalation_response_time: "",
    },
    validationSchema: Yup.object({
      escalation_level: Yup.string().required("Escalation level is required"),
      escalation_reason: Yup.string().required("Reason is required"),
      escalation_note: Yup.string()
        .required("Note is required")
        .max(200, "Note cannot exceed 200 characters"),
      escalation_response_time: Yup.string().required(
        "Response time is required"
      ),
    }),
    onSubmit: (values) => {
      const payload = {
        escalation_level: values.escalation_level,
        escalation_reason: values.escalation_reason,
        escalation_note: values.escalation_note,
        escalation_response_time: values.escalation_response_time,
      };

      onEscalateTicket({
        TicketId: id,
        payload,
        successCallback: () => {
          setShowModal(true);
          console.log("Ticket escalated successfully");
        },
      });
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 mt-[24px]"
        noValidate
      >
        <div className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-[16px] font-[500] text-[#181818]">
              Escalation Level:
            </h1>
            <Dropdown
              options={Leveldata?.results || []}
              placeholder="Select Escalation Level"
              onSelect={(option) => {
                formik.setFieldValue("escalation_level", option.id);
                handleDropdownSelect(option); // Ensure the option is passed to update the email
              }}
            />
            {formik.touched.escalation_level &&
              formik.errors.escalation_level && (
                <p className="text-red-500 text-sm">
                  {formik.errors.escalation_level}
                </p>
              )}
          </div>

          <div className="space-y-6">
            <h1 className="text-[16px] font-[500] text-[#181818]">
              Escalation Level Email:
            </h1>
            <input
              type="text"
              value={selectedEmail}
              readOnly
              className="w-full p-4 rounded-full border-[#9b9ea4] border-[1px] bg-transparent text-[16px] font-[400]"
              placeholder="Select an escalation level first"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-[16px] font-[500] text-[#181818]">
              Reason for Escalation:
            </h1>
            <input
              type="text"
              name="escalation_reason"
              placeholder="Provide reason for escalation"
              className="w-full p-4 rounded-[8px] bg-[#f5f5f5] placeholder:text-[#9b9ea4] text-[16px] font-[400]"
              value={formik.values.escalation_reason}
              onChange={formik.handleChange}
            />
            {formik.touched.escalation_reason &&
              formik.errors.escalation_reason && (
                <p className="text-red-500 text-sm">
                  {formik.errors.escalation_reason}
                </p>
              )}
          </div>

          <div className="space-y-6">
            <h1 className="text-[16px] font-[500] text-[#181818]">
              Escalation Note:
            </h1>
            <textarea
              name="escalation_note"
              maxLength={200}
              placeholder="Provide additional information"
              className="w-full p-4 rounded-[8px] bg-[#f5f5f5] placeholder:text-[#9b9ea4] text-[16px] font-[400]"
              value={formik.values.escalation_note}
              onChange={formik.handleChange}
            />
            {formik.touched.escalation_note &&
              formik.errors.escalation_note && (
                <p className="text-red-500 text-sm">
                  {formik.errors.escalation_note}
                </p>
              )}
          </div>

          <div className="space-y-6">
            <h1 className="text-[16px] font-[500] text-[#181818]">
              Escalation Response Time:
            </h1>
            <MiniDropdown
              options={[
                { id: "1hr", label: "1 Hour (Emergency)" },
                { id: "4hrs", label: "4 Hours (Urgent)" },
                { id: "24hrs", label: "24 Hours (High priority)" },
              ]}
              placeholder="Select response time"
              onSelect={(option) =>
                formik.setFieldValue("escalation_response_time", option?.id)
              }
            />
            {formik.touched.escalation_response_time &&
              formik.errors.escalation_response_time && (
                <p className="text-red-500 text-sm">
                  {formik.errors.escalation_response_time}
                </p>
              )}
          </div>

          <div>
            <Button
              title="ESCALATE REQUEST"
              variant={
                !formik.isValid || escalating || !formik.dirty ? "gray" : "blue"
              }
              full
              icon="/assets/icons/white-caution.svg"
              iconPosition="left"
              disabled={!formik.isValid || escalating || !formik.dirty}
              loading={escalating}
              size="16"
              weight="600"
              className="transition-all ease-in-out"
            />
          </div>
        </div>
      </form>
    </>
  );
};

type DropdownOption = {
  id: number;
  name: string;
  email: string;
};

type DropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
  onSelect: (value: DropdownOption) => void;
};

const Dropdown = ({ options, placeholder, onSelect }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null
  );

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full p-4 rounded-full border-[#9b9ea4] border-[1px] flex justify-between bg-transparent">
          {selectedOption?.name || placeholder}
          <img src="/assets/icons/arrow-down.svg" alt="Dropdown Arrow" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)]"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className="w-full text-center px-4 py-2 hover:bg-gray-200"
            onClick={() => handleSelect(option)}
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type MiniDropdownOption = {
  id: String;
  label: string;
};

type MiniDropdownProps = {
  options: MiniDropdownOption[];
  placeholder?: string;
  onSelect: (value: MiniDropdownOption | null) => void;
};

const MiniDropdown = ({
  options,
  placeholder,
  onSelect,
}: MiniDropdownProps) => {
  const [selectedOption, setSelectedOption] =
    useState<MiniDropdownOption | null>(null);

  const handleSelect = (option: MiniDropdownOption) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full p-4 rounded-full border-[#9b9ea4] border-[1px] flex justify-between bg-transparent">
          {selectedOption?.label || placeholder}
          <img src="/assets/icons/arrow-down.svg" alt="Dropdown Arrow" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)]"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className="w-full text-center px-4 py-2 hover:bg-gray-200"
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CustomerInfo = ({ user }: any) => {
  const { email, first_name, last_name } = user || {};
  return (
    <div className="space-y-6">
      <h4 className="font-[500] text-[20px] text-[#181818]">
        Customer Information
      </h4>
      <div className="space-y-6 w-full">
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
              First Name
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px]">
              {first_name || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
              Last Name
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px]">
              {last_name || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
              Phone Number
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px] break-all">
              {"+2349064349985"}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
              Email Address
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px] break-all">
              {email || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Warning = () => {
  return (
    <div className="py-[24px]">
      <div className="py-4 px-6 bg-[#FFE2D2] rounded-[12px] gap-x-[16px] border-[#FF6F1E] border-[1px] flex items-start ">
        <div className="">
          <img src="/assets/icons/dark-warning.svg" alt="" />
        </div>
        <div className="flex-1 lg:space-y-[16px] space-y-[8px]">
          <h2 className="font-[500] lg:text-[20px] text-[14px] text-[#181818]">
            You are about to escalate this issue
          </h2>
          <p className="font-[400] lg:text-[16px] text-[10px] text-[#67696d]">
            Escalation will notify management and prioritize this ticket for
            immediate attention. Please provide additional details to help
            resolve this issue quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => {
  return <div className="">Loading</div>;
};

export default page;
