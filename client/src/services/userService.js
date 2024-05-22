import { axiosInstance } from "../config/axios.js";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await axiosInstance.get("/user/me");
    },
  });
};

const useUpdateEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.put("/user/email", data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("me");
    },
  });
};
const useUpdateUsername = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.put("/user/username", data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("me");
    },
  });
};

const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.put("/user/password", data);
    },
  });
};

const useUpdateProfileInformation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.put("/user/profile", data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("me");
    },
  });
};

const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
  
    mutationFn: async (data) => {
      return await axiosInstance.put("/user/avatar", data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("me");
    },
  });
};

const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ token, email, id }) => {
      return await axiosInstance.put(
        `/user/verify-email/${token}/${email}/${id}`
      );
    },
  });
};

export {
  useGetMe,
  useUpdateEmail,
  useUpdateUsername,
  useUpdatePassword,
  useUpdateProfileInformation,
  useUpdateAvatar,
  useVerifyEmail,
};
