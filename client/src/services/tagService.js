import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../config/axios.js";

const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      return await axiosInstance.get("/tag");
    },
    refetchOnWindowFocus: false,
  });
};

const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/tag", data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("tags");
    },
  });
};

const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await axiosInstance.put(`/tag/${id}`, data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("tags");
    },
  });
};

const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/tag/${id}`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("tags");
    },
  });
};

export { useGetTags, useCreateTag, useUpdateTag, useDeleteTag };
