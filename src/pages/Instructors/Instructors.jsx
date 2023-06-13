import { FaGraduationCap, FaEnvelope } from "react-icons/fa";
import "./Instructors.css";
import { useTitlePerPage } from "../../hooks/useTitlePerPage";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
const Instructors = () => {
  useTitlePerPage("Instructors");

  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuthContext();

  const { data: users, isLoading } = useQuery({
    queryKey: ["manageUsers"],
    enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUsers`);
      return res.data;
    },
  });

  console.log(users);

  if (isLoading) {
    return (
      <Box sx={{ width: 210, marginLeft: 5, mt: 5 }}>
        <Skeleton variant="rectangular" width={300} height={200} />
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    );
  }

  return (
    <div className="center-container">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="instructors-container">
          <h2 className="section-title">Instructors</h2>

          <div className="instructors">
            {users?.map((user) => {
              if (user.role !== "instructor") {
                return;
              }
              return (
                <div key={user._id} className="instructor">
                  <img
                    src="https://images.unsplash.com/photo-1467493330285-2fe6a9f97483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt=""
                  />

                  <div className="body">
                    <h3>{user.name}</h3>
                    <span>
                      <FaGraduationCap /> 6400 Enrolled
                    </span>
                    <span className="email">
                      {" "}
                      <FaEnvelope /> {user.email}
                    </span>
                    <button className="btn">watch class</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Instructors;
