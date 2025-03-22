"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Button from "@/components/reuseables/Button";

type Props = {};

const Page = (props: Props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowConfirmation(false); // Close confirmation modal
    setShowSuccess(true); // Show success modal
  };

  return (
    <div className="space-y-6 py-4 px-6 rounded-[8px] bg-[#fff]">
      <div className="space-y-6">
        <div className="space-y-8">
          <h1 className="font-[600] text-[16px] lg:text-[20px] leading-[#100] text-[#181818] ">
            FAQs
          </h1>

          <div className="flex space-x-4 items-center ">
            <input type="checkbox" name="" id="" />
            <span className="text-[14px] font-[400] lg:text-[16px] ">
              Select All
            </span>
          </div>

          <FaqTabContent />

          <Button
            variant="red"
            icon="/assets/icons/white-delete.svg"
            full
            title="CONTINUE"
            onClick={() => setShowConfirmation(true)}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="w-full lg:min-w-[800px] p-[40px] space-y-10 rounded-[20px] ">
            <div className="space-y-4">
              <DialogHeader className="text-start">
                <DialogTitle className="lg:text-xl text-[16px] font-[500] text-[#181818]">
                  Delete FAQ?
                </DialogTitle>
              </DialogHeader>

              <DialogDescription className="lg:text-[16px] text-[14px] text-[#9B9EA4] font-[400]">
                Before you go ahead, be reminded that if you proceed you will
                automatically lose both the question and the answer under this
                FAQ
              </DialogDescription>
            </div>

            <div className="flex justify-center lg:space-x-10 space-y-6 flex-col lg:flex-row lg:space-y-0 space-x-0 ">
              <Button
                title="DELETE"
                variant="red"
                onClick={() => setShowConfirmation(false)}
                full
              />
              <Button
                title="CANCEL"
                variant="outline-dark"
                onClick={handleConfirm}
                full
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="w-full lg:min-w-[800px] p-[40px]">
            <div className="space-y-[40px] flex flex-col items-center">
              <DialogHeader className="text-center">
                <DialogTitle className="text-xl font-[500] text-[#181818]">
                  FAQ Added Successfully
                </DialogTitle>
              </DialogHeader>

              <img
                src="/assets/icons/success-big.svg"
                alt="Success"
                className="w-20 h-20 my-6"
              />

              <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
                You have successfully added a new FAQ for customers.
              </DialogDescription>

              <Button
                title="GO BACK TO DASHBOARD"
                variant="blue"
                full
                onClick={() => setShowSuccess(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

type FaqTabContentProps = {
  data?: Record<string, { question: string; answer: string }[]>;
  loading: boolean;
};

const FaqTabContent: React.FC = () => {
  const faqData = {
    flights: [
      {
        question: "How do I reset my password?",
        answer:
          "Click on 'Forgot Password' at the login page and follow the instructions.",
      },
      {
        question: "What documents are required for car rental?",
        answer:
          "You need a valid driver's license and a credit card in your name.",
      },
      {
        question: "Is insurance included in the rental?",
        answer:
          "Basic insurance is included, but additional coverage can be purchased.",
      },
      {
        question: "What is the refund policy?",
        answer:
          "Refunds are processed within 5-7 business days after approval.",
      },
    ],
    hotels: [
      {
        question: "How do I cancel a reservation?",
        answer:
          "Go to 'My Bookings' and select the reservation you want to cancel.",
      },
      {
        question: "Are pets allowed in the hotel?",
        answer:
          "Pet policies vary by hotel. Check the hotel's policy for details.",
      },
    ],
    carRentals: [
      {
        question: "What documents are required for car rental?",
        answer:
          "You need a valid driver's license and a credit card in your name.",
      },
      {
        question: "Is insurance included in the rental?",
        answer:
          "Basic insurance is included, but additional coverage can be purchased.",
      },
    ],
    account: [
      {
        question: "How do I update my account information?",
        answer:
          "Go to the 'Profile' section in your account settings and update your information.",
      },
      {
        question: "How do I change my password?",
        answer:
          "Go to the 'Security' section in your account settings and follow the steps to change your password.",
      },
    ],
  };

  return (
    <div className="space-y-10 py-4 px-6 rounded-[8px]">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-[20px] text-[#181818] leading-[100%]">
            FAQs
          </h1>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="w-full bg-transparent border-[#CDCED1] border-b-[1px] pb-[6px] rounded-none">
            {Object.keys(faqData).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#D72638]"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(faqData).map(([category, faqs]) => (
            <TabsContent key={category} value={category}>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`${category}-faq-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          className="ml-auto w-5 h-5 accent-blue-500 cursor-pointer"
                        />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
