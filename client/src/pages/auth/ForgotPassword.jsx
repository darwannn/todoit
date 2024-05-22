import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useForgotPassword } from "../../services/authService";
import { setCookie } from "../../helpers/cookie";
import AuthenticationCard from "../../components/AuthenticationCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: forgotPasswordMutation, isPending: forgotPasswordIsPending } =
    useForgotPassword();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    forgotPasswordMutation(data, {
      onSuccess: (response) => {
        reset();
        toast.success(response.message);
        setCookie("token", response.data.token);
        navigate("/calendar");
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
    <AuthenticationCard title="Forgot Password">
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

        <button
          type="submit"
          className="btn-secondary mt-3"
          disabled={forgotPasswordIsPending}
        >
          {forgotPasswordIsPending ? (
            <AiOutlineLoading3Quarters size={15} className="animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </AuthenticationCard>
  );
};

export default ForgotPassword;
