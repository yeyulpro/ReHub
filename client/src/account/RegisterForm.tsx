import { Box, Button, Paper, Typography } from "@mui/material";
import { useAccount } from "../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import CustomTextField from "../features/events/form/CustomTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {  Link } from "react-router";
import {
  registerSchema,
  RegisterSchemaType,
} from "../lib/schema/RegisterSchema";

export const RegisterForm = () => {
 
  const { registerUser } = useAccount();
  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    registerUser.mutate(data);
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
          color: "#FF5500",
        }}
      >
        <AppRegistrationIcon sx={{ fontSize: "130px" }} />
        <Typography variant="h1" sx={{color:'#808080'}}>
          Register
        </Typography>
      </Box>
      <CustomTextField
        label="Email"
        control={control}
        name="email"
        type="email"
      />
      <CustomTextField
        label="User Name"
        control={control}
        name="displayName"
        type="text"
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
        sx={{ bgcolor: "#FF5500", color: "#FFFF", fontSize: "large" }}
      >
        Register
      </Button>
      <Typography  color="initial" textAlign={'center'}>
        Do you want to login?  
        <Typography component={Link} to='/login' sx={{textDecoration:'none'}}> Sign in</Typography>
      </Typography>
    </Paper>
  );
};
