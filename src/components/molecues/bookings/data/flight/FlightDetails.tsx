import React from "react";
import { GridValues, FlexValues, Policy, LocationTag } from "../../reuseables";

const FlightDetails = () => {
  return (
    <div className="space-y-[24px]">
      <BookingDetails />
      <GridDetails />
    </div>
  );
};

const BookingDetails = () => {
  return (
    <div className="space-y-[24px]">
      <div className="bg-[#fff] p-[24px] space-y-[20px] rounded-[12px] w-full ">
        <h1 className="font-[600] text-[20px] text-[#181818] ">
          Confirmation Details
        </h1>

        <div className="flex justify-between items-center">
          <GridValues title="Booking Refrence" value="1111" />
          <GridValues title="E- ticket Number" value="123456" />
          <GridValues title="Booked On" value="25/05/2025" />

          <div className="flex flex-col items-start space-y-3">
            <h1 className="text-[16px] font-[500] text-[#4E4F52] whitespace-nowrap">
              Payment Status{" "}
            </h1>
            <div className="border-[1px] border-[#2D9C5E] rounded-[12px] text-[#2D9C5E] text-[14px] font-[400] bg-[#2D9C5E1A] px-[20px] py-[10px] whitespace-nowrap flex-shrink-0">
              Paid
            </div>
          </div>
          <div className="flex flex-col items-start space-y-3">
            <h1 className="text-[16px] font-[500] text-[#4E4F52] whitespace-nowrap">
              Booking Status
            </h1>
            <div className="border-[1px] border-[#2D9C5E] rounded-[12px] text-[#2D9C5E] text-[14px] font-[400] bg-[#2D9C5E1A] px-[20px] py-[10px] whitespace-nowrap flex-shrink-0">
              Confirmed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GridDetails = () => {
  const List = [
    "Full refund if cancelled 4+ hours before scheduled pickup time. Processing fee of ₦3500 applies.",
    "25% cancellation fee applies when cancelled between 2-4 hours before pickup.",
    "50% cancellation fee applies when cancelled less than 2 hours before pickup.",
    "No refund for no-shows or same-hour cancellations.",
  ];
  return (
    <div className="grid grid-cols-2 gap-[24px]">
      <div className="space-y-6">
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Passenger Details ( 1 Passenger)
            </h1>
            <div className="space-y-4">
              <FlexValues
                title="Pick Up Location"
                value="Murtala Mohammed Airport"
              />
              <FlexValues title="Title" value="Mr" />
              <FlexValues title="Name" value="John Doe" />
              <FlexValues title="Date Of Birth" value="01/01/1990" />
              <FlexValues title="Gender" value="Male" />
              <FlexValues title="Passport Number" value="111111" />
              <FlexValues title="Nationality" value="Nigerian" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Contact Information
            </h1>
            <div className="space-y-4">
              <FlexValues title="Email Address" value="Johndoe@gmail.com" />
              <FlexValues title="Phone Number" value="09012345678" />
            </div>
          </div>
        </div>

        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Transaction Details
            </h1>
            <div className="space-y-4">
              <FlexValues title="Payment Method" value="Paypal" />
              <FlexValues title="Transaction ID" value="TXN789456123" />
            </div>
          </div>
        </div>
        <Transaction />
        <Policy List={List} />
      </div>

      <div className="space-y-6">
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Departure Flight Details
            </h1>
            <LocationTag />
            <div className="space-y-4">
              <FlexValues title="Airline" value="Air Peace Limited" />
              <FlexValues title="Flight Number" value="2345" />
              <FlexValues title="Class" value="Economy" />
              <FlexValues title="Date" value="26/05/2025" />
              <FlexValues title="Air Craft Type" value="B737-700" />
              <FlexValues title="Duration" value="2 Hrs" />
              <FlexValues title="Baggage" value="1 Carry on +23 checked Bag" />
              <FlexValues title="Stops" value="2 Stops" />
            </div>
          </div>
        </div>
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Return Flight Details
            </h1>
            <LocationTag />
            <div className="space-y-4">
              <FlexValues title="Airline" value="Air Peace Limited" />
              <FlexValues title="Flight Number" value="2345" />
              <FlexValues title="Class" value="Economy" />
              <FlexValues title="Date" value="26/05/2025" />
              <FlexValues title="Air Craft Type" value="B737-700" />
              <FlexValues title="Duration" value="2 Hrs" />
              <FlexValues title="Baggage" value="1 Carry on +23 checked Bag" />
              <FlexValues title="Stops" value="2 Stops" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Transaction = () => {
  return (
    <div className="bg-[#fff] p-[24px] rounded-[12px]">
      <h1 className="text-[20px] font-[600] text-[#181818] mb-[16px]">
        Payment Details
      </h1>
      <div className="space-y-4">
        <FlexValues title="Round Trip (1 Passenger)" value="₦10,000" />
        <FlexValues title="Taxes & Fees" value="₦10,000" />
        <div className="borde-[1px] border-[#ACAEB3] border-b "></div>
        <FlexValues title="Total" value="₦80,000" />
      </div>
    </div>
  );
};

export default FlightDetails;
