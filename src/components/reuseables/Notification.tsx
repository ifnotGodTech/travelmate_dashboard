import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const NotificationModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  // Close modal on route change
  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };
    router.events?.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [router, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 bg-opacity-25"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="absolute top-[120px] right-[5vw] bg-white w-[616px] h-[80vh] overflow-auto max-w-[616px] rounded-l-[12px] shadow-lg border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-[32px] py-[19px] border-b border-[#9B9EA4]">
          <h2 className="text-[28px] font-[600] text-[#181818]">Notifications</h2>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            &#x2715;
          </button>
        </div>

        {/* Mark All as Read */}
        <div className="text-end px-[32px] pt-[19px]">
          <h1 className="cursor-pointer text-[18px] font-[600] text-[#023E8A]">
            Mark all as read
          </h1>
        </div>

        {/* Notifications List */}
        <div className="py-[19px] space-y-4">
          {/* Repeatable Notification Item */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="space-y-2 px-[32px] hover:bg-[#CCD8E833] py-3 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <p className="text-[18px] font-[500] text-[#181818]">
                  Refund Request - Stays
                </p>
                <span className="bg-[#023E8A] h-[16px] w-[16px] rounded-full"></span>
              </div>
              <p className="text-[16px] text-[#4E4F52] font-[400]">
                Ticket TK2025-001 has been escalated by Elvis from Customer
                Support. Click to view and resolve.
              </p>
              <p className="text-xs font-[400] text-[#181818]">
                6/3/2025 • 2 Minutes Ago
              </p>
            </div>
          ))}
        </div>

        {/* See All Notifications */}
        <div className="px-[32px] py-[19px] border-t border-[#9B9EA4] text-center">
          <button className="text-[20px] text-[#023E8A] font-[600] cursor-pointer">
            See All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
