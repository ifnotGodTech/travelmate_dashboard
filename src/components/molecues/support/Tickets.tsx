"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { formatDistanceToNow, parseISO } from "date-fns";
import Button from "@/components/reuseables/Button";
import { useGetAllTicket } from "@/hooks/api/ticket";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import { useRouter } from "next/navigation";

export const TicketTabContent: React.FC = () => {
  const router = useRouter();
  const { loading, data, nextPage, loadMore } = useGetAllTicket({});

  return (
    <div className="space-y-[32px]">
      <div className="flex justify-between items-center mb-4 px-[16px]">
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

      <div className="lg:px-[24px] px-[16px]">
        <Table>
          <TableHeader>
            <TableRow className="items-center">
              <TableCell className="font-semibold">Subject</TableCell>
              <TableCell className="font-semibold hidden lg:block">
                Priority
              </TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell className="font-semibold">Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((ticket, index) => (
              <TableRow
                key={`${ticket.id}-${index}`}
                className="items-center cursor-pointer"
                onClick={() =>
                  router.push(`/Dashboard/support/ticket/${ticket.id}`)
                }
              >
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <img
                      src="/assets/icons/flight_cancellation.svg"
                      alt="icon"
                      className="w-[30px] lg:w-[40px]"
                    />
                    <div>
                      <h2 className="font-medium text-[#181818] text-[14px] lg:text-[16px]">
                        {ticket.title}
                      </h2>
                      <p className="text-[#9B9EA4] text-[12px]">
                        {ticket.user.first_name || "---"}{" "}
                        {ticket.user.last_name || "---"} •{" "}
                        <span>{getRelativeTime(ticket.created_at)}</span>
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span
                    className={`px-4 py-3 rounded-[4px] text-[10px] lg:text-[12px] ${
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
                    className={`px-4 py-3 rounded-md text-[10px] lg:text-[12px] ${
                      index < 3
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {index < 3 ? "New" : "Pending"}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href="/Dashboard/support/ticket">
                    <Button
                      variant="blue"
                      title="View"
                      icon="/assets/icons/eye.svg"
                      size="14"
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Loading Spinner at the Bottom */}
        {loading && <Skeleton />}
      </div>
      {nextPage && !loading && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-[#EBECED] cursor-pointer rounded-[8px] px-[40px] py-[16px] flex items-center"
            onClick={loadMore}
          >
            <p className="text-[#023E8A] text-[14px]">Load more</p>
          </button>
        </div>
      )}
    </div>
  );
};

export function getRelativeTime(timestamp: string): string {
  const date = parseISO(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}

const Skeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full space-y-[12px] mt-5">
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
