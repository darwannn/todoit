import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUpdateTaskStatus } from "../../services/taskService";

import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import AddTaskButton from "./AddTaskButton";
import TaskHeader from "./TaskHeader";
import TaskSkeleton from "../Skeleton/TaskSkeleton";
import { FaChevronUp } from "react-icons/fa";

const Task = ({ url, tasks, title, category, isPending }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const isSpecific = url === "today" || url === "upcoming" ? false : true;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [taskType, setTaskType] = useState("pending");

  useEffect(() => {
    if (taskId) {
      setIsFormOpen(true);
    } else {
      setIsFormOpen(false);
    }
  }, [taskId]);

  const sortedTasks = tasks?.sort((a, b) => {
    return isAscending ? a.id - b.id : b.id - a.id;
  });

  const filteredTasks = sortedTasks?.filter((task) => {
    return taskType === "pending"
      ? task.is_completed === 0
      : task.is_completed === 1;
  });

  const { mutate: updateStatusMutation } = useUpdateTaskStatus();

  const handleStatus = (id) => {
    updateStatusMutation(
      { id },
      {
        onSuccess: (response) => {
          console.log(response);
          setIsFormOpen(false);
          // toast(response.message);
          navigate(`/list/${category.id}`);
        },
        onError: (response) => {
          console.log(response);
        },
      }
    );
  };

  const handleTasksOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row  w-full ">
        <div className="w-full p-4  min-h-screen ">
          <div className="space-y-5">
            {!isPending ? (
              <>
                <TaskHeader
                  category={category}
                  mainTitle={title}
                  tasks={tasks}
                  isSpecific={isSpecific}
                />

                <AddTaskButton url={url} />
                <div className="">
                  {isSpecific && (
                    <div className="flex items-center">
                      <button
                        className={`w-28  ${
                          taskType === "pending"
                            ? "font-bold  text-gray-700 bg-gray-200"
                            : "font-medium text-gray-500 "
                        } px-4 py-1 rounded-t-lg`}
                        onClick={() => setTaskType("pending")}
                      >
                        Pending
                      </button>
                      <button
                        className={`w-28  ${
                          taskType === "completed"
                            ? "font-bold  text-gray-700 bg-gray-200"
                            : "font-medium text-gray-500 "
                        }  px-4 py-1 rounded-t-lg`}
                        onClick={() => setTaskType("completed")}
                      >
                        Completed
                      </button>
                    </div>
                  )}
                  <hr className="h-0.5 bg-gray-100" />
                  {filteredTasks && filteredTasks.length !== 0 && (
                    <div className="flex items-center justify-end mt-4">
                      <button
                        className="text-gray-500 hover:text-gray-700 transition-all rounded-md w-28"
                        onClick={handleTasksOrder}
                      >
                        <div className="flex items-center gap-2 text-sm">
                          {isAscending ? (
                            <>
                              <span className=" transition-all">
                                <FaChevronUp />
                              </span>
                              <span>Descending</span>
                            </>
                          ) : (
                            <>
                              <span className="rotate-180 transition-all">
                                {" "}
                                <FaChevronUp />
                              </span>
                              <span>Ascending</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-gray-500">
                  {filteredTasks && filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        url={url}
                        task={task}
                        handleStatus={handleStatus}
                        isSpecific={isSpecific}
                      />
                    ))
                  ) : (
                    <>
                      <div className="font-bold text-center">
                        {url === "upcoming"
                          ? `No ${taskType} upcoming task`
                          : `No ${taskType} task for ${title}`}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <TaskSkeleton />
              </>
            )}
          </div>
        </div>
        {isFormOpen && <TaskForm url={url} setIsFormOpen={setIsFormOpen} />}
      </div>
    </>
  );
};

export default Task;
