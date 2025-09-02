import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { LoginSchemaType } from "../schema/LoginSchema";
import { User } from "../types";
import { useLocation, useNavigate } from "react-router";
import { RegisterSchemaType } from "../schema/RegisterSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const loginUser = useMutation({
    mutationFn: async (credential: LoginSchemaType) => {
      await agent.post("/login?useCookies=true", credential, {
        withCredentials: true,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const registerUser = useMutation({
    mutationFn: async (userData: RegisterSchemaType) => {
      await agent.post("/account/register", userData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Registered successful! - You can now login!");
      navigate("/login");
    },
  });

  const logOutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["events"] });
      navigate("/");
    },
  });

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await agent.get<User>("/account/user-info");
      return response.data;
    },
    enabled: !queryClient.getQueryData(["user"])&& location.pathname!=='/login'&& location.pathname !=='/register'
  });

  return {
    loginUser,
    currentUser,
    loadingUserInfo,
    logOutUser,
    registerUser,
  };
};
