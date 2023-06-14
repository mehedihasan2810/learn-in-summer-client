import { useRef, useState } from "react";
import { FaRegClock, FaGraduationCap } from "react-icons/fa";
import "./PopularCourses.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Box, Button, Skeleton } from "@mui/material";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { motion } from "framer-motion";

const tabs = ["Popular", "Trending", "New", "Rated"];

const PopularCourses = () => {
  const [activeTab, setActiveTab] = useState("Popular");
  const underRef = useRef(null);
  const [axiosSecure] = useAxiosSecure();
  const { currentUser, toggleSignInSignUpModal, user_data } = useAuthContext();
  const queryClient = useQueryClient();

  const handleTab = (e, index, tab) => {
    underRef.current.style.left = `calc(calc(100% / 4) * ${index})`;
    setActiveTab(tab);
  };

  const {
    isLoading,
    error,
    data: allClasses = [],
  } = useQuery(["myClasses"], async () => {
    const res = await axiosSecure.get("/allClasses");
    return res.data;
  });


  const { data: SelectedClassIds = [] } = useQuery({
    queryKey: ["SelectedClassIds", currentUser?.email],
    enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getSelectedClassIds?email=${currentUser?.email}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.post(`/addSelectedClass`, {
        email: currentUser?.email,
        id,
      });
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["SelectedClassIds"] });
    },
  });

  const handleSelectClass = (id) => {
    if (!currentUser) {
      toggleSignInSignUpModal();
      return;
    }
    mutation.mutate(id);
  };

  return (
    <div className="center-container">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <section className="popular-classes-container">
          <h2 className="section-title">Popular Classes</h2>
          <div className="tab-overflow">
            <div className="tab-container">
              {tabs.map((tab, index) => (
                <button
                  className={activeTab === tab ? "active" : ""}
                  key={index}
                  onClick={(e) => handleTab(e, index, tab)}
                >
                  {tab} Classes
                </button>
              ))}

              <span ref={underRef} className="under"></span>
            </div>
          </div>
          <div className="card-container">
            {error && <h2>Error ocurred {error.message}</h2>}
            {isLoading ? (
              <div>
                <Box sx={{ width: 210, marginRight: 0.5 }}>
                  <Skeleton variant="rectangular" width={300} height={200} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </div>
            ) : (
              allClasses.map((classes, index) => {
                if (index > 5) {
                  return;
                }

                return (
                  <div
                    key={classes._id}
                    className={
                      classes.available_seats == 0 ? "card no-seats" : "card"
                    }
                  >
                    <img src={classes.image} alt="" />
                    <div className="price-category">
                      <span className="category">{classes.class_name}</span>
                      <span>${classes.price}</span>
                    </div>
                    <h4>{classes.title}</h4>
                    <h6>{classes.instructor_name}</h6>
                    <div className="hrs-learners">
                      <p>
                        {" "}
                        <FaRegClock /> {classes.duration} hrs
                      </p>
                      <p>
                        {" "}
                        <FaGraduationCap /> {classes.available_seats} seats
                        available
                      </p>
                    </div>
                    <div className="btns">
                      <Button variant="outlined" size="large">
                        More Info
                      </Button>
                      <Button
                        disabled={
                          SelectedClassIds?.selectedClassIds?.includes(
                            classes._id
                          ) ||
                          classes.available_seats == 0 ||
                          user_data?.role === "admin" ||
                          user_data?.role === "instructor"
                        }
                        onClick={() => handleSelectClass(classes._id)}
                        variant="contained"
                        size="large"
                      >
                        {SelectedClassIds?.selectedClassIds?.includes(
                          classes._id
                        )
                          ? "Selected"
                          : "Select"}
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default PopularCourses;
