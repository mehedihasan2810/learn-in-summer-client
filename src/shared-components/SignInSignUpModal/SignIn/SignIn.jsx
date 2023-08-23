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
import { useLayoutEffect, useRef, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./SignIn.css";
import { Toast } from "../../../Toast/Toast";
import { gsap } from "gsap";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const { googleSignIn, signIn, toggleSignInSignUpModal } = useAuthContext();
  const signInFormRef = useRef();

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
    const { email, password } = data;

    setIsSignInLoading(true);
    signIn(email, password)
      .then(() => {
        // *show toast
        Toast.fire({
          icon: "success",
          title: "Succesfully Signed In",
        });

        reset();
        setIsSignInLoading(false);

        // const from = location.state?.from?.pathname || "/";
        // navigate(from, { replace: true });
        toggleSignInSignUpModal();
      })
      .catch((error) => {
        // *show toast
        Toast.fire({
          icon: "error",
          title: `${error.message} Try Again`,
        });
        setIsSignInLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Succesfully Signed In",
        });
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: `${error.message} Try Again`,
        });
      });
  };

  // signIn form y and opacity animation on toggle between signin and signup
  // with gsap
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        signInFormRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0 }
      );
    }, signInFormRef.current);

    return () => ctx.revert();
  }, []);
  // -----------------------------------

  return (
    <form
      ref={signInFormRef}
      onSubmit={handleSubmit(onSubmit)}
      className="signin-form"
    >
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

      <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        <div>
          <strong>Admin:-</strong>
        </div>
        <div>
          <strong>Email:</strong> mehedimiah47@gmail.com
        </div>
        <div>
          <strong>Pass:</strong> 123456A@
        </div>
        <Divider style={{ marginBlock: "8px" }} />
        <div>
          <strong>Instructor:-</strong>
        </div>
        <div>
          <strong>Email:</strong> test@gmail.com
        </div>
        <div>
          <strong>Pass:</strong> 123456A@
        </div>
      </div>

      <LoadingButton
        loading={isSignInLoading}
        type="submit"
        variant="contained"
        size="large"
        sx={{
          width: "100%",
          mt: "1.2rem",
          p: "0.8rem 0",
        }}
      >
        Sign In
      </LoadingButton>
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
    </form>
  );
};

export default SignIn;
