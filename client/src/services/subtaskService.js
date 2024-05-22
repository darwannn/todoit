import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../config/axios.js";

const useGetSubtasks = () => {
  return useQuery({
    queryKey: ["subtask"],
    queryFn: async () => {
      return await axiosInstance.get("/subtask");
    },
  });
};

const useCreateSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId, data }) => {
      return await axiosInstance.post(`/subtask/${taskId}`, data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("subtask");
    },
  });
};

const useUpdateSubtaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      return await axiosInstance.put(`/subtask/${id}`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("subtask");
    },
  });
};

const useDeleteSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/subtask/${id}`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("subtask");
    },
  });
};
export {
  useGetSubtasks,
  useCreateSubtask,
  useUpdateSubtaskStatus,
  useDeleteSubtask,
};
