import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateEmail } from "../../../services/userService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SettingsCard from "../../../components/SettingsCard";
import { useEffect } from "react";
const Email = ({ user }) => {
  const { mutate: updateMutation, isPending: updateIsPending } =
    useUpdateEmail();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
    }
  }, [setValue, user]);

  const onSubmit = (data) => {
    updateMutation(data, {
      onSuccess: (response) => {
        toast.success(response.message);
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
    });
  };

  return (
    <SettingsCard title="Update Email Address">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-y-2 gap-x-2">
          <label className="col-span-12 md:col-span-3  xl:col-span-2">
            Email Address
          </label>
          <div className="col-span-12  md:col-span-9 xl:col-span-10 -mt-2 md:m-0">
            <input
              type="email"
              {...register("email")}
              className={`form-control ${errors.email && "border-red-500"}`}
              placeholder="Email"
              autoComplete="false"
              noValidate
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
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

export default Email;
