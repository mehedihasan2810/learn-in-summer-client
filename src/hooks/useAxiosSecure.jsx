import axios from "axios";
import { useEffect } from "react";
import useLogOut from "./useLogOut";

const axiosSecure = axios.create({
  baseURL: "https://learn-in-summer-server.vercel.app",
});

const useAxiosSecure = () => {
  // const navigate = useNavigate();
  // const { toggleSignInSignUpModal } = useAuthContext();
  const logOut = useLogOut();

  useEffect(() => {
    // Add access token to request headers
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle unauthorized or forbidden responses
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          // toggleSignInSignUpModal()
          // navigate("/");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return [axiosSecure];
};

export default useAxiosSecure;
