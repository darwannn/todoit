import { useForm } from "react-hook-form";
import SettingsCard from "../../../components/SettingsCard";
import { useUpdatePassword } from "../../../services/userService";
import usePasswordToggler from "../../../hooks/usePasswordToggler";
import {
  AiOutlineLoading3Quarters,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
const Password = () => {
  const {
    isPasswordVisible: isOldPasswordVisible,
    togglePasswordVisibility: toggleOldPasswordVisibility,
    passwordRef: oldPasswordRef,
  } = usePasswordToggler();

  const {
    isPasswordVisible: isNewPasswordVisible,
    togglePasswordVisibility: toggleNewPasswordVisibility,
    passwordRef: newPasswordRef,
  } = usePasswordToggler();

  const { mutate: updateMutation, isPending: updateIsPending } =
    useUpdatePassword();
  const {
    register,
    handleSubmit,
    setError,

    reset,
    formState: { errors },
  } = useForm();
  const { ref: passwordFormRef } = register("password");
  const { ref: oldPasswordFormRef } = register("old_password");

  const onSubmit = (data) => {
    updateMutation(data, {
      onSuccess: (response) => {
        console.log(response);
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
    <SettingsCard title="Update Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-y-2 gap-x-2">
          <label className="col-span-12 md:col-span-3  xl:col-span-2">
            {" "}
            Old Password
          </label>
          <div className="col-span-12  md:col-span-9 xl:col-span-10 -mt-2 md:m-0">
            <div className="relative">
              <input
                type="password"
                {...register("old_password")}
                ref={(e) => {
                  oldPasswordFormRef(e);
                  oldPasswordRef.current = e;
                }}
                className={`form-control pr-7 ${
                  errors.old_password && "border-red-500"
                }`}
                placeholder="••••••••"
                autoComplete="false"
              />
              <div
                className="text-gray-500 hover:text-gray-700 transition-all absolute  top-1/2 right-2 transform  -translate-y-1/2"
                onClick={toggleOldPasswordVisibility}
              >
                {isOldPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
            {errors.old_password && (
              <span className="form-error">{errors.old_password.message}</span>
            )}
          </div>

          <label className="col-span-12 md:col-span-3  xl:col-span-2">
            {" "}
            New Password
          </label>
          <div className="col-span-12  md:col-span-9 xl:col-span-10 -mt-2 md:m-0">
            <div className="relative">
              <input
                type="password"
                {...register("password")}
                ref={(e) => {
                  passwordFormRef(e);
                  newPasswordRef.current = e;
                }}
                className={`form-control pr-7 ${
                  errors.password && "border-red-500"
                }`}
                placeholder="••••••••"
                autoComplete="false"
              />
              <div
                className="text-gray-500 hover:text-gray-700 transition-all absolute  top-1/2 right-2 transform  -translate-y-1/2"
                onClick={toggleNewPasswordVisibility}
              >
                {isNewPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
            <div
              className={`text-xs mt-1 mb-1 ${
                errors.password ? "text-red-500" : "text-gray-400"
              }`}
            >
              Your password must be 8-20 characters long and contain a
              combination of capital and lowercase letters, numbers, and
              symbols.
            </div>
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

export default Password;
