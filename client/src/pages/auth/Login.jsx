import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLogin } from "../../services/authService";
import usePasswordToggler from "../../hooks/usePasswordToggler";
import { setCookie } from "../../helpers/cookie";
import AuthenticationCard from "../../components/AuthenticationCard";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { mutate: loginMutation, isPending: loginIsPending } = useLogin();
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
    loginMutation(data, {
      onSuccess: (response) => {
        reset();
        setCookie("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/calendar");
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
        } else {
          toast.success(response.message);
        }
      },
    });
  };

  return (
    <AuthenticationCard title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="form-group">
          <input
            type="text"
            {...register("identifier")}
            className={`form-control ${errors.identifier && "border-red-500"}`}
            placeholder="Username or Email Address"
            autoComplete="false"
          />
          {errors.identifier && (
            <span className="form-error">{errors.identifier.message}</span>
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
              className="text-gray-500 hover:text-gray-700 transition-all absolute  top-1/2 right-2 transform  -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
          <Link
            to={"/auth/forgot-password"}
            className="text-sm text-right transition-all hover:text-gray-700 text-gray-500"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn-secondary mt-3"
          disabled={loginIsPending}
        >
          {loginIsPending ? (
            <AiOutlineLoading3Quarters size={15} className="animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="text-gray-500 text-center">
        <span>Don&apos;t have an account?</span>{" "}
        <Link
          to={"/auth/register"}
          className="transition-all hover:text-gray-700 "
        >
          Register
        </Link>
      </div>
    </AuthenticationCard>
  );
};

export default Login;
