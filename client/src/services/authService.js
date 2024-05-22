import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axios.js";

const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/auth/login", data);
    },
  });
};

const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/auth/register", data);
    },
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post("/auth/logout");
    },
  });
};

const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/auth/forgot-password", data);
    },
  });
};

const useNewPassword = () => {
  return useMutation({
    mutationFn: async ({ data, token, id }) => {
      return await axiosInstance.put(`/auth/new-password/${token}/${id}`, data);
    },
  });
};

const useVerifyAccount = () => {
  return useMutation({
    mutationFn: async ({ token, id }) => {
      return await axiosInstance.put(`/auth/verify/${token}/${id}`);
    },
  });
};

const useActivateAccount = () => {
  return useMutation({
    mutationFn: async ({ token, id }) => {
      return await axiosInstance.put(`/auth/activate/${token}/${id}`);
    },
  });
};
export {
  useLogin,
  useRegister,
  useLogout,
  useForgotPassword,
  useNewPassword,
  useVerifyAccount,
  useActivateAccount,
};
