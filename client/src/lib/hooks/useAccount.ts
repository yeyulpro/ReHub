import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { LoginSchemaType } from "../schema/LoginSchema";
import { User } from "../types";
import { useNavigate } from "react-router";
import { RegisterSchemaType } from "../schema/RegisterSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const loginUser = useMutation({
    mutationFn: async (credential: LoginSchemaType) => {
      await agent.post("/login?useCookies=true", credential, {
        withCredentials: true
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await navigate('/events');
      
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
    enabled: !queryClient.getQueryData(["user"]),
  });

  return {
    loginUser,
    currentUser,
    loadingUserInfo,
    logOutUser,
    registerUser,
  };
};
