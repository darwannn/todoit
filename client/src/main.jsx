import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import { ContextProvider } from "./context/Context";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { router } from "./config/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      retryDelay: 1000,
      enabled: true,
      refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ContextProvider>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ContextProvider>
  </>
);
