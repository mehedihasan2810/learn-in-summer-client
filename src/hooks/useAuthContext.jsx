import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const useAuthContext = () => {
    return useContext(AuthContext);
  };