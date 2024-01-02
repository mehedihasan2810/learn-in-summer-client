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
import { useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Toast } from "../../../Toast/Toast";
import { gsap } from "gsap";
const SignUp = () => {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State for storing the password
  const [password, setPassword] = useState("");

  // State for tracking sign-up loading state
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  // Ref for the sign-up form element
  const signUpFormRef = useRef();

  // Custom hook for secure axios instance
  const [axiosSecure] = useAxiosSecure();

  // Query client for managing React Query
  const queryClient = useQueryClient();

  // Auth context for authentication actions
  const {
    signUp,
    googleSignIn,
    updateUserProfile,
    completeProfileUpdate,
    toggleSignInSignUpModal,
  } = useAuthContext();

  // React Query mutation for adding a new user
  const mutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosSecure.post(`/addUser`, newData);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch the manageUsers query
      queryClient.invalidateQueries({ queryKey: ["manageUsers"] });
    },
  });

  // React Hook Form configuration
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = (data) => {
    const { name, email, password, photoUrl } = data;

    // Start loading state
    setIsSignUpLoading(true);

    signUp(email, password)
      .then((userCredential) => {
        const createdUser = userCredential.user;

        // Update user profile information
        updateUserProfile(createdUser, name, photoUrl)
          .then(() => {
            completeProfileUpdate();
          })
          .catch((error) => {
            // Show error toast
            Toast.fire({
              icon: "error",
              title: `${error.message} Try Again`,
            });

            // Stop loading state
            setIsSignUpLoading(false);
          });

        // Create user info object
        const userInfo = {
          name: name,
          email: email,
          role: "student",
          photoUrl: photoUrl,
          date: Date.now(),
        };

        // Trigger the mutation to add the new user
        mutation.mutate(userInfo);

        // Show success toast
        Toast.fire({
          icon: "success",
          title: "Succesfully Signed Up",
        });

        // reset();
        setIsSignUpLoading(false);

        // *redirect user
        // const from = location.state?.from?.pathname || "/";
        // navigate(from, { replace: true });

        // Reset the form and stop loading state
        reset();

        // Close the sign-in/sign-up modal
        toggleSignInSignUpModal();
      })
      .catch((error) => {
        // Show error toast
        Toast.fire({
          icon: "error",
          title: `${error.message} Try Again`,
        });

        // Stop loading state
        setIsSignUpLoading(false);
      });
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        // Show success toast for Google sign-in
        Toast.fire({
          icon: "success",
          title: "Succesfully Signed In",
        });
      })
      .catch((error) => {
        // Show error toast for Google sign-in
        Toast.fire({
          icon: "error",
          title: `${error.message} Try Again`,
        });
      });
  };

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Sign-up form animation using gsap on toggle between sign-in and sign-up
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        signUpFormRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0 }
      );
    }, signUpFormRef.current);

    return () => ctx.revert();
  }, []);
  // -----------------------------------

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={signUpFormRef}
      className="signup-form"
    >
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
      <LoadingButton
        type="submit"
        loading={isSignUpLoading}
        variant="contained"
        size="large"
        sx={{
          width: "100%",
          mt: "1.2rem",
          p: "0.8rem 0",
        }}
      >
        Sign Up
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

export default SignUp;
