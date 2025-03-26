import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <CmsContent />
    </div>
  );
};

interface UserHistory {
  Service: string;
  Fee: string;
  Rate: string;
  Description: string;
}

const serviceData: UserHistory[] = [
  {
    Service: "Flights",
    Fee: "Set by airline",
    Rate: "N200,000",
    Description: "Fee added to airline base fare",
  },
  {
    Service: "Hotels",
    Fee: "Set by hotel",
    Rate: "N20,000",
    Description: "Fee added to airline base fare",
  },
  {
    Service: "Cars",
    Fee: "Set by company",
    Rate: "N10,000",
    Description: "Fee added to airline base fare",
  },
];

const CmsContent = () => {
  return (
    <div className="p-4">
      <div className="space-y-6">
        <h1 className="text-[20px] font-[600] text-[#181818]">Services</h1>

        <div className="rounded-[20px] space-y-[40px] p-0 lg:p-6 bg-[#fff]">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr>
                <th className="w-1/5 text-left text-[12px] lg:text-[16px] font-[600] text-[#181818] py-[16px]">
                  Service
                </th>
                <th className="w-1/5 text-left text-[12px] lg:text-[16px] font-[600] text-[#181818] py-[16px]">
                  Fee
                </th>
                <th className="w-1/5 text-left text-[12px] lg:text-[16px] font-[600] text-[#181818] py-[16px]">
                  Rate
                </th>
                <th className="w-2/5 text-left text-[12px] lg:text-[16px] font-[600] text-[#181818] py-[16px] hidden lg:table-cell">
                  Description
                </th>
                <th className="w-1/5 text-left text-[12px] lg:text-[16px] font-[600] text-[#181818] py-[16px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((item, index) => (
                <tr key={index}>
                  <td className="py-[16px]">
                    <span className="text-[12px] lg:text-[16px] font-[600] text-[#181818] text-left">
                      {item.Service}
                    </span>
                  </td>
                  <td className="py-[16px]">
                    <span className="text-[12px] lg:text-[16px] font-[400] text-[#181818] text-left">
                      {item.Fee}
                    </span>
                  </td>
                  <td className="py-[16px]">
                    <span className="text-[12px] lg:text-[16px] font-[400] text-[#181818] text-left">
                      {item.Rate}
                    </span>
                  </td>
                  <td className="py-[16px] hidden lg:table-cell">
                    <span className="text-[12px] lg:text-[16px] font-[400] text-[#181818] text-left truncate max-w-none">
                      {item.Description}
                    </span>
                  </td>
                  <td className="py-[16px]">
                    <div className="flex items-center cursor-pointer ">
                      <Link href="/Dashboard/cms/change-rate">
                        <img
                          src="/assets/icons/mode_edit.svg"
                          alt="Edit"
                          className="cursor-pointer lg:hidden "
                        />
                        <button className="py-2 px-4 rounded-lg bg-[#023E8A] cursor-pointer text-white text-sm font-semibold transition-all hidden lg:block">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full h-[1px] bg-[#EBECED] "></div>

          <div className="p-4">
            <div className="p-10 space-y-4 rounded-[8px] bg-[#CCD8E8] ">
              <h1 className="text-[16px] font-[500] text-[#023E8A] ">
                How Agency Rates Work
              </h1>

              <p className="text-[14px] lg:text-[16px] leading-[25px] font-[500] text-[#181818] ">
                These fees represent the markup your agency adds to the base
                fees charged by service providers. For example, if an airline
                charges N500,000 for a flight and your agency rate is N50,000,
                the customer will see N550,000 at their own end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
