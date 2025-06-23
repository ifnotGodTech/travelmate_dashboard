export const NotificationModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="absolute top-[60px] right-0 z-50 bg-white w-[616px] h-[60vh] overflow-auto max-w-[616px] rounded-[16px] shadow-lg border border-gray-200 overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between px-[32px] py-[19px] border-b border-[#9B9EA4]">
        <h2 className="text-[28px] font-[600] text-[#181818] ">
          Notifications
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700 cursor-pointer "
          onClick={onClose}
        >
          &#x2715;
        </button>
      </div>

      <div className="text-end px-[32px] pt-[19px] ">
        <h1 className="cursor-pointer text-[18px] font-[600] text-[#023E8A] ">
          Mark all as read
        </h1>
      </div>

      {/* Notifications List */}
      <div className=" py-[19px] space-y-4">
        <div className="space-y-2 px-[32px] hover:bg-[#CCD8E833] py-3 ">
          <div className="flex justify-between items-center">
            <p className="text-[18px] font-[500] text-[#181818] ">
              Refund Request - Stays
            </p>
            <span className="bg-[#023E8A] h-[16px] w-[16px] rounded-full"></span>{" "}
            <span className="rounded-[4px] p-[10px] bg-[#fff] text-[#181818] text-[12px] font-[500]">
              Mark As Read
            </span>
          </div>
          <p className="text-[16px] text-[#4E4F52] font-[400] ">
            Ticket TK2025-001 has been escalated by Elvis from Customer Support.
            Click to view and resolve.
          </p>
          <p className="text-xs font-[400] text-[#181818]">
            6/3/2025 • 2 Minutes Ago
          </p>
        </div>
        <div className="space-y-2 px-[32px] hover:bg-[#CCD8E833] py-3 ">
          <div className="flex justify-between items-center">
            <p className="text-[18px] font-[500] text-[#181818] ">
              Refund Request - Stays
            </p>
            <span className="bg-[#023E8A] h-[16px] w-[16px] rounded-full"></span>{" "}
            {/* <span className="rounded-[4px] p-[10px] bg-[#fff] text-[#181818] text-[12px] font-[500]">
              Mark As Read
            </span> */}
          </div>
          <p className="text-[16px] text-[#4E4F52] font-[400] ">
            Ticket TK2025-001 has been escalated by Elvis from Customer Support.
            Click to view and resolve.
          </p>
          <p className="text-xs font-[400] text-[#181818]">
            6/3/2025 • 2 Minutes Ago
          </p>
        </div>
        <div className="space-y-2 px-[32px] hover:bg-[#CCD8E833] py-3 ">
          <div className="flex justify-between items-center">
            <p className="text-[18px] font-[500] text-[#181818] ">
              Refund Request - Stays
            </p>
            {/* <span className="bg-[#023E8A] h-[16px] w-[16px] rounded-full"></span>{" "}
            <span className="rounded-[4px] p-[10px] bg-[#fff] text-[#181818] text-[12px] font-[500]">
              Mark As Read
            </span> */}
          </div>
          <p className="text-[16px] text-[#4E4F52] font-[400] ">
            Ticket TK2025-001 has been escalated by Elvis from Customer Support.
            Click to view and resolve.
          </p>
          <p className="text-xs font-[400] text-[#181818]">
            6/3/2025 • 2 Minutes Ago
          </p>
        </div>
      </div>

      <div className="px-[32px] py-[19px] border-t border-[#9B9EA4] text-center ">
        <button className="text-[20px] text-[#023E8A] font-[600] cursor-pointer ">
          See All Notifications
        </button>
      </div>
    </div>
  );
};