import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useActivateAccount } from "../../services/authService";
import { useVerifyEmail } from "../../services/userService";

const Verification = () => {
  const navigate = useNavigate();
  const { action, token, id, email } = useParams();

  const { mutate: activateMutation } = useActivateAccount();
  const { mutate: changeMutation } = useVerifyEmail();

  useEffect(() => {
    if (action === "activate") {
      activateMutation(
        { token, id },
        {
          onSuccess: (response) => {
            console.log(response);
            toast.success(response.message);
            navigate("/auth/login");
          },
          onError: (error) => {
            if (error) {
              console.log(error);
              navigate("/auth/login");
            }
          },
        }
      );
    } else {
      changeMutation(
        { token, id, email },
        {
          onSuccess: (response) => {
            console.log(response);
            toast.success(response.message);
            navigate("/settings");
          },
          onError: (error) => {
            if (error) {
              console.log(error);
              navigate("/auth/login");
            }
          },
        }
      );
    }
  }, [action, activateMutation, changeMutation, email, id, navigate, token]);
  return <></>;
};

export default Verification;
