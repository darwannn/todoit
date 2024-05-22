import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { axiosInstance } from "../config/axios.js";

const useGetNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam }) => {
      return await axiosInstance.get(`/notification?page=${pageParam}`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
   
      const nextPage = lastPage?.data?.notifications?.data?.length
        ? allPages.length + 1
        : undefined;

      return nextPage;
    },
    refetchOnWindowFocus: false,
  });
};

const useUpdateNotificationsStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.put(`/notification`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
export { useGetNotifications, useUpdateNotificationsStatus };
