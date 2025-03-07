import React from "react";
import Button from "@/components/reuseables/Button";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import { AirlineDetails } from "@/components/molecues/cms/AirlineDetails";
type Props = {};

const FlightSearchResult = (props: Props) => {
  return (
    <ContentWrapper>
      <div className="bg-[#fff]">
        <AirlineDetails />

        <div className="flex flex-col lg:flex-row px-[40px] gap-[24px] py-[20px]">
          <Button
            title="TRY ANOTHER SEARCH"
            variant="orange"
            weight="500"
            icon="/assets/icons/orange-search.svg"
            iconPosition="left"
          />
          <Button
            title="CONFIRM SUMMARY"
            variant="success"
            weight="500"
            icon="/assets/icons/success-check.svg"
            iconPosition="left"
          />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default FlightSearchResult;
