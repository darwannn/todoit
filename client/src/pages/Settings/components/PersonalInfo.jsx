import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateProfileInformation } from "../../../services/userService";

import Avatar from "./Avatar";
import SettingsCard from "../../../components/SettingsCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PersonalInformation = ({ user }) => {
  const { mutate: updateMutation, isPending: updateIsPending } =
    useUpdateProfileInformation();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
    }
  }, [setValue, user]);

  const onSubmit = (data) => {
    updateMutation(data, {
      onSuccess: (response) => {
        toast.success(response.message);
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
    });
  };
  return (
    <SettingsCard title="Update  Basic Information">
      <div className="space-y-7">
        <div className="grid grid-cols-12 gap-y-2 gap-x-2 ">
          <div className="hidden md:block md:col-span-3 xl:col-span-2">
            Avatar
          </div>
          <div className="col-span-12 md:col-span-9 xl:col-span-10 -mt-2 md:m-0">
            <Avatar user={user} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12  gap-y-2 gap-x-2">
            {/* sm:col-span-2 */}
            <label className="col-span-12 md:col-span-3  xl:col-span-2">
              Full Name
            </label>
            <div className="col-span-12  md:col-span-9 xl:col-span-10 -mt-2 md:m-0">
              <div className="flex gap-3">
                <input
                  type="text"
                  {...register("first_name")}
                  className={`form-control ${
                    errors.first_name && "border-red-500"
                  }`}
                  placeholder="First Name"
                  autoComplete="false"
                />
                {errors.first_name && (
                  <span className="form-error">
                    {errors.first_name.message}
                  </span>
                )}

                <input
                  type="text"
                  {...register("last_name")}
                  className={`form-control ${
                    errors.last_name && "border-red-500"
                  }`}
                  placeholder="Last Name"
                  autoComplete="false"
                />
                {errors.last_name && (
                  <span className="form-error">{errors.last_name.message}</span>
                )}
              </div>
            </div>

            <div className="col-start-0 col-span-12 sm:col-span-5 md:col-start-4 xl:col-start-3  md:col-span-4 xl:col-span-3 w-full lg:w-[75%]">
              <button className="btn-primary w-full">
                {updateIsPending ? (
                  <AiOutlineLoading3Quarters
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </SettingsCard>
  );
};

export default PersonalInformation;
