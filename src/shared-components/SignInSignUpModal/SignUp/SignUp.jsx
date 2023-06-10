import {
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import GoogleButton from "react-google-button";
import "./SignUp.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Toast } from "../../../routes/root";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const {
    signUp,
    isAuthLoading,
    setIsAuthLoading,
    googleSignIn,
    updateUserProfile,
  } = useAuthContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, photoUrl } = data;

    setIsAuthLoading(true);
    signUp(email, password)
      .then((userCredential) => {
        const createdUser = userCredential.user;
        console.log(createdUser);

        // * update user profile
        updateUserProfile(createdUser, name, photoUrl)
          .then(() => {})
          .catch((error) => {
            console.log(error);
            // *show toast
            Toast.fire({
              icon: "error",
              title: "Error Ocurred! Try Again",
            });

            setIsAuthLoading(false);
          });

        // *show toast
        Toast.fire({
          icon: "success",
          title: "Succesfully Signed Up",
        });

        reset();
        setIsAuthLoading(false);

        // *redirect user
        // const from = location.state?.from?.pathname || "/";
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        // *show toast
        Toast.fire({
          icon: "error",
          title: "Error Ocurred! Try Again",
        });

        setIsAuthLoading(false);
      });
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
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <div className="control">
        <TextField
          {...register("name", { required: "This field is required" })}
          sx={{
            width: "100%",
          }}
          id="name"
          label="Name"
          variant="standard"
          error={errors.name}
          helperText={errors.name?.message}
        />
      </div>
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
          id="email"
          label="Email"
          variant="standard"
          error={errors.email}
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
            {...register("password", {
              required: "This field is required",
              onChange: (e) => {
                setPassword(e.target.value);
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                message:
                  "password have to be atleast six characters, one capital letter and one special character",
              },
            })}
            id="password"
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
      <div className="control">
        <FormControl
          error={errors.confirmPassword}
          sx={{ width: "100%" }}
          variant="standard"
        >
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) => {
                if (value !== password) {
                  return "Passwords do not match";
                }
                return null;
              },
            })}
            id="confirmPassword"
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
          {errors.confirmPassword && (
            <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
          )}
        </FormControl>
      </div>
      <div className="control">
        <TextField
          {...register("photoUrl", { required: "This field is required" })}
          sx={{
            width: "100%",
          }}
          id="photoUrl"
          label="Photo Url"
          variant="standard"
          error={errors.photoUrl}
          helperText={errors.photoUrl?.message}
        />
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
        loading={isAuthLoading}
        variant="contained"
        size="large"
        sx={{
          width: "100%",
          mt: "1.2rem",
        }}
      >
        Sign Up
      </LoadingButton>
    </form>
  );
};

export default SignUp;
