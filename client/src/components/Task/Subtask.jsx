import {
  useCreateSubtask,
  useUpdateSubtaskStatus,
  useDeleteSubtask,
} from "../../services/subtaskService";
import { useForm } from "react-hook-form";

// import { toast } from "react-toastify";

import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Subtask = ({ subtask, taskId }) => {
  const { mutate: createMutation, isPending: createPending } =
    useCreateSubtask();

  const { mutate: updateMutation } = useUpdateSubtaskStatus();

  const { mutate: deleteMutation } = useDeleteSubtask();

  const {
    register,
    handleSubmit,
    setError,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (taskId) {
      createMutation(
        { taskId, data },
        {
          onSuccess: (response) => {
            // toast(response.message);
            console.log(response);
            reset();
          },
          onError: (response) => {
            console.log(response);
            const inputErrors = response.errors;
            if (inputErrors) {
              for (const [key, value] of Object.entries(inputErrors)) {
                setError(key, {
                  type: "manual",
                  message: value,
                });
              }
            }
          },
        }
      );
    }
  };

  const handleChange = (id) => {
    updateMutation(
      { id },
      {
        onSuccess: (response) => {
          console.log(response);
          //   toast(response.message);
        },
        onError: (response) => {
          console.log(response);
        },
      }
    );
  };

  const handleDelete = (id) => {
    deleteMutation(id, {
      onSuccess: (response) => {
        // toast(response.message);
        console.log(response);
      },
      onError: (response) => {
        console.log(response);
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-2 mt-3 flex-1">
        <h1 className="text-gray-700 text-[1.4rem] font-bold">Subtask:</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-end gap-3"
        >
          <div className="form-group">
            <div
              className={`flex items-center gap-2 py-1 pl-4 pr-1  bg-gray-50 border rounded-md cursor-pointer ${
                errors.title ? "border-red-500" : "border-gray-200 "
              }`}
            >
              <div>
                <FaPlus
                  size={15}
                  className="text-gray-500 group-hover:text-gray-700"
                />
              </div>
              <input
                type="text"
                className=" flex-1 font-semibold hover:font-bold focus:font-bold bg-gray-50 cursor-pointer focus:cursor-auto focus:outline-none text-gray-500 placeholder:text-gray-500 focus:placeholder-transparent group-hover:text-gray-700"
                placeholder="New Subtask"
                {...register("title")}
              />
              <button
                className="w-20 h-8 bg-gray-100 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-all font-semibold flex justify-center items-center"
                disabled={createPending}
              >
                {createPending ? (
                  <>
                    <AiOutlineLoading3Quarters
                      size={15}
                      className="animate-spin"
                    />
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </div>
            {errors.title && (
              <span className="form-error">{errors.title.message}</span>
            )}
          </div>
        </form>

        <div className="flex flex-col items-start mt-2 ml-2">
          {subtask && subtask.length > 0 ? (
            subtask.map((task) => (
              <div
                key={task.id}
                className="group/item flex gap-1 items-center justify-center w-full hover:bg-gray-200 py-1.5 px-3 rounded"
              >
                {" "}
                <input
                  type="checkbox"
                  className="bg-transparent border bg-gray-200 cursor-pointer mr-1"
                  onChange={() => {
                    handleChange(task.id);
                  }}
                  checked={task.is_completed === 1}
                />
                <span
                  className={`flex-1 font-bold text-gray-500 ${
                    task.is_completed === 1 ? "line-through" : "no-underline"
                  }`}
                >
                  {task.title}
                </span>
                <div
                  onClick={() => handleDelete(task.id)}
                  className="visible sm:invisible hover:bg-gray-300 p-1 rounded group-hover/item:visible text-gray-500 hover:text-gray-700 transition-all cursor-pointer"
                >
                  <MdDelete />
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="font-medium text-gray-500 min-h-32  w-full">
                No subtask yet
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subtask;
