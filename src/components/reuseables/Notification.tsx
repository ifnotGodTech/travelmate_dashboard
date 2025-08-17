import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { useGetAllNotifications } from "@/hooks/api/notification";
export const NotificationModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const { data, loading } = useGetAllNotifications({
    initialParams: { status: "all", page: 1 },
  });

  // Close modal on route change
  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };
    // `router.events` does not exist in next/navigation, so this is just a cleanup precaution
    // If you use next/router, it will work. For next/navigation, you'll use `router.push` listener patterns.
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
        className="absolute top-[120px] mx-4 md:mx-auto md:right-[5vw] bg-white md:w-[616px] max-h-[80vh] overflow-auto max-w-[616px] rounded-[12px] shadow-lg border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-[32px] py-[19px] border-b border-[#9B9EA4]">
          <h2 className="text-[28px] font-[600] text-[#181818]">
            Notifications
          </h2>
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
          {loading ? (
            <Skeleton />
          ) : data.length === 0 ? (
            <p className="px-[32px] text-sm text-gray-500">
              No notifications found.
            </p>
          ) : (
            data.slice(0, 3).map((n) => (
              <div
                key={n.id}
                className={`flex items-start justify-between w-full px-[32px] py-3 cursor-pointer ${
                  n.is_read ? "bg-white" : "bg-[#CCD8E833]"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="space-y-2 flex-1 w-full">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-[18px] font-[500] text-[#181818]">
                        {n.notification_type}
                      </p>
                    </div>
                    <p className="text-[16px] text-[#4E4F52] font-[400] leading-[100%] ">
                      {n.message}
                    </p>
                    <div className="flex items-center space-x-[4px]">
                      <p className="text-[13px] font-[500] leading-[100%] text-[#181818] ">
                        {format(new Date(n.created_at), "d/M/yyyy")}
                      </p>
                      <span className="w-[6px] h-[6px] rounded-full bg-[#9B9EA4]" />
                      <p className="text-[13px] font-[500] leading-[100%] text-[#181818]">
                        {formatDistanceToNow(new Date(n.created_at), {
                          addSuffix: true,
                        })
                          .replace("about ", "") // optional cleanup
                          .replace(/^./, (str) => str.toUpperCase())}{" "}
                        {/* Capitalize first letter */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* See All Notifications */}
        <div className="px-[32px] py-[19px] border-t border-[#9B9EA4] text-center">
          <button
            className="text-[20px] text-[#023E8A] font-[600] cursor-pointer"
            onClick={() => router.push("/Dashboard/notification")}
          >
            See All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start justify-between w-full px-[20px] py-3 cursor-pointer"
        >
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-[#a1adbc33] animate-pulse"></div>
            <div className="space-y-2">
              <div className="w-[300px] h-5 bg-[#a1adbc33] animate-pulse rounded-[4px]"></div>
              <div className="w-[200px] h-5 bg-[#a1adbc33] animate-pulse rounded-[4px]"></div>
              <div className="w-[100px] h-5 bg-[#a1adbc33] animate-pulse rounded-[4px]"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
