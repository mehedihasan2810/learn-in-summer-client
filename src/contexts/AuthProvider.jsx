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

export const AuthContext = createContext();

const gooleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [isSignInSignUpModalOpen, setIsSignInSignUpModalOpen] = useState(false);
  // const [isProfileUpdateCompleted, setIsProfileUpdateCompleted] =
  //   useState(false);
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();

  const completeProfileUpdate = () => {
    // setIsProfileUpdateCompleted()
    console.log('from func', currentUser)
  }

  const toggleSignInSignUpModal = () => {
    setIsSignInSignUpModalOpen(!isSignInSignUpModalOpen);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (user, name, url) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: url,
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithRedirect(auth, gooleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const addDashBoardTitle = (title) => {
    setDashboardTitle(title);
  };

  const { data: user_data, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", currentUser?.email],
    enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUser?email=${currentUser?.email}`);
      return res.data;
    },
  });

  console.log(user_data);

  const mutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosSecure.post(`/addUser`, newData);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["manageUsers"] });
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthLoading(false);

      // console.log(userInfo);
      console.log(user)

      if (user) {
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "student",
          photoUrl: user.photoURL,
          date: Date.now(),
        };

        console.log('mutateeeeeeeee')
        mutation.mutate(userInfo);
      }
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
