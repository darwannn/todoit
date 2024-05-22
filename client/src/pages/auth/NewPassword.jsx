import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useNewPassword, useVerifyAccount } from "../../services/authService";
import usePasswordToggler from "../../hooks/usePasswordToggler";
import AuthenticationCard from "../../components/AuthenticationCard";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { token, id } = useParams();
  const { mutate: newPasswordMutation, isPending: newPasswordIsPending } =
    useNewPassword();

  const { mutate: verifyMutation } = useVerifyAccount();

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

  useEffect(() => {
    if (token !== undefined) {
      verifyMutation(
        { token, id },
        {
          onSuccess: (response) => {
            console.log(response);
          },
          onError: () => {
            navigate("/auth/login");
          },
        }
      );
    }
  }, [id, navigate, newPasswordMutation, token, verifyMutation]);

  const onSubmit = (data) => {
    newPasswordMutation(
      { data, token, id },
      {
        onSuccess: (response) => {
          reset();
          toast.success(response.message);
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
      }
    );
  };

  return (
    <AuthenticationCard title="New Password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
          disabled={newPasswordIsPending}
        >
          {newPasswordIsPending ? (
            <AiOutlineLoading3Quarters size={15} className="animate-spin" />
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </AuthenticationCard>
  );
};

export default Login;
