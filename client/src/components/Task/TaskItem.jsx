import { Link } from "react-router-dom";
import moment from "moment";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import tinycolor from "tinycolor2";
const TaskItem = ({ url, task, handleStatus, isSpecific }) => {
  const isOverdue =
    moment(task.due_at).isBefore(moment(), "day") && !task.is_completed;
  const uncompletedSubtaskCount = task?.subtask.filter(
    (subtask) => !subtask.is_completed
  ).length;

  return (
    <>
      <div
        className={`group/item flex my-2 py-3 px-4 rounded-lg transition-all  ${
          isOverdue ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-100"
        } `}
      >
        <input
          type="checkbox"
          className="border cursor-pointer"
          onChange={() => handleStatus(task.id)}
          checked={task.is_completed === 1}
        />

        <Link to={`/${url}/${task.id}`} className="flex flex-col  ml-4 flex-1 ">
          <div className="flex w-full">
            <span className=" flex-1 font-bold text-gray-600 hover:text-gray-700">
              {task.title}
            </span>
            <button className=" invisible group-hover/item:visible  group-hover/item:text-gray-700 ">
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center gap-3  px-3  ">
            {url !== "today" && (
              <div
                className={`flex gap-2 items-center ${
                  isOverdue ? " text-red-400" : "text-gray-500"
                }`}
              >
                <MdOutlineCalendarToday />
                <span className="text-sm font-bold">
                  {moment(task.due_at).format("MMMM DD, YYYY")}
                </span>
              </div>
            )}
            {!isSpecific && (
              <div className="flex gap-2 items-center">
                <div
                  className={`p-2 rounded-md `}
                  style={{ backgroundColor: task?.category?.color }}
                ></div>
                <div className="text-sm font-bold">{task?.category?.title}</div>
              </div>
            )}
            <div className="flex items-center text-sm">
              {uncompletedSubtaskCount > 0 ? uncompletedSubtaskCount : "No"}{" "}
              Subtask
              {uncompletedSubtaskCount > 1 && "s"}
            </div>
          </div>
          <div className="flex flex-wrap mt-1">
            {task?.tags?.map((tag) => (
              <div
                key={tag.id}
                className={`text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-md mr-2 ${
                  tinycolor(tag.color).getBrightness() > 180
                    ? "text-gray-700"
                    : "text-white"
                }`}
                style={{
                  backgroundColor: tag.color,
                }}
              >
                {tag.title}
              </div>
            ))}
          </div>
        </Link>
      </div>

      <hr className="bg-gray-200" />
    </>
  );
};

export default TaskItem;
