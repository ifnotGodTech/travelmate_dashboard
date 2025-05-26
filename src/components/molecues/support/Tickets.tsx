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
import {
  TableDropdown,
  TicketDetailsDialog,
  ViewingChatModal,
} from "./Reuseables";
import { useGetAllTickets, useGetTicket } from "@/hooks/api/ticket";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TicketTabContent: React.FC<any> = ({ searchTerm }) => {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { tickets, loadNext, loading, error, nextPageUrl, setFilters } =
    useGetAllTickets();

  const { ticket: ticketDetails, loadingTicket } = useGetTicket({
    TicketId: ticketId as string,
    initalFetch: !!ticketId,
    successCallback: (message) => {
      console.log(message);
    },
    errorCallback: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    const filters: any = {};
    filters.status = statusFilter === "all" ? "" : statusFilter;
    if (searchTerm) {
      filters.search = searchTerm;
    }
    setFilters(filters);
  }, [statusFilter, searchTerm, setFilters]);

  const handleTabChange = (value: string) => {
    setStatusFilter(value);
    setFilters({ status: value === "all" ? "" : value });
  };

  const handleViewDetails = (ticket: any) => {
    setSelectedTicket(ticket);
    setTicketId(ticket.id);
    setIsDetailsDialogOpen(true);
  };

  const handleDetailsDialogClose = () => {
    setIsDetailsDialogOpen(false);
    setSelectedTicket(null);
    setTicketId(null);
  };

  const handleViewMessage = (ticket: any) => {
    setSelectedTicket(ticket);
    setTicketId(ticket.id);
    setIsChatModalOpen(true);
  };

  const handleChatModalClose = () => {
    setIsChatModalOpen(false);
    setSelectedTicket(null);
    setTicketId(null);
  };

  const styling =
    "px-[24px] h-full data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[#181818] flex items-center justify-center cursor-pointer bg-transparent shadow-none rounded-none";

  return (
    <>
      <div className="space-y-[32px]">
        <div className="flex justify-between items-center mb-4 px-[16px]">
          <h2 className="lg:text-[20px] text-[14px] text-[#181818] font-[500] lg:font-[600]">
            Tickets
          </h2>
        </div>

        <Tabs
          value={statusFilter}
          className="space-y-[40px]"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full flex justify-center items-center border-b-[1px] border-[#ACAEB3] bg-transparent shadow-none rounded-none pb-0">
            <TabsTrigger value="all" className={styling}>
              All
            </TabsTrigger>
            <TabsTrigger value="new" className={styling}>
              New
            </TabsTrigger>
            <TabsTrigger value="in_progress" className={styling}>
              In Progress
            </TabsTrigger>
            <TabsTrigger value="resolved" className={styling}>
              Resolved
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <Skeleton />
          ) : (
            <>
              {tickets.length === 0 ? (
                <div className="h-[40px] flex justify-center items-center">
                  <p className="ttext-[20px] font-[500] text-[#181818]">
                    No data found
                  </p>
                </div>
              ) : (
                <div className="lg:px-[24px] px-[4px]">
                  {/* Wrap table in scrollable container */}
                  <div className="overflow-x-auto">
                    <Table className="border-none border-collapse min-w-[600px]">
                      <TableHeader>
                        <TableRow className="items-center border-none hover:bg-none">
                          <TableCell className="font-semibold border-none min-w-[200px] whitespace-nowrap">
                            Subject
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
                        {tickets.map((ticket, index) => (
                          <TableRow
                            key={`${ticket.id}-${index}`}
                            className="items-center cursor-pointer border-none"
                          >
                            <TableCell className="border-none min-w-[200px] whitespace-nowrap">
                              <div className="flex items-center space-x-4">
                                <img
                                  src="/assets/icons/flight_cancellation.svg"
                                  alt="icon"
                                  className="w-[30px] lg:w-[40px]"
                                />
                                <div className="space-y-[8px]">
                                  <h2 className="font-medium text-[#181818] text-[14px] lg:text-[16px]">
                                    {ticket.title}
                                  </h2>
                                  <p className="text-[#9B9EA4] text-[12px]">
                                    {ticket.ticket_id} • {ticket.category}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="border-none min-w-[180px] whitespace-nowrap">
                              <div className="space-y-2">
                                <p className="text-[#181818] text-[14px] font-[500] capitalize">
                                  {ticket.user.first_name || "---"}{" "}
                                  {ticket.user.last_name || "---"}
                                </p>
                                <p className="text-[#9B9EA4] text-[12px]">
                                  {ticket.user.email || "---"}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="table-cell border-none whitespace-nowrap">
                              <div className="space-y-2">
                                <p className="text-[#181818] text-[14px] font-[500]">
                                  {format(
                                    addDays(new Date(ticket.created_at), 2),
                                    "dd/MM/yyyy"
                                  )}
                                </p>
                                <p className="text-[#9B9EA4] text-[12px]">
                                  <span>
                                    {getRelativeTime(ticket.created_at)}
                                  </span>
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="border-none whitespace-nowrap">
                              <span
                                className={`px-4 py-3 rounded-md text-[10px] lg:text-[12px] ${
                                  ticket.status === "new"
                                    ? "bg-[#CCD8E8] text-[#181818]"
                                    : ticket.status === "in_progress"
                                    ? "bg-[#EFB60880]/50  text-[#181818]"
                                    : ticket.status === "resolved"
                                    ? "bg-[#2D9C5E80]/50  text-[#181818]"
                                    : "bg-gray-100 text-gray-600" // fallback for other/unknown statuses
                                }`}
                              >
                                {ticket.status.replace("_", " ").toUpperCase()}
                              </span>
                            </TableCell>
                            <TableCell className="border-none whitespace-nowrap">
                              <TableDropdown
                                parentWidth={180}
                                onViewDetails={() => handleViewDetails(ticket)}
                                onViewMessage={() => handleViewMessage(ticket)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Loading Spinner at the Bottom */}
                </div>
              )}
            </>
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

      <TicketDetailsDialog
        selectedTicket={isDetailsDialogOpen ? selectedTicket : null}
        ticketDetails={ticketDetails}
        ticketLoading={loadingTicket}
        onClose={handleDetailsDialogClose}
      />
      <ViewingChatModal
        selectedTicket={isChatModalOpen ? selectedTicket : null}
        ticketDetails={ticketDetails}
        ticketLoading={loadingTicket}
        onClose={handleChatModalClose}
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
