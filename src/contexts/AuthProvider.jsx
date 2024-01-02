import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  updateProfile,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../configs/firebase/firebase";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Create an authentication context
export const AuthContext = createContext();

const gooleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [isSignInSignUpModalOpen, setIsSignInSignUpModalOpen] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();

  // Function to complete user profile update (to be implemented)
  const completeProfileUpdate = () => {};

  // Toggle modal for sign-in and sign-up
  const toggleSignInSignUpModal = () => {
    setIsSignInSignUpModalOpen(!isSignInSignUpModalOpen);
  };

  // Sign up a user with email and password
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile with name and photo URL
  const updateUserProfile = (user, name, url) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: url,
    });
  };

  // Sign in a user with email and password
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const googleSignIn = () => {
    return signInWithRedirect(auth, gooleProvider);
  };

  // Log out the current user
  const logOut = () => {
    return signOut(auth);
  };

  // Add a title to the dashboard
  const addDashBoardTitle = (title) => {
    setDashboardTitle(title);
  };

  // Use React Query to fetch user data
  const { data: user_data, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", currentUser?.email],
    enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUser?email=${currentUser?.email}`);
      return res.data;
    },
  });

  // Use React Query to manage user data mutation
  const mutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosSecure.post(`/addUser`, newData);
      return res;
    },
    onSuccess: () => {
      // Invalidate the manageUsers query on successful mutation
      queryClient.invalidateQueries({ queryKey: ["manageUsers"] });
    },
  });

  // Effect hook to handle authentication state changes
  useEffect(() => {
    // if(isSignInSignUpModalOpen){
    //   document.body.style.overflowY = 'hidden';
    // }else{
    //   document.body.style.overflowY = 'visible';
    // }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // If a user is signed in, create a userInfo object
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "student",
          photoUrl: user.photoURL,
          date: Date.now(),
        };

        // Call the mutation to add the user info to the server
        mutation.mutate(userInfo);
      }

      if (user) {
        // If a user is signed in, obtain a JWT token from the server
        axios
          .post("https://learn-in-summer-server.vercel.app/jwt", {
            email: user.email,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            setIsAuthLoading(false);
          });
      } else {
        // If no user is signed in, remove the JWT token from local storage
        localStorage.removeItem("access-token");
      }
    });

    // Unsubscribe from the authentication state change listener
    return () => {
      unsubscribe();
    };
  }, []);

  // Provide the authentication context to the application
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isSignInSignUpModalOpen,
        toggleSignInSignUpModal,
        isAuthLoading,
        setIsAuthLoading,
        signUp,
        updateUserProfile,
        signIn,
        googleSignIn,
        logOut,
        user_data,
        isUserLoading,
        addDashBoardTitle,
        dashboardTitle,
        completeProfileUpdate,
        role: "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
