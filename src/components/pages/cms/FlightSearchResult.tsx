import React from "react";
import Button from "@/components/reuseables/Button";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import { AirlineDetails } from "@/components/molecues/cms/AirlineDetails";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {};

const FlightSearchResult = (props: Props) => {
  return (
    <ContentWrapper>
      <div className="bg-white">
        <AirlineDetails />

        <div className="flex flex-col lg:flex-row px-10 gap-6 py-5">
          <Button
            title="TRY ANOTHER SEARCH"
            variant="orange"
            weight="500"
            icon="/assets/icons/orange-search.svg"
            iconPosition="left"
          />

          <SuccessModal />
        </div>
      </div>
    </ContentWrapper>
  );
};

const SuccessModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="CONFIRM SUMMARY"
          variant="success"
          weight="500"
          icon="/assets/icons/success-check.svg"
          iconPosition="left"
        />
      </DialogTrigger>

      <DialogContent className="w-full lg:min-w-[800px] p-[40px] ">
        <div className="space-y-[40px] flex flex-col items-center  ">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-[500] text-[#181818]">
              Airline Details Successfully Added
            </DialogTitle>
          </DialogHeader>

          <img
            src="/assets/icons/success-big.svg"
            alt="Success"
            className="w-20 h-20 my-6"
          />

          <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
            You have successfully added a new airline to your catalog. You can
            proceed by specifying your agency’s added rate on each booking.
          </DialogDescription>

          <Button
            title="ADD RATE"
            variant="blue"
            icon="/assets/icons/add-icon.svg"
            iconPosition="left"
            full
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightSearchResult;
