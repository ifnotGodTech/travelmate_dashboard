import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import {
  useGetAllNotifications,
  useMarkAsRead,
} from "@/hooks/api/notification";

export const NotificationModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const {
    notifications: data,
    loading,
    refetch,
  } = useGetAllNotifications();

  const { markAsRead, loading: marking } = useMarkAsRead();

  // close modal on route change
  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };
    router.events?.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [router, onClose]);

  // ✅ Grab first 3 IDs & send to hook
  useEffect(() => {
    if (data.length > 0) {
      const firstThreeIds = data.slice(0, 3).map((n: any) => n.id);

    }
  }, [data]);

  // ✅ Check if there’s at least one unread
  const hasUnread = useMemo(() => data.some((n: any) => !n.is_read), [data]);

  const handleMarkAllRead = () => {
    const unreadIds = data.filter((n: any) => !n.is_read).map((n: any) => n.id);
    if (unreadIds.length > 0) {
      markAsRead(unreadIds, () => {
        refetch();
      });
    }
  };

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
        {/* Header */}
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

        {/* Mark All as Read (only if unread) */}
        {hasUnread && (
          <div className="text-end px-[32px] pt-[19px]">
            <h1
              className="cursor-pointer text-[18px] font-[600] text-[#023E8A]"
              onClick={handleMarkAllRead}
            >
              {marking ? "Marking..." : "Mark all as read"}
            </h1>
          </div>
        )}

        {/* Notifications List */}
        <div className="py-[19px] space-y-4">
          {loading ? (
            <Skeleton />
          ) : data.length === 0 ? (
            <p className="px-[32px] text-sm text-gray-500">
              No notifications found.
            </p>
          ) : (
            data.map((n: any) => (
              <div
                key={n.id}
                className={`flex items-start justify-between w-full px-[32px] py-3 cursor-pointer ${
                  n.is_read ? "bg-white" : "bg-[#CCD8E833]"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="space-y-2 flex-1 w-full">
                    <p className="text-[18px] font-[500] text-[#181818]">
                      {n.notification_details.title}
                    </p>
                    <p className="text-[16px] text-[#4E4F52] font-[400]">
                      {n.notification_details.message}
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
                          .replace("about ", "")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
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

const Skeleton = () => (
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
