import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormValues } from '../interfaces/interfaceLogin';

const SigninSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

export default function LoginPage() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(SigninSchema),
  });
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmitHandler = (data: FormValues) => {
    const validEmail = "aa@bb.cc";
    const validPassword = "12345678";

    if (data.email === validEmail && data.password === validPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/homepage");
    } else {
      alert("Email or password incorrect");
    }
    reset();
  };

  return (
    <>
      <Box sx={{
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          mb: 2,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'text.primary',
        }}
      >
        Sign in to your account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{
          mt: 1,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          autoComplete="email"
          fullWidth
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          sx={{ mt: 2 }}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          autoComplete="current-password"
          fullWidth
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 3 }}
        >
          Sign in
        </Button>
      </Box>
    </Box>
    <Typography
        component="h6"
        variant="h6"
        sx={{
          mt: 2,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'text.primary',
        }}
      >
        Email : aa@bb.cc
        Password : 12345678
      </Typography>
    </>
  );
}
