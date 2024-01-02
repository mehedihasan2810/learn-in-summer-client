import { useRef, useState } from "react";
import "./PopularCourses.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import ClassSkeletons from "../../../../skeletons/ClassSkeletons";
import ClassesCard from "../../../../shared-components/ui/ClassesCard/ClassesCard";
gsap.registerPlugin(ScrollTrigger);

// Define class categories for tabs
const tabs = ["Drum", "Violin", "Guiter", "Piano"];

const PopularCourses = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("Drum");
  const classesContainerRef = useRef(null);
  const underRef = useRef(null);

  // Initialize Axios instance for secure API requests
  const [axiosSecure] = useAxiosSecure();
  const { currentUser, toggleSignInSignUpModal, user_data } = useAuthContext();
  const queryClient = useQueryClient();

  // Fetch all classes using React Query
  const {
    isLoading,
    error,
    data: allClasses = [],
  } = useQuery(["myClasses"], async () => {
    const res = await axiosSecure.get("/allClasses");
    return res.data;
  });
  // ------------------------------

  // Fetch selected class IDs using React Query
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
  // ------------------------------------

  // Define mutation for adding selected classes
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.post(`/addSelectedClass`, {
        email: currentUser?.email,
        id,
      });
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch selected class IDs query
      queryClient.invalidateQueries({ queryKey: ["SelectedClassIds"] });
    },
  });
  // ------------------------------------------

  // open the signin modal if the user is not signed in after clicking
  // on the select button
  const handleSelectClass = (id) => {
    if (!currentUser) {
      toggleSignInSignUpModal();
      return;
    }
    mutation.mutate(id);
  };
  // ------------------------------------------------

  // Calculate tab button position and set active tab
  const handleTab = (e, index, tab) => {
    underRef.current.style.left = `calc(calc(100% / 4) * ${index})`;
    setActiveTab(tab);
  };
  // --------------------------------------------

  return (
    <div ref={classesContainerRef} className="center-container">
      <section className="popular-classes-container">
        <div className="top-classes-header">
          <h2 className="section-title">Top Classes</h2>
          <button className="button-secondary">
            <Link to="/all-classes" preventScrollReset={false}>
              Find Your Favorite Class
            </Link>
          </button>
        </div>
        <div className="tab-overflow">
          <div className="tab-container">
            {tabs.map((tab, index) => (
              <button
                className={activeTab === tab ? "active" : ""}
                key={index}
                onClick={(e) => handleTab(e, index, tab)}
              >
                {tab} Class
              </button>
            ))}

            <span ref={underRef} className="under"></span>
          </div>
        </div>
        <div className="card-container">
          {error && <h2>Error ocurred {error.message}</h2>}
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ClassSkeletons key={index} />
              ))
            : // <div>
              //   <Box sx={{ width: 210, marginRight: 0.5 }}>
              //     <Skeleton variant="rectangular" width={300} height={200} />
              //     <Skeleton />
              //     <Skeleton width="60%" />
              //   </Box>
              // </div>
              allClasses.map((classes) => {
                // if (index > 5) {
                //   return;
                // }
                if (
                  classes.class_name
                    .toLowerCase()
                    .startsWith(activeTab.toLowerCase())
                ) {
                  return (
                    <ClassesCard
                      key={classes._id}
                      resetAnimKey={activeTab}
                      classes={classes}
                      handleSelectClass={handleSelectClass}
                      SelectedClassIds={SelectedClassIds}
                      user_data={user_data}
                    />
                  );
                }
              })}
        </div>
      </section>
    </div>
  );
};

export default PopularCourses;
