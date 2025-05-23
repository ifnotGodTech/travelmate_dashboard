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

export const TicketTabContent: React.FC = ({
  selectedOption,
  searchTerm,
}: any) => {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>(
    selectedOption || ""
  );

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

  // Apply filters when selectedOption or searchTerm changes
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

  // Handlers for Ticket Details Dialog
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

  // Handlers for Viewing Chat Modal
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

  // Handle Tab Change
  const handleTabChange = (value: string) => {
    setStatusFilter(value === "all" ? "" : value);
    setFilters({ status: value === "all" ? "" : value });
  };

  const styling =
    "px-[24px] h-full  data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[#181818] flex items-center justify-center cursor-pointer bg-transparent shadow-none rounded-none";

  return (
    <>
      <div className="space-y-[32px]">
        <div className="flex justify-between items-center mb-4 px-[16px]">
          <h2 className="lg:text-[20px] text-[14px] text-[#181818] font-[500] lg:font-[600]">
            Tickets
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
            <div className="lg:px-[24px] px-[16px]">
              <Table className="border-none border-collapse">
                <TableHeader>
                  <TableRow className="items-center border-none hover:bg-none">
                    <TableCell className="font-semibold border-none">
                      Subject
                    </TableCell>
                    <TableCell className="font-semibold border-none">
                      Customer
                    </TableCell>
                    <TableCell className="font-semibold border-none">
                      Created at
                    </TableCell>
                    <TableCell className="font-semibold border-none">
                      Status
                    </TableCell>
                    <TableCell className="font-semibold border-none">
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
                      <TableCell className="border-none">
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
                      <TableCell className="hidden lg:table-cell border-none">
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
                      <TableCell className="hidden lg:table-cell border-none">
                        <div className="space-y-2">
                          <p className="text-[#181818] text-[14px] font-[500]">
                            {format(
                              addDays(new Date(ticket.created_at), 2),
                              "dd/MM/yyyy"
                            )}
                          </p>
                          <p className="text-[#9B9EA4] text-[12px]">
                            <span>{getRelativeTime(ticket.created_at)}</span>
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="border-none">
                        <span
                          className={`px-4 py-3 rounded-md text-[10px] lg:text-[12px] ${
                            ticket.priority === "pending"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </TableCell>
                      <TableCell className="border-none">
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

              {/* Loading Spinner at the Bottom */}
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
