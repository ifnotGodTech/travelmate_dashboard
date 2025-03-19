"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Button from "@/components/reuseables/Button";

type Chat = {
  name: string;
  message: string;
  time: string;
  status: string;
  date: string;
  number: number;
};

type TabData = {
  ticket: string[];
  chat: Chat[];
  faq: Record<string, { question: string; answer: string }[]>;
  all: string[];
};

type ChatTabContentProps = {
  data: Chat[];
  loading: boolean;
};

type TicketTabContentProps = { data: string[]; loading: boolean };
type FaqTabContentProps = {
  data?: Record<string, { question: string; answer: string }[]>;
  loading: boolean;
};

const TicketTable: React.FC = () => {
  const [tabData, setTabData] = useState<TabData>({
    ticket: [],
    chat: [],
    faq: {},
    all: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (tab: keyof TabData) => {
    setLoading(true);
    try {
      if (tab === "chat") {
        const chatData: Chat[] = Array(6).fill({
          name: "John Doe",
          message: "Hello, I need help with my account.",
          time: "2:30 PM",
          status: "Online",
          date: "15 March, 2025",
          number: 2,
        });
        setTabData((prevData) => ({ ...prevData, chat: chatData }));
      } else if (tab === "all") {
        const allData = [
          ...Array(6).fill(`ticket data`),
          ...Array(6).fill(`chat data`),
          ...Array(6).fill(`faq data`),
        ];
        setTabData((prevData) => ({ ...prevData, all: allData }));
      } else {
        const response = await new Promise<{ data: string[] }>((resolve) =>
          setTimeout(
            () => resolve({ data: Array(6).fill(`${tab} data`) }),
            1000
          )
        );
        setTabData((prevData) => ({ ...prevData, [tab]: response.data }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    if (!tabData[tab as keyof TabData].length) {
      fetchData(tab as keyof TabData);
    }
  };

  return (
    <div className="">
      {" "}
      <Tabs
        defaultValue="ticket"
        className="space-y-[40px]"
        onValueChange={handleTabChange}
      >
        {" "}
        <TabsList className="lg:w-[436px] w-full bg-[#EBECED] rounded-[12px] flex justify-between items-center h-[64px]">
          {" "}
          <TabsTrigger
            value="all"
            className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
          >
            {" "}
            All{" "}
          </TabsTrigger>{" "}
          <TabsTrigger
            value="ticket"
            className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
          >
            {" "}
            Ticket{" "}
          </TabsTrigger>{" "}
          <TabsTrigger
            value="chat"
            className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
          >
            {" "}
            Chat{" "}
          </TabsTrigger>{" "}
          <TabsTrigger
            value="faq"
            className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
          >
            {" "}
            FAQ{" "}
          </TabsTrigger>{" "}
        </TabsList>{" "}
        <div className="bg-[#FFFFFF] py-[16px] rounded-[8px] ">
          {" "}
          <TabsContent value="ticket">
            {" "}
            <TicketTabContent data={tabData.ticket} loading={loading} />{" "}
          </TabsContent>{" "}
          <TabsContent value="all">
            {" "}
            <TicketTabContent data={tabData.ticket} loading={loading} />{" "}
          </TabsContent>{" "}
          <TabsContent value="chat">
            {" "}
            <ChatTabContent data={tabData.chat} loading={loading} />{" "}
          </TabsContent>{" "}
          <TabsContent value="faq">
            {" "}
            <FaqTabContent data={tabData.faq} loading={loading} />{" "}
          </TabsContent>{" "}
        </div>{" "}
      </Tabs>{" "}
    </div>
  );
};

const ChatTabContent: React.FC<ChatTabContentProps> = ({ data, loading }) => {
  const chats: Chat[] = Array(4).fill({
    name: "Kemi Adeoti",
    message: "Can you help me with my recent order?",
    time: "4:44 PM",
    status: "Online",
    date: "16 February, 2025",
    number: 3,
  });

  return (
    <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="w-full overflow-hidden flex justify-center items-center">
          <div className="flex w-full h-full py-[16px] px-[24px] bg-[#FFFFFF]">
            <div className="overflow-y-auto transition-all duration-300 space-y-[32px] w-full">
              <div className="flex justify-between">
                <h2 className="font-[500] lg:font-[600] text-[14px] lg:text-[20px] text-[#181818]">
                  Chats
                </h2>
                <img src="/assets/icons/expand.svg" alt="" className="cursor-pointer hidden lg:block " />
              </div>
              <div className="w-full h-[2px] bg-[#EBECED]"></div>
              <ul>
                {chats.map((chat, index) => (
                  <li
                    key={index}
                    className="p-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex space-x-4 items-center">
                      <img src="/assets/icons/Message-icon.svg" alt="Icon" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="space-y-[8px]">
                            <p className="font-[400] text-[14px] lg:font-[500] lg:text-[16px] text-[#181818]">
                              {chat.name}
                            </p>
                            <p className="text-[#67696D] text-[10px] leading-[100%] lg:text-[12px] lg:leading-[18px]">
                              {chat.message}
                            </p>
                          </div>
                          <div className="flex items-center lg:space-x-[40px] space-x-0 flex-col lg:flex-row space-y-[8px] lg:space-y-0 ">
                            <p className="text-[12px] lg:text-[14px] text-[#181818]">
                              {chat.date}
                            </p>
                            <p className="text-[12px] lg:text-[14px] text-[#181818]">
                              {chat.time}
                            </p>
                            <div className="bg-[#023E8A] rounded-full h-[30px] w-[30px] flex justify-center items-center">
                              <span className="text-white">{chat.number}</span>
                            </div>
                            <img
                              src="/assets/icons/arrow-down.svg"
                              alt="More"
                              className="w-4 h-4 -rotate-90"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TicketTabContent: React.FC<TicketTabContentProps> = ({
  data,
  loading,
}) => {
  return (
    <div className="space-y-[32px]">
      <div className="flex justify-between items-center mb-4 px-[16px] ">
        <h2 className="text-[20px] text-[#181818] font-semibold">
          Support Messages
        </h2>
        <Button
          variant="orange-deep"
          title="Escalated Issues"
          responsiveHideText
          icon="/assets/icons/e-warning.svg"
        />
      </div>

      <div className="bg-[#EBECED] w-full h-[3px]"></div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="lg:px-[24px] px-[16px] ">
          <Table className=" border-0">
            <TableHeader className="border-0 ">
              <TableRow className="border-0">
                <TableCell className="font-semibold">Subject</TableCell>
                <TableCell className="font-semibold hidden lg:block  ">
                  Priority
                </TableCell>
                <TableCell className="font-semibold">Status</TableCell>
                <TableCell className="font-semibold">Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="space-y-[32px]">
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-0 cursor-pointer py-[16px] space-x-[8px ] lg:space-x-[inherit] "
                >
                  <TableCell>
                    <div className="flex w-[240px] space-x-[16px]">
                      <img
                        src="/assets/icons/flight_cancellation.svg"
                        alt=""
                        className="w-[30px] lg:w-[40px] "
                      />
                      <div className="space-y-[8px]">
                        <h2 className="font-[400] lg:font-[500] text-[14px] lg:text-[16px] text-[#181818] leading-[100%] ">
                          Flight Cancellation
                        </h2>
                        <p className="font-[400] lg:font-[500] lg:text-[16px] text-[12px] text-[#9B9EA4] leading-[18px] lg:leading-[100%] ">
                          Kemi Adeoti •{" "}
                          <span className="font-[400] text-[10px] lg:text-[12px] text-[#9B9EA4] leading-[100%] lg:leading-[18px] ">
                            {" "}
                            10 mins ago{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:block ">
                    <span
                      className={` w-[56px] lg:w-[86px] h-[28px] lg:h-[44px] flex justify-center items-center  text-[10px] lg:text-[12px] font-[400] lg:font-[500]  ${
                        index < 3
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {index < 3 ? "High" : "Low"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`w-[56px] lg:w-[86px] h-[28px] lg:h-[44px] flex justify-center items-center  text-[10px] lg:text-[12px] font-[400] lg:font-[500]  ${
                        index < 3
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {index < 3 ? "New" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="blue"
                      title="View"
                      icon="/assets/icons/eye.svg"
                      size="14"
                      responsiveHideText={true}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex justify-center mt-4 ">
        <div className="bg-[#EBECED] cursor-pointer rounded-[8px] space-x-[16px] px-[40px] py-[16px] flex  items-center ">
          <p className="font-[400] text-[14px] text-[#023E8A] leading-[100%] ">
            Load more
          </p>
          <img src="/assets/icons/loader.svg" alt="" className="" />
        </div>
      </div>
    </div>
  );
};

const FaqTabContent: React.FC<FaqTabContentProps> = ({ data, loading }) => {
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
              <div className="hidden lg:block">
                <Button
                  variant="orange-deep"
                  title="Add New"
                  icon="/assets/icons/white-plus.svg"
                />
              </div>
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
            </Tabs>
          </div>
          <div className="lg:px-10 flex justify-between lg:space-x-6 space-y-6 lg:space-y-0 flex-col lg:flex-row ">
            <Button
              variant="orange"
              title="EDIT FAQ"
              icon="/assets/icons/orange-pen.svg"
              full
            />
            <Button
              variant="light-blue"
              title="ADD NEW FAQ"
              icon="/assets/icons/blue-plus.svg"
              full
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default TicketTable;
