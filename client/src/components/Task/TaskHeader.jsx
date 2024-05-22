import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// import { toast } from "react-toastify";
import {
  useUpdateCategory,
  useDeleteCategory,
} from "../../services/categoryService";

import ColorPicker from "../ColorPicker/ColorPicker";
import Modal from "../Modal/Modal";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TaskHeader = ({ mainTitle, tasks, isSpecific, category }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: updateMutation, isPending: updateIsPending } =
    useUpdateCategory();
  const { mutate: deleteMutation, isPending: deleteIsPending } =
    useDeleteCategory();

  const { control, register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (category) {
      setValue("title", category.title);
      setValue("color", category.color);
    }
  }, [setValue, category, tasks]);

  const onSubmit = (data) => {
    data.color = data?.color?.hex;
    if (data.color == undefined) {
      data.color = category?.color;
    }

    if (
      data?.title !== category?.title ||
      data?.color !== category?.color ||
      data?.title !== ""
    ) {
      updateMutation(
        { id: category.id, data },
        {
          onSuccess: (response) => {
            console.log(response);
            setIsModalOpen(false);
          },
          onError: (response) => {
            console.log(response);
          },
        }
      );
    } else {
      setValue("title", category?.title);
    }
  };

  const handleDelete = () => {
    if (category) {
      if (confirm(`Are you sure you want to delete ${category.title}?`)) {
        deleteMutation(
          { id: category.id },
          {
            onSuccess: (response) => {
              // toast(response.message);
              console.log(response);
              navigate("/today");
            },
            onError: (response) => {
              console.log(response);
            },
          }
        );
      }
    }
  };
  return (
    <>
      {isModalOpen && (
        <Modal
          onPositiveButtonClick={handleSubmit(onSubmit)}
          isPositiveButtonLoading={updateIsPending}
          setIsModalOpen={setIsModalOpen}
          className={"w-96"}
        >
          <ColorPicker control={control} />
        </Modal>
      )}{" "}
      <div className="flex gap-2 items-center">
        {isSpecific && (
          <div
            className="h-10 min-w-10 rounded-md border-2 border-gray-200  cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: category?.color }}
          ></div>
        )}
        <span className="flex items-center justify-center h-10 min-w-10 text-2xl text-gray-700 border-2 border-gray-200 rounded-md font-semibold">
          {tasks ? tasks.filter((task) => task.is_completed === 0)?.length : 0}
        </span>
        {isSpecific ? (
          <>
            <input
              type="text"
              className=" w-full text-gray-700 text-4xl font-bold p-2 cursor-pointer ml-3 focus:outline-none rounded-lg bg-transparent focus:cursor-text"
              {...register("title")}
              // disabled={updateIsPending}
              onBlur={handleSubmit(onSubmit)}
            />
          </>
        ) : (
          <>
            <div className="text-gray-700 text-4xl font-bold p-2 cursor-pointer focus:cursor-auto focus:outline-none focus:ring-gray-300 focus:border-gray-700">
              {mainTitle}
            </div>
          </>
        )}
        {isSpecific && (
          <button
            onClick={handleDelete}
            disabled={deleteIsPending}
            className="flex items-center justify-center h-10 min-w-10 rounded-md  text-gray-500  cursor-pointer border-gray-200 border-2  hover:bg-gray-100 hover:text-gray-700 transition-all"
          >
            {deleteIsPending ? (
              <AiOutlineLoading3Quarters size={15} className="animate-spin" />
            ) : (
              <MdDelete size={20} />
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default TaskHeader;
