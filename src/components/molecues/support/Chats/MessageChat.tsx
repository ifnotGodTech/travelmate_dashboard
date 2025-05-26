"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { formatDistanceToNow, parseISO, format, addDays } from "date-fns";
import { useGetAllChat, useGetChat } from "@/hooks/api/chat";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatDetailsDialog, ChatTableDropdown } from "./ChatReuseables";

export const MessageTabContent: React.FC<any> = ({
  selectedOption,
  searchTerm,
}) => {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>(
    selectedOption || ""
  );

  const {
    chats,
    loadNext,
    loading,
    error: chatError,
    nextPageUrl,
    setFilters,
  } = useGetAllChat();

  const { chat: chatDetails, loadingChat } = useGetChat({
    ChatId: ticketId as string,
    initialFetch: !!ticketId,
    successCallback: (message) => {
      console.log(message);
    },
    errorCallback: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    const filters: any = {};
    if (selectedOption) {
      filters.status = selectedOption === "all" ? "" : selectedOption;
      setStatusFilter(selectedOption === "all" ? "" : selectedOption);
    }
    if (searchTerm) {
      filters.search = searchTerm;
    }
    setFilters(filters);
  }, [selectedOption, searchTerm, setFilters]);

  const handleViewDetails = (chat: any) => {
    setSelectedTicket(chat);
    setTicketId(chat.id);
    setIsDetailsDialogOpen(true);
  };

  const handleDetailsDialogClose = () => {
    setIsDetailsDialogOpen(false);
    setSelectedTicket(null);
    setTicketId(null);
  };

  const handleTabChange = (value: string) => {
    setStatusFilter(value === "all" ? "" : value);
    setFilters({ status: value === "all" ? "" : value });
  };

  const styling =
    "px-[24px] h-full data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[#181818] flex items-center justify-center cursor-pointer bg-transparent shadow-none rounded-none";

  return (
    <>
      <div className="space-y-[32px]">
        <div className="flex justify-between items-center mb-4 px-[16px]">
          <h2 className="lg:text-[20px] text-[14px] text-[#181818] font-[500] lg:font-[600]">
            Chats
          </h2>
        </div>

        <Tabs
          defaultValue="all"
          className="space-y-[40px]"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full flex justify-center items-center border-b-[1px] border-[#ACAEB3] bg-transparent shadow-none rounded-none pb-0">
            <TabsTrigger value="all" className={styling}>
              All
            </TabsTrigger>
            <TabsTrigger value="WAITING" className={styling}>
              Waiting
            </TabsTrigger>
            <TabsTrigger value="ACTIVE" className={styling}>
              Active
            </TabsTrigger>
            <TabsTrigger value="CLOSED" className={styling}>
              Closed
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <Skeleton />
          ) : (
            <div className="lg:px-[24px] px-[4px]">
              <div className="overflow-x-auto">
                <Table className="border-none border-collapse min-w-[600px]">
                  <TableHeader>
                    <TableRow className="items-center border-none hover:bg-none">
                      <TableCell className="font-semibold border-none min-w-[200px] whitespace-nowrap">
                        Message Preview
                      </TableCell>
                      <TableCell className="font-semibold border-none min-w-[180px] whitespace-nowrap">
                        Customer
                      </TableCell>
                      <TableCell className="font-semibold border-none whitespace-nowrap">
                        Created at
                      </TableCell>
                      <TableCell className="font-semibold border-none whitespace-nowrap">
                        Status
                      </TableCell>
                      <TableCell className="font-semibold border-none whitespace-nowrap">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chats.map((chat, index) => (
                      <TableRow
                        key={`${chat.id}-${index}`}
                        className="items-center cursor-pointer border-none"
                      >
                        <TableCell className="border-none min-w-[200px] whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <div className="space-y-[8px]">
                              <h2 className="font-medium text-[#181818] text-[14px] lg:text-[16px]">
                                {chat.title}
                              </h2>
                              <p className="text-[#9B9EA4] text-[12px]">
                                {"Chat--00" + chat.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="border-none min-w-[180px] whitespace-nowrap">
                          <div className="space-y-2">
                            <p className="text-[#181818] text-[14px] font-[500] capitalize">
                              {chat.user_info.first_name || "---"}{" "}
                              {chat.user_info.last_name || "---"}
                            </p>
                            <p className="text-[#9B9EA4] text-[12px]">
                              {chat.user_info.email || "---"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="table-cell border-none whitespace-nowrap">
                          <div className="space-y-2">
                            <p className="text-[#181818] text-[14px] font-[500]">
                              {format(
                                addDays(new Date(chat.created_at), 2),
                                "dd/MM/yyyy"
                              )}
                            </p>
                            <p className="text-[#9B9EA4] text-[12px]">
                              <span>{getRelativeTime(chat.created_at)}</span>
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="border-none whitespace-nowrap">
                          <span
                            className={`px-4 py-3 rounded-md text-[10px] lg:text-[12px] ${
                              chat.priority === "pending"
                                ? "bg-green-100 text-green-600"
                                : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            {chat.status}
                          </span>
                        </TableCell>
                        <TableCell className="border-none whitespace-nowrap">
                          <ChatTableDropdown
                            parentWidth={180}
                            onViewDetails={() => {}}
                            onViewMessage={() => handleViewDetails(chat)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {nextPageUrl && !loading && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-[#EBECED] cursor-pointer rounded-[8px] px-[40px] py-[16px] flex items-center"
                onClick={loadNext}
              >
                <p className="text-[#023E8A] text-[14px]">Load more</p>
              </button>
            </div>
          )}
        </Tabs>
      </div>

      <ChatDetailsDialog
        selectedTicket={isDetailsDialogOpen ? selectedTicket : null}
        chatDetails={chatDetails}
        chatLoading={loadingChat}
        onClose={handleDetailsDialogClose}
      />
    </>
  );
};

export function getRelativeTime(timestamp: string): string {
  const date = parseISO(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}

const Skeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full space-y-[12px] mt-5 px-4 ">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-between items-center w-full"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="bg-gray-300 animate-pulse h-[50px] w-[24%] rounded-[12px]"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};
