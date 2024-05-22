import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useRegister } from "../../services/authService";
import usePasswordToggler from "../../hooks/usePasswordToggler";
import AuthenticationCard from "../../components/AuthenticationCard";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: registerMutation, isPending: registerIsPending } =
    useRegister();
  const { isPasswordVisible, togglePasswordVisibility, passwordRef } =
    usePasswordToggler();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const { ref } = register("password");

  const onSubmit = (data) => {
    registerMutation(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        reset();
        navigate("/auth/login");
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
    <AuthenticationCard title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-4">
          <div className="form-group">
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
              <span className="form-error">{errors.first_name.message}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              {...register("last_name")}
              className={`form-control ${errors.last_name && "border-red-500"}`}
              placeholder="Last Name"
              autoComplete="false"
            />
            {errors.last_name && (
              <span className="form-error">{errors.last_name.message}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <input
            type="text"
            {...register("username")}
            className={`form-control ${errors.username && "border-red-500"}`}
            placeholder="Username"
            autoComplete="false"
          />
          {errors.username && (
            <span className="form-error">{errors.username.message}</span>
          )}
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <div className="relative">
            <input
              type="password"
              {...register("password")}
              ref={(e) => {
                ref(e);
                passwordRef.current = e;
              }}
              className={`form-control pr-7 ${
                errors.password && "border-red-500"
              }`}
              placeholder="Password"
              autoComplete="false"
            />
            <div
              className="text-gray-500 hover:text-gray-700 transition-all absolute  top-1/2 right-2 transform  -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          <div
            className={`text-xs mt-2 ${
              errors.password ? "text-red-500" : "text-gray-400"
            }`}
          >
            Your password must be 8-20 characters long and contain a combination
            of capital and lowercase letters, numbers, and symbols.
          </div>
        </div>

        <button
          type="submit"
          className="btn-secondary mt-3"
          disabled={registerIsPending}
        >
          {registerIsPending ? (
            <AiOutlineLoading3Quarters size={15} className="animate-spin" />
          ) : (
            "Register"
          )}
        </button>
      </form>
      <div className="text-gray-500 text-center">
        <span>Already have an account?</span>{" "}
        <Link
          to={"/auth/login"}
          className="transition-all hover:text-gray-700 "
        >
          Login
        </Link>
      </div>
    </AuthenticationCard>
  );
};

export default Register;
