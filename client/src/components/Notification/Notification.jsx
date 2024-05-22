import { useEffect } from "react";

import { useInView } from "react-intersection-observer";
import { AiOutlineArrowLeft } from "react-icons/ai";

import {
  useGetNotifications,
  useUpdateNotificationsStatus,
} from "../../services/notificationService";

import NotificationItem from "./NotificationItem";

const Notification = ({ isNotificationOpen, setIsNotificationOpen }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const {
    data: notifications,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetNotifications();
  const notificationsData = notifications?.pages;
  const { mutate: updateMutation } = useUpdateNotificationsStatus();

  useEffect(() => {
    if (isNotificationOpen) document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "unset");
  }, [isNotificationOpen]);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, notificationsData]);

  const handleReadNotification = () => {
    updateMutation({
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (response) => {
        console.log(response);
      },
    });
  };
  return (
    <>
      <div
        className={`h-full  w-screen fixed top-0 left-0 bg-black opacity-40 z-20 ${
          isNotificationOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      ></div>
      <div
        className={`rounded-lg overflow-y-auto fixed top-0 left-0 z-30 w-72 p-4 h-full transition-all duration-500 transform bg-white ${
          isNotificationOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="cursor-pointer hover:bg-gray-200 rounded p-1"
          onClick={() => {
            setIsNotificationOpen(false);
            handleReadNotification();
          }}
        >
          <AiOutlineArrowLeft />
        </button>
        <div className="flex items-center ">
          <h1 className="text-lg font-bold text-left flex-1 text-gray-700">
            Notification
          </h1>
          <span
            className="text-xs text-gray-600 hover:text-gray-700 cursor-pointer transition-all"
            onClick={handleReadNotification}
          >
            {/* {updateIsPending ? "Loading..." : "Mark all as read"} */}
            Mark all as read
          </span>
        </div>
        <hr className="mb-2" />
        <div className="flex flex-col flex-1">
          {notificationsData &&
          notificationsData[0]?.data?.notifications?.total !== 0 ? (
            notificationsData.map((notificationData) => {
              const sNotification = notificationData.data?.notifications?.data;
              return sNotification.map((notification) => {
                return (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                );
              });
            })
          ) : (
            <div className="text-gray-700 text-center">No notification yet</div>
          )}
        </div>
        <div
          ref={ref}
          className="text-center px-5 text-xs text-gray-700 cursor-pointer"
          onClick={() => {
            fetchNextPage();
          }}
        >
          {hasNextPage && (isFetchingNextPage ? "Loading..." : "View More")}
        </div>
      </div>
    </>
  );
};

export default Notification;
