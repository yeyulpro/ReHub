import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

const agent = axios.create({   
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials:true
});
agent.interceptors.response.use(
  (response) => {
    console.log("response received successfully", response.data);
    return response;
  },
  (error) => {
    console.log("axios error", error);
    if (error.response) {
      const { data, status } = error.response;

      switch (status) {
        case 400:
          router.navigate("/bad-request", {
            state: {
              data,
              status,
              message:
                "Your browser sent a request that this server could not understand.",
            },
          });
          break;
        case 401:
          router.navigate("/unauthorized", {
            state: {
              data,
              status,
              message: "Access is denied due to invalid credentials.",
            },
          });
          break;
        case 403:
          router.navigate("/forbidden", {
            state: {
              data,
              status,
              message: "You don't have permission to access this resource.",
            },
          });
          break;
        case 404:
          console.log("here is data", data);
          router.navigate("/not-found", {
            state: { data, status, message: "Your requested URL was not found on this server." },
          });
          break;
        case 500:
          router.navigate("/server-error", {
            state: {
              data,
              status,
              message:
                "We're sorry. The server has encountered an internal error and was unable to complete your request. Please contact the system administrator for more information.",
            },
          });
          break;
        default:
          toast.warning(data.message);
          break;
      }
    }
  }
);

export default agent;
