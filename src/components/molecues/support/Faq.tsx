"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Button from "@/components/reuseables/Button";
import Link from "next/link";

type FaqTabContentProps = {
  data?: Record<string, { question: string; answer: string }[]>;
  loading: boolean;
};


export const FaqTabContent: React.FC<FaqTabContentProps> = ({
  data,
  loading,
}) => {
    
  const defaultFaqData = {
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
        question: "Is insurance included in the rental?",
        answer:
          "Basic insurance is included, but additional coverage can be purchased.",
      },
    ],
    account: [
      {
        question: "What documents are required for car rental?",
        answer:
          "You need a valid driver's license and a credit card in your name.",
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
        question: "Is insurance included in the rental?",
        answer:
          "Basic insurance is included, but additional coverage can be purchased.",
      },
    ],
  };

  const faqData = {
    flights: data?.flights || defaultFaqData.flights,
    hotels: data?.hotels || defaultFaqData.hotels,
    carRentals: data?.carRentals || defaultFaqData.carRentals,
    account: data?.account || defaultFaqData.account,
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-10 py-4 px-6 rounded-[8px] ">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="font-[600] text-[20px] text-[#181818] leading-[100%]  ">
                  FAQs
                </h1>
              </div>
              <Link href={"/Dashboard/support/faq/add-faq"}>
                <div className="hidden lg:block">
                  <Button
                    variant="orange-deep"
                    title="Add New"
                    icon="/assets/icons/white-plus.svg"
                  />
                </div>
              </Link>
            </div>
            <Tabs defaultValue="flights" className="w-full ">
              <TabsList className="w-full bg-transparent border-[#CDCED1] border-b-[1px] pb-[6px] rounded-none">
                <TabsTrigger
                  value="flights"
                  className="p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
                >
                  Flights
                </TabsTrigger>
                <TabsTrigger
                  value="hotels"
                  className="p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
                >
                  Stays
                </TabsTrigger>
                <TabsTrigger
                  value="carRentals"
                  className="p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
                >
                  Car Rentals
                </TabsTrigger>
                <TabsTrigger
                  value="account"
                  className="p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
                >
                  Account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="flights">
                <Accordion type="single" collapsible>
                  {faqData.flights.map((faq, index) => (
                    <AccordionItem key={index} value={`flights-faq-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="hotels">
                <Accordion type="single" collapsible>
                  {faqData.hotels.map((faq, index) => (
                    <AccordionItem key={index} value={`hotels-faq-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="carRentals">
                <Accordion type="single" collapsible>
                  {faqData.carRentals.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`carRentals-faq-${index}`}
                    >
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              <TabsContent value="account">
                <Accordion type="single" collapsible>
                  {faqData.carRentals.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`carRentals-faq-${index}`}
                    >
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
          <div className="lg:px-10 flex justify-between lg:space-x-6 space-y-6 lg:space-y-0 flex-col lg:flex-row ">
            <Link href={"/Dashboard/support/faq/delete-faq"} className="w-full">
              <Button
                variant="light-red"
                title="DELETE FAQ"
                icon="/assets/icons/delete.svg"
                full
              />
            </Link>
            <Link href={"/Dashboard/support/faq/add-faq"} className="w-full">
              <Button
                variant="light-blue"
                title="ADD NEW FAQ"
                icon="/assets/icons/blue-plus.svg"
                full
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
