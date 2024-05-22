import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../config/axios.js";

const useTodayTasks = () => {
  return useQuery({
    queryKey: ["todayTasks"],
    queryFn: async () => {
      return await axiosInstance.get("/task/today");
    },
    refetchOnWindowFocus: false,
  });
};
const useUpcomingTasks = () => {
  return useQuery({
    queryKey: ["upcomingTasks"],
    queryFn: async () => {
      return await axiosInstance.get("/task/upcoming");
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      return await axiosInstance.get(`/task/`);
    },
    refetchOnWindowFocus: false,
  });
};
const useGetTask = (id) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      return await axiosInstance.get(`/task/${id}`);
    },
    refetchOnWindowFocus: false,
  });
};

const useSearchTasks = (title) => {
  return useQuery({
    queryKey: ["searchTasks", title],
    queryFn: () => async (title) => {
      return await axiosInstance.get(`/task/search/${title}`);
    },
    refetchOnWindowFocus: false,
  });
};

const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/task", data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("todayTasks");
    },
  });
};
const useCategoryTasks = (id) => {
  return useQuery({
    queryKey: ["categoryTasks", id],
    queryFn: async () => {
      return await axiosInstance.get(`/task/category/${id}`);
    },
    refetchOnWindowFocus: false,
  });
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await axiosInstance.put(`/task/${id}`, data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("todayTasks");
    },
  });
};
const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await axiosInstance.put(`/task/update/status/${id}`, data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("todayTasks");
    },
  });
};

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/task/${id}`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};

export {
  useGetTasks,
  useTodayTasks,
  useUpcomingTasks,
  useCategoryTasks,
  useUpdateTaskStatus,
  useGetTask,
  useSearchTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
};
