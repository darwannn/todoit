import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
// import { toast } from "react-toastify";
import moment from "moment";
import {
  useGetTask,
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "../../services/taskService";
import { useGetCategory } from "../../services/categoryService";
import { useGetTags } from "../../services/tagService";

import Subtask from "./Subtask";

import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TaskForm = ({ url, setIsFormOpen }) => {
  const { categoryId, taskId } = useParams();
  const navigate = useNavigate();

  const { data: task } = useGetTask(taskId);

  const { data: tags } = useGetTags();
  const tagsData = tags?.data?.tags;
  const taskData = task?.data?.task;

  const { data: category } = useGetCategory();
  const categoryData = category?.data?.category;

  const { mutate: createMutation, isPending: createIsPending } =
    useCreateTask();
  const { mutate: updateMutation, isPending } = useUpdateTask();
  const { mutate: deleteMutation } = useDeleteTask();

  const categoryOptions = categoryData?.map((cat) => ({
    value: cat.id,
    label: cat.title,
  }));

  const tagsOption =
    tagsData?.map((tag) => ({
      value: tag.id,
      label: tag.title,
    })) || [];

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    alert;
    if (categoryId && categoryOptions) {
      setValue("category_id", categoryId);
    }
  }, [setValue, categoryId, categoryOptions]);

  useEffect(() => {
    reset();
    if (taskData) {
      setValue("title", taskData.title);
      setValue("description", taskData.description);
      setValue("category_id", taskData.category_id);
      setValue("due_at", taskData.due_at);

      const tag_id = taskData.tags.map((tag) => ({
        value: tag.id,
        label: tag.title,
      }));
      setValue("tag_id", tag_id);
    } else {
      setValue("due_at", moment().format("YYYY-MM-DD"));
    }
  }, [reset, setValue, taskData]);

  useEffect(() => {
    if (!task) {
      // navigate(-1);
      // setIsFormOpen(false);
    }
  }, [navigate, setIsFormOpen, task]);

  const onSubmit = (data) => {
    if (data.category_id === "Select Category") {
      data.category_id = null;
    }
    data = {
      ...data,
      tag_id: data?.tag_id?.map((tag) => tag.value),
    };

    if (taskId && taskData) {
      updateMutation(
        { id: taskData.id, data },
        {
          onSuccess: (response) => {
            // toast(response.message);
            console.log(response);
            navigate(`/${url}`);
            reset();
          },
          onError: (response) => {
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
    } else {
      createMutation(data, {
        onSuccess: (response) => {
          // toast(response.message);
          console.log(response);
          navigate(`/${url}`);
          reset();
        },
        onError: (response) => {
          const inputErrors = response.errors;
          console.log("inputErrors", response);
          if (inputErrors) {
            for (const [key, value] of Object.entries(inputErrors)) {
              setError(key, {
                type: "manual",
                message: value,
              });
            }
          }
        },
      });
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteMutation(id, {
        onSuccess: (response) => {
          // toast(response.message);
          console.log(response);
          reset();
        },
        onError: (response) => {
          console.log(response);
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full min-h-screen p-3 rounded-lg">
      <div className="relative h-full p-5 bg-gray-100 flex flex-col flex-1 rounded-lg">
        <button
          type="button"
          className="absolute right-2 top-2 hover:bg-gray-200 p-1 rounded"
          onClick={() => {
            setIsFormOpen(false);
            navigate(`/${url}`);
          }}
        >
          <IoMdClose size={18} className="text-gray-500 cursor-pointer" />
        </button>
        <div className="flex-1">
          <h1 className="text-gray-700 text-[1.4rem] font-bold flex-1">
            Task:
          </h1>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              className={`form-control bg-gray-50 ${errors.title && "border-red-500"}`}
              {...register("title")}
              placeholder="Title"
            />
            {errors.title && (
              <span className="form-error">{errors.title.message}</span>
            )}
            <textarea
              type="text"
              rows={5}
              {...register("description")}
              className={`form-control bg-gray-50 resize-none ${errors.description && "border-red-500"}`}
              placeholder="Description (Optional)"
            />
            {errors.description && (
              <span className="form-error">{errors.description.message}</span>
            )}
            <div className="flex flex-col md:flex-row flex-wrap gap-2">
              <div className="flex md:flex-row flex-col w-full gap-2">
                <div className="w-full">
                  <select
                    className={` form-control h-10 bg-gray-50 ${errors.category_id && "border-red-500"}`}
                    {...register("category_id")}
                  >
                    <option className="hidden">Select Category</option>
                    {categoryOptions?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <span className="form-error">
                      {errors.category_id.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="date"
                    {...register("due_at")}
                    className={`form-control h-10 bg-gray-50 ${errors.due_at && "border-red-500"}`}
                  />
                  {errors.due_at && (
                    <span className="form-error">{errors.due_at.message}</span>
                  )}
                </div>
              </div>
              <div className="w-full">
                <Controller
                  control={control}
                  name="tag_id"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder="Select Tags"
                      closeMenuOnSelect={false}
                      value={value}
                      defaultValue={value}
                      isMulti
                      onChange={onChange}
                      className={`form-control p-0 bg-gray-50 resize-none ${errors.description && "border-red-500"}`}
                      options={tagsOption}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          width: "100%",
                          color: "gray",
                          backgroundColor: "#f9fafb",
                          border: "none",
                          borderRadius: "0.375rem",
                          boxShadow: "none",
                          outline: "none",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#F2F2F2"
                            : "inherit",
                        }),
                      }}
                    />
                  )}
                />
                {errors.tag_id && (
                  <span className="form-error">{errors.tag_id.message}</span>
                )}
              </div>
            </div>
            <div
              className={`flex gap-5 mt-5 justify-end ${taskData ? "" : "pl-5"}`}
            >
              {taskData && (
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => handleDelete(taskData?.id)}
                >
                  Delete Task
                </button>
              )}
              <button
                type="submit"
                className={`btn-secondary ${taskData ? "w-full" : "w-1/2"}`}
                disabled={isPending || createIsPending}
              >
                {isPending || createIsPending ? (
                  <AiOutlineLoading3Quarters
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <>{taskData ? "Update" : "Create"}</>
                )}
              </button>
            </div>
          </form>
          {taskData && (
            <Subtask subtask={taskData?.subtask} taskId={taskData?.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
