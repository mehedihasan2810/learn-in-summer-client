import { useRef, useState } from "react";
import { FaRegClock, FaGraduationCap } from "react-icons/fa";
import "./PopularCourses.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Button } from "@mui/material";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const tabs = ["Popular", "Trending", "New", "Rated"];

const PopularCourses = () => {
  const [activeTab, setActiveTab] = useState("Popular");
  const underRef = useRef(null);
  const [axiosSecure] = useAxiosSecure();
  const { currentUser, isAuthLoading, toggleSignInSignUpModal } =
    useAuthContext();
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

  console.log(allClasses);

  const { data: SelectedClassIds = [] } = useQuery({
    queryKey: ["SelectedClassIds", currentUser?.email],
    enabled: !isAuthLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getSelectedClassIds?email=${currentUser?.email}`
      );
      return res.data;
    },
  });
  console.log(SelectedClassIds?.selectedClassIds);

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
      <section className="popular-classes-container">
        <h2 className="section-title">Popular Classes</h2>
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
        <div className="card-container">
          {error && <h2>Error ocurred {error.message}</h2>}
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            allClasses.map((classes) => (
              <div key={classes._id} className="card">
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
                    disabled={SelectedClassIds?.selectedClassIds?.includes(
                      classes._id
                    )}
                    onClick={() => handleSelectClass(classes._id)}
                    variant="contained"
                    size="large"
                  >
                    {SelectedClassIds?.selectedClassIds?.includes(classes._id)
                      ? "Selected"
                      : "Select"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PopularCourses;
