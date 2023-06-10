import {
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import GoogleButton from "react-google-button";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import "./SignIn.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Toast } from "../../../routes/root";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { googleSignIn } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // reset();
  };

  console.log(errors);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((userCredential) => {
        const loggedUser = userCredential.user;
        console.log(loggedUser);

        Toast.fire({
          icon: "success",
          title: "Succesfully Signed In",
        });
      })
      .catch((error) => {
        console.log(console.log(error));
        Toast.fire({
          icon: "error",
          title: "Error Ocurred! Try Again",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
      <div className="control">
        <TextField
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          sx={{
            width: "100%",
          }}
          error={errors.email}
          id="email"
          label="Email"
          variant="standard"
          helperText={errors.email?.message}
        />
      </div>
      <div className="control">
        <FormControl
          error={errors.password}
          sx={{ width: "100%" }}
          variant="standard"
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            {...register("password", {
              required: "This field is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                message:
                  "password have to be atleast six characters, one capital letter and one special character",
              },
            })}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText>{errors.password?.message}</FormHelperText>
          )}
        </FormControl>
      </div>

      <Divider
        sx={{
          m: "1.2rem 0",
        }}
      >
        OR
      </Divider>

      <GoogleButton
        style={{
          width: "100%",
        }}
        onClick={handleGoogleSignIn}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        sx={{
          width: "100%",
          mt: "1.2rem",
        }}
      >
        Sign In
      </LoadingButton>
    </form>
  );
};

export default SignIn;
