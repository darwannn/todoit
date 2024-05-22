import { CgClose } from "react-icons/cg";
import tinycolor from "tinycolor2";
import ColorPicker from "../ColorPicker/ColorPicker";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from "../../services/tagService";
// import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import { Context } from "../../context/Context";
import { MdDelete } from "react-icons/md";
const TagForm = ({ tagData, setIsModalOpen }) => {
  const { selectedTag, setSelectedTag } = useContext(Context);
  const { mutate: createMutation, isPending: createIsPending } = useCreateTag();
  const { mutate: updateMutation, isPending: updateIsPending } = useUpdateTag();
  const { mutate: deleteMutation } = useDeleteTag();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (input) => {
    const data = {
      title: input.title,
    };
    if (input.color.hex !== undefined) {
      data.color = input.color.hex;
    } else {
      data.color = input.color;
    }

    if (!selectedTag) {
      createMutation(data, {
        onSuccess: (response) => {
          // toast(response.message);
          console.log(response);
          setIsModalOpen(false);
          reset();
        },
        onError: (response) => {
          console.error(response);

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
      });
    } else {
      updateMutation(
        { id: selectedTag.id, data },
        {
          onSuccess: (response) => {
            // toast(response.message);
            console.log(response);
            setIsModalOpen(false);
            reset();
          },
          onError: (response) => {
            console.error(response);
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

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteMutation(id, {
        onSuccess: (response) => {
          // toast(response.message);
          console.log(response);
        },
        onError: (response) => {
          console.log(response);
        },
      });
    }
  };

  useEffect(() => {
    setValue("color", "#ffffff");
    if (selectedTag) {
      setValue("title", selectedTag.title);
      setValue("color", selectedTag.color);
    }
  }, [setValue, selectedTag]);
  return (
    <>
      <Modal
        onPositiveButtonClick={handleSubmit(onSubmit)}
        isPositiveButtonLoading={createIsPending || updateIsPending}
        setIsModalOpen={setIsModalOpen}
        title="Tags"
      >
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full bg-gray-50 p-3 rounded-lg min-h-72">
            <div className="flex flex-col gap-1.5 overflow-auto max-h-[440px]">
              {tagData && tagData.length > 0 ? (
                tagData.map((tag) => (
                  <div
                    key={tag.id}
                    className={`group/item  flex items-center cursor-pointer border   py-2 px-3 rounded-md flex-1 ${
                      tinycolor(tag.color).getBrightness() > 180
                        ? "text-gray-700"
                        : "text-white"
                    } ${selectedTag?.id === tag.id && " border-secondary-900-500"}`}
                    style={{
                      backgroundColor: tag.color,
                    }}
                  >
                    <p
                      className="flex-1"
                      onClick={() => {
                        setSelectedTag(tag);
                      }}
                    >
                      {tag.title}
                    </p>
                    <div
                      className="group-hover/item:visible visible transition-all sm:invisible"
                      onClick={() => handleDelete(tag.id, tag.title)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))
              ) : (
                <div> No added tag yet</div>
              )}
            </div>
          </div>
          <div className="w-full ">
            {selectedTag ? (
              <>
                <div
                  className="flex items-center py-2.5 px-3 text text-gray-700 rounded-lg border bg-gray-100 border-gray-200 mb-3"
                  role="alert"
                >
                  <span className="flex-1">
                    You are currently editing{" "}
                    <span className="font-semibold">{selectedTag.title}</span>
                  </span>
                  <button
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={() => {
                      setSelectedTag(null);
                      reset();
                    }}
                  >
                    <CgClose />
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1> Create New Tag</h1>
              </>
            )}

            <form className="flex flex-col gap-3">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  {...register("title")}
                  className={`form-control ${errors.title && "border-red-500"}`}
                />
                {errors.title && (
                  <span className="form-error">{errors.title.message}</span>
                )}
              </div>
              <ColorPicker control={control} className="shadow-none" />
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TagForm;
