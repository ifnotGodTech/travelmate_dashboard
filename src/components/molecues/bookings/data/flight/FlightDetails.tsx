"use client";
import React from "react";
import { GridValues, FlexValues, Policy, LocationTag } from "../../reuseables";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FlightDetails = ({ data }: any) => {
  return (
    <div className="space-y-[24px]">
      <BookingDetails data={data} />
      <GridDetails data={data} />
    </div>
  );
};

const BookingDetails = ({ data }: any) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const getStatusStyling = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "confirmed":
      case "paid":
        return "text-[#2D9C5E] border-[#2D9C5E] bg-[#2D9C5E1A]";
      case "cancelled":
      case "failed":
        return "text-[#E74C3C] border-[#E74C3C] bg-[#E74C3C1A]";
      case "pending":
      default:
        return "text-[#EFB608] border-[#EFB608] bg-[#EFB60833]";
    }
  };

  return (
    <div className="space-y-[24px]">
      <div className="bg-[#fff] p-[24px] space-y-[20px] rounded-[12px] w-full ">
        <h1 className="font-[600] text-[20px] text-[#181818] ">
          Confirmation Details
        </h1>

        <div className="flex justify-between items-center">
          <GridValues title="Booking Refrence" value={data.booking_reference} />
          <GridValues title="E- ticket Number" value="123456" />
          <GridValues title="Booked On" value={formatDate(data.date_booked)} />

          <div className="flex flex-col items-start space-y-3">
            <h1 className="text-[16px] font-[500] text-[#4E4F52] whitespace-nowrap">
              Payment Status{" "}
            </h1>
            <div
              className={`border rounded-[12px] text-[14px] font-[400] p-[8px] w-fit ${getStatusStyling(
                data.payment_status
              )}`}
            >
              {data.payment_status || "PENDING"}
            </div>
          </div>
          <div className="flex flex-col items-start space-y-3">
            <h1 className="text-[16px] font-[500] text-[#4E4F52] whitespace-nowrap">
              Booking Status
            </h1>
            <div
              className={`border rounded-[12px] text-[14px] font-[400] p-[8px] w-fit ${getStatusStyling(
                data.booking_status
              )}`}
            >
              {data.booking_status || "PENDING"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GridDetails = ({ data }: any) => {
  const List = [
    "Full refund if cancelled 4+ hours before scheduled pickup time. Processing fee of ₦3500 applies.",
    "25% cancellation fee applies when cancelled between 2-4 hours before pickup.",
    "50% cancellation fee applies when cancelled less than 2 hours before pickup.",
    "No refund for no-shows or same-hour cancellations.",
  ];

  // Handle toggling which passenger sections are open
  const [openPassengerIndex, setOpenPassengerIndex] = useState<number | null>(
    null
  );

  const togglePassenger = (index: number) => {
    setOpenPassengerIndex(openPassengerIndex === index ? null : index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="grid grid-cols-2 gap-[24px]">
      <div className="space-y-6">
        <div className="bg-white p-[24px] space-y-5 rounded-[12px]">
          <h1 className="text-[16px] font-semibold text-[#181818]">
            Passenger Details ({data.passenger_count}{" "}
            {data.passenger_count === 1 ? "Passenger" : "Passengers"})
          </h1>
          {/* Passenger Details */}
          {data.passengers?.map((passenger: any, index: number) => {
            const isOpen =
              openPassengerIndex === index || data.passengers.length === 1;

            return (
              <div className="">
                <div key={passenger.id} className="space-y-[22px]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => togglePassenger(index)}
                  >
                    {/* ✅ Dynamically show Adult Passenger count */}
                    <h1 className="text-[18px] font-[400] text-[#181818]">
                      Adult Passenger {index + 1}
                    </h1>

                    {data.passengers.length > 1 && (
                      <span className="text-sm text-gray-600">
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    )}
                  </div>

                  {isOpen && (
                    <div className="space-y-4">
                      <FlexValues
                        title="Pick Up Location"
                        value={data.pickup_location || "N/A"}
                      />
                      <FlexValues
                        title="Title"
                        value={passenger.title || "N/A"}
                      />
                      <FlexValues
                        title="Name"
                        value={`${passenger.first_name} ${passenger.last_name}`}
                      />
                      <FlexValues
                        title="Date Of Birth"
                        value={formatDate(passenger.dob)}
                      />
                      <FlexValues
                        title="Gender"
                        value={passenger.gender || "N/A"}
                      />
                      <FlexValues
                        title="Passport Number"
                        value={passenger.passport_number || "N/A"}
                      />
                      <FlexValues
                        title="Nationality"
                        value={passenger.nationality || "N/A"}
                      />

                      {/* Contact Information Section */}
                      <div className="pt-2">
                        <h1 className="text-[16px] font-[600] text-[#181818]">
                          Contact Information
                        </h1>
                      </div>

                      <FlexValues
                        title="Email Address"
                        value={passenger.email || "N/A"}
                      />
                      <FlexValues
                        title="Phone Number"
                        value={passenger.phone_number || "N/A"}
                      />

                      {/* Divider */}
                      <div className="border-b-[2px] border-[#E5E7EB]"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Transaction Details */}
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Transaction Details
            </h1>
            <div className="space-y-4">
              <FlexValues
                title="Payment Method"
                value={data.payment_method || "N/A"}
              />
              <FlexValues
                title="Transaction ID"
                value={data.transaction_id || "N/A"}
              />
            </div>
          </div>
        </div>

        <Transaction data={data} />
        <Policy List={List} />
      </div>

      {/* Flight Details */}
      <div className="space-y-6">
        {/* Departure Flight */}
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Departure Flight Details
            </h1>
            <LocationTag />
            <div className="space-y-4">
              <FlexValues
                title="Airline"
                value={data.departure?.airline || "N/A"}
              />
              <FlexValues
                title="Flight Number"
                value={data.departure?.flight_number || "N/A"}
              />
              <FlexValues
                title="Class"
                value={data.departure?.cabin_class || "N/A"}
              />
              <FlexValues
                title="Date"
                value={
                  data.departure?.departure_datetime
                    ? formatDate(data.departure.departure_datetime)
                    : "N/A"
                }
              />
              <FlexValues
                title="Air Craft Type"
                value={data.departure?.aircraft_type || "N/A"}
              />
              <FlexValues
                title="Duration"
                value={data.departure?.duration || "N/A"}
              />
              <FlexValues
                title="Baggage"
                value={data.departure?.baggage || "N/A"}
              />
              <FlexValues title="Stops" value={data.departure?.stops || "0"} />
            </div>
          </div>
        </div>

        {/* Return Flight */}
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Return Flight Details
            </h1>
            <LocationTag />
            <div className="space-y-4">
              <FlexValues
                title="Airline"
                value={data.return?.airline || "N/A"}
              />
              <FlexValues
                title="Flight Number"
                value={data.return?.flight_number || "N/A"}
              />
              <FlexValues
                title="Class"
                value={data.return?.cabin_class || "N/A"}
              />
              <FlexValues
                title="Date"
                value={
                  data.return?.departure_datetime
                    ? formatDate(data.return.departure_datetime)
                    : "N/A"
                }
              />
              <FlexValues
                title="Air Craft Type"
                value={data.return?.aircraft_type || "N/A"}
              />
              <FlexValues
                title="Duration"
                value={data.return?.duration || "N/A"}
              />
              <FlexValues
                title="Baggage"
                value={data.return?.baggage || "N/A"}
              />
              <FlexValues title="Stops" value={data.return?.stops || "0"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Transaction = ({ data }: any) => {
  return (
    <div className="bg-[#fff] p-[24px] rounded-[12px]">
      <h1 className="text-[20px] font-[600] text-[#181818] mb-[16px]">
        Payment Details
      </h1>
      <div className="space-y-4">
        <FlexValues
          title={`Round Trip (${data.passenger_count} ${
            data.passenger_count === 1 ? "Passenger" : "Passengers"
          })`}
          value={`₦${Number(data.total_amount).toLocaleString()}`}
        />
        <FlexValues title="Taxes & Fees" value={`₦${data.tax}` || "N/A"} />
        <div className="borde-[1px] border-[#ACAEB3] border-b "></div>
        <FlexValues title="Total" value="₦80,000" />
      </div>
    </div>
  );
};

export default FlightDetails;
