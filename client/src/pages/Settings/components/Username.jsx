import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateUsername } from "../../../services/userService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SettingsCard from "../../../components/SettingsCard";

const Username = ({ user }) => {
  const { mutate: updateMutation, isPending: updateIsPending } =
    useUpdateUsername();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
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
    <SettingsCard title="Update Username">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-y-2 gap-x-2">
          <label className="col-span-12 md:col-span-3  xl:col-span-2">
            {" "}
            Username
          </label>
          <div className="col-span-12  md:col-span-9 xl:col-span-10 -mt-2 md:m-0">
            <input
              type="username"
              {...register("username")}
              className={`form-control ${errors.username && "border-red-500"}`}
              placeholder="Username"
              autoComplete="false"
              noValidate
            />
            {errors.username && (
              <span className="form-error">{errors.username.message}</span>
            )}
          </div>
          <div className="col-start-0 col-span-12 sm:col-span-5 md:col-start-4 xl:col-start-3  md:col-span-4 xl:col-span-3 w-full lg:w-[75%]">
            <button className="btn-primary w-full">
              {updateIsPending ? (
                <AiOutlineLoading3Quarters size={15} className="animate-spin" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </SettingsCard>
  );
};

export default Username;
