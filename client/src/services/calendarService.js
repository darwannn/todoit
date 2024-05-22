import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axios.js";

const useCount = () => {
  return useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      return await axiosInstance.get("/calendar/count");
    },
    refetchOnWindowFocus: false,
  });
};

export { useCount };
