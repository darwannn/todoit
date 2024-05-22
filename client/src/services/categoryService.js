import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../config/axios.js";

const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      return await axiosInstance.get("/category");
    },
    refetchOnWindowFocus: false,
  });
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/category", data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("category");
    },
  });
};
const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await axiosInstance.put(`/category/${id}`, data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("category");
    },
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      return await axiosInstance.delete(`/category/${id}`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("category");
    },
  });
};
export {
  useGetCategory,
  useUpdateCategory,
  useCreateCategory,
  useDeleteCategory,
};
