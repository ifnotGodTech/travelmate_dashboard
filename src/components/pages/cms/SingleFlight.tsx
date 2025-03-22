import React from "react";
import Button from "@/components/reuseables/Button";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import { AirlineDetails } from "@/components/molecues/cms/AirlineDetails";

type Props = {};

const SingleFlight = (props: Props) => {
  return (
    <ContentWrapper>
      <div className="bg-[#fff]">
        <AirlineDetails />

        <div className="flex flex-col-reverse lg:flex-row px-[40px] gap-[24px] py-[20px]">
          <Button
            title="Delete details"
            variant="light-red"
            weight="500"
            icon="/assets/icons/delete.svg"
            iconPosition="left"
          />
          <Button
            title="UPDATE AGENCY FEE"
            variant="light-blue"
            weight="500"
            icon="/assets/icons/mode_edit.svg"
            iconPosition="left"
          />
        </div>
      </div>
    </ContentWrapper>
  );
};



export default SingleFlight;
