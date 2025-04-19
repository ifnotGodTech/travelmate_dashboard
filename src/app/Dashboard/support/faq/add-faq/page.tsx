"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/components/reuseables/Button";
import { SuccessModal } from "@/components/reuseables/SuccessModal";
import { useAddFaq } from "@/hooks/api/faq";

const validationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

const initialValues = {
  category: "",
  question: "",
  answer: "",
  is_active: true,
};

const Page = () => {
  return (
    <div className="lg:bg-transparent">
      <AddComponent />
    </div>
  );
};

const AddComponent = () => {
  const { isSuccess, loading, onAddFaq } = useAddFaq();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSubmit = async (values: typeof initialValues) => {
    await onAddFaq({
      payload: values,
      successCallback: () => {
        setShowModal(true);
        console.log("FAQ added successfully.");
      },
    });
  };

  return (
    <>
      <div className="space-y-6 py-4 px-6 rounded-[8px] bg-[#fff]">
        <h1 className="font-[600] text-[16px] lg:text-[20px] leading-[1.5] text-[#181818]">
          Add New FAQ
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, errors, touched, setFieldValue }) => (
            <Form>
              <div className="space-y-6">
                {/* Category Field */}
                <div className="space-y-2">
                  <label className="text-[14px] lg:text-[16px] font-[500] text-[#181818]">
                    Category:
                  </label>
                  <Dropdown
                    options={[
                      { id: 1, label: "Flights" },
                      { id: 3, label: "Car Rentals" },
                      { id: 2, label: "Account" },
                    ]}
                    placeholder="Select category"
                    onSelect={(value) =>
                      setFieldValue("category", value?.id || "")
                    }
                  />
                  {errors.category && touched.category && (
                    <p className="text-red-500 text-sm">{errors.category}</p>
                  )}
                </div>

                {/* Question Field */}
                <div className="space-y-2">
                  <label className="text-[14px] lg:text-[16px] font-[500] text-[#181818]">
                    Question:
                  </label>
                  <Field
                    name="question"
                    type="text"
                    placeholder="Enter a frequently asked question"
                    className="w-full p-4 rounded-full outline-none border-[1px] border-[#9B9EA4] placeholder:text-[#9b9ea4] text-[16px] font-[400]"
                  />
                  {errors.question && touched.question && (
                    <p className="text-red-500 text-sm">{errors.question}</p>
                  )}
                </div>

                {/* Answer Field */}
                <div className="space-y-2">
                  <label className="text-[14px] lg:text-[16px] font-[500] text-[#181818]">
                    Answer:
                  </label>
                  <Field
                    name="answer"
                    as="textarea"
                    placeholder="Provide an answer"
                    rows={5}
                    className="w-full rounded-[8px] p-[16px] bg-[#F5F5F5] outline-none border-[1px] border-[#9B9EA4] placeholder:text-[#9b9ea4] text-[16px] font-[400]"
                  />
                  {errors.answer && touched.answer && (
                    <p className="text-red-500 text-sm">{errors.answer}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  title="SUBMIT"
                  variant={isValid ? "blue" : "gray"}
                  full
                  type="submit"
                  disabled={!isValid || loading}
                  loading={loading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Success Modal */}
      {showModal && (
        <SuccessModal
          title="FAQ Added Successfully"
          description="You have successfully added a new FAQ for customers."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

type DropdownOption = {
  id: number;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
  onSelect: (value: DropdownOption | null) => void;
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
            key={option.id}
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

export default Page;
