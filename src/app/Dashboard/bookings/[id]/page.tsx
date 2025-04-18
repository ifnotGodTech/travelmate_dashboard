"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { SingleMockBookings } from "@/components/data";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import Button from "@/components/reuseables/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  SingleMockBookings;
  const router = useRouter();
  const { id } = params;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  const booking = SingleMockBookings[id];

  if (!booking) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Booking not found</p>
      </div>
    );
  }

  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancellation = () => {
    setShowCancelModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push("/bookings");
  };

  return (
    <ContentWrapper>
      <div className="bg-[#fff] lg:rounded-[20px] ">
        <div className="p-[16px] lg:p-[40px] space-y-[24px]">
          <div className="space-y-2">
            <p className="lg:hidden text-[#181818] text-[14px] font-[400]"></p>
            <p className="lg:text-[500] lg:text-[16px] text-[#181818] text-[14px] font-[400]">
              Thursday 13th of Feb., 2025 | 08:43AM
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="lg:text-[500] lg:text-[20px] text-[#181818] text-[16px] font-[600]">
              Traveler
            </h2>
            <div className="space-y-6">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src="/assets/images/profile-image.svg"
                  alt="User avatar"
                  width={64}
                  height={64}
                  className="object-cover rounded-full"
                />
              </div>
              <div className="space-y-6 w-full">
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      First Name
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                      {booking.details.firstName}
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
                    <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                      {booking.details.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      Residential Address
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                      {booking.details.address}
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
                    <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                      {booking.details.email}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      Email
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                      {booking.details.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="lg:text-[500] lg:text-[20px] text-[#181818] text-[16px] font-[600]">
              Travel Information
            </h2>
            <div className="space-y-4">
              <h3 className="font-[500] text-[16px] ">
                Departure Flight Details
              </h3>
              <p className="font-[500] text-[10px]  text-[#181818] ">
                {booking.details.flight.airline}
              </p>

              <div className="flex items-center gap-4 my-4 w-[329px] ">
                <div>
                  <p className="font-medium">
                    {booking.details.flight.departureTime}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.details.flight.departure}
                  </p>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="h-0.5 w-full bg-gray-300 relative">
                    <div className="absolute top-1/2 left-0 w-2 h-2 bg-gray-700 rounded-full -translate-y-1/2"></div>
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-gray-700 rounded-full -translate-y-1/2"></div>
                  </div>
                </div>
                <div>
                  <p className="font-medium">
                    {booking.details.flight.arrivalTime}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.details.flight.arrival}
                  </p>
                </div>
              </div>

              <div className="space-y-6 w-[329px] ">
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      Class
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end ">
                      {booking.details.flight.class}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      E- Ticket Number
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end ">
                      {booking.details.flight.ticketNumber}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      Date
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end  ">
                      {booking.details.flight.date}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      Flight Number
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end ">
                      {booking.details.flight.flightNumber}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      Duration
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end ">
                      {booking.details.flight.duration}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                      Aircraft Type
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end ">
                      {booking.details.flight.aircraft}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 w-[329px]  ">
              <h2 className="font-[500] text-[16px] ">Price Details</h2>
              <div className="space-y-4">
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#4E4F52] ">
                      Departure Flight
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end ">
                      {booking.details.flight.price.base}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#4E4F52] ">
                      Taxes(15%)
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end ">
                      {booking.details.flight.price.taxes}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
                      Total
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] font-[400]  leading-[100%] tracking-[0%] text-[#181818] text-end ">
                      {booking.details.flight.price.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 space-x-0 ">
              <Button
                variant="light-blue"
                title="UPDATE TRAVEL INFORMATION"
                size="14"
                icon="/assets/icons/mode_edit.svg"
                onClick={() => router.push(`/Dashboard/bookings/${booking.id}/edit`)}
              />
              <Button
                variant="orange"
                icon="/assets/icons/orange-icon.svg"
                title="PROCESS CANCELLATION"
                onClick={handleCancelBooking}
              />
            </div>
          </div>

          {/* Cancel Booking Modal */}
          <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
            <DialogContent className="w-full lg:min-w-[800px] lg:p-[40px] px-[20px] py-[40px]">
              <DialogHeader>
                <DialogTitle>
                  <h1 className="text-[16px] font-[600] lg:text-[20px] lg:font-[500] text-[#181818]">
                    Cancel user's booking?
                  </h1>
                </DialogTitle>
              </DialogHeader>
              <p className="text-[14px] font-[400] lg:text-[16px] text-[#9B9EA4] ">
                Once you confirm cancellation, a confirmation message will be
                sent to the user about the status of their booking.
              </p>
              <div className="space-y-4">
                <label className="block text-[14px] lg:font-[600] lg:text-[16px] font-[500] text-[#181818] ">
                  Reason for cancellation (Optional)
                </label>
                <textarea
                  className="w-full p-4 rounded-[8px] outline-none bg-[#F5F5F5] placeholder:text-[12px] placeholder:leading-[18px] placeholder:font-[400] placeholder:lg:text-[16px] placeholder:text-[#9B9EA4] text-[#181818] font-[400] "
                  placeholder="Write here"
                  rows={4}
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-10 space-y-10 lg:space-y-0">
                <Button
                  variant="blue"
                  title="PROCEED"
                  full
                  onClick={handleConfirmCancellation}
                />
                <Button
                  variant="outline"
                  title="CANCEL"
                  onClick={() => setShowCancelModal(false)}
                  full
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Success Modal */}
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="w-full lg:min-w-[800px] p-[40px] ">
              <div className="space-y-[40px] flex flex-col items-center  ">
                <DialogHeader className="text-center">
                  <DialogTitle className="text-xl font-[500] text-[#181818]">
                    Issue Escalated Successfully
                  </DialogTitle>
                </DialogHeader>

                <img
                  src="/assets/icons/success-big.svg"
                  alt="Success"
                  className="w-20 h-20 my-6"
                />

                <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
                  The issue has been escalated and is now under review.
                </DialogDescription>

                <Button
                  title="GO BACK TO DASHBOARD"
                  variant="blue"
                  full
                  onClick={() => router.push("/Dashboard/bookings")}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ContentWrapper>
  );
}
