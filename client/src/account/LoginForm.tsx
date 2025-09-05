import { Box, Button, Paper, Typography } from "@mui/material";
import { useAccount } from "../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import CustomTextField from "../features/events/form/CustomTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../lib/schema/LoginSchema";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { Link,  useNavigate } from "react-router";

export const LoginForm = () => {
  const navigate = useNavigate();
 
  const { loginUser } = useAccount();
  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginSchemaType) => {
    loginUser.mutate(data, {
      onSuccess: () => {
        navigate("/events");
      },
    });
  };
  return (
    <Paper
      elevation={8}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 15,
        p: 5,
        gap: 3,
        maxWidth: "md",
        color: "#616161",
        mx: "auto",
        borderRadius: 3,
        bgcolor: "#FAFAFA",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          color: "#007AFF",
        }}
      >
        <VpnKeyOutlinedIcon sx={{ fontSize: "130px" }} />
        <Typography variant="h1" color="initial"sx={{color:'#808080'}}>
          LOG IN
        </Typography>
      </Box>
      <CustomTextField
        label="Email"
        control={control}
        name="email"
        type="email"
      />
      <CustomTextField
        label="Password"
        control={control}
        name="password"
        type="password"
      />
      <Button
        type="submit"
        disabled={isLoading || isSubmitting}
        variant="contained"
        sx={{ bgcolor: "#007AFF", color: "#FFFF", fontSize: "large" }}
      >
        Log In
      </Button>
      <Typography  color="initial" textAlign={'center'}>
        Don't you have an account?  
        <Typography component={Link} to='/register' sx={{textDecoration:'none'}}> Sign up</Typography>
      </Typography>
    </Paper>
  );
};
