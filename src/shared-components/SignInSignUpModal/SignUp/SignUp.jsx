import {
  Divider,
  FormControl,
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
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form className="signup-form">
      <div className="control">
        <TextField
          sx={{
            width: "100%",
          }}
          id="name" 
          name="name"
          label="Name"
          variant="standard"
        />
      </div>
      <div className="control">
        <TextField
          type="email"
          sx={{
            width: "100%",
          }}
          id="email" 
          name="email"
          label="Email"
          variant="standard"
        />
      </div>
      <div className="control">
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
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
        </FormControl>
      </div>
      <div className="control">
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
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
        </FormControl>
      </div>
      <div className="control">
        <TextField
          sx={{
            width: "100%",
          }}
          id="photoUrl" 
          name="photoUrl"
          label="Photo Url"
          variant="standard"
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
        onClick={() => {
          console.log("Google button clicked");
        }}
      />

      <LoadingButton
        //   loading
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
