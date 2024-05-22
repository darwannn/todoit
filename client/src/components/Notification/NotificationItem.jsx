import moment from "moment";

const NotificationItem = ({ notification }) => {
  return (
    <>
      <div
        className={`${
          notification.read_at === null ? " bg-gray-200" : "bg-gray-100"
        }
                    hover:bg-gray-200
                      py-2 px-3 rounded my-1
                    `}
      >
        <a href="/today" className="leading-none  text-gray-700">
          <p className="text-right text-xs">
            {moment(notification.created_at).format("MMM DD, YYYY")}
          </p>
          {/* <p className="text-left  font-semibold"> {notification.data.tasks}</p> */}
          <p className="text-left text-sm">
            You have{" "}
            <span className="font-bold">{notification.data.task_count}</span>{" "}
            task{notification.data.task_count > 1 ? "s" : ""} due today.
          </p>
        </a>
      </div>
    </>
  );
};

export default NotificationItem;
