import { Button, Divider } from "@mui/material";
import "./EnrolledClasses.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import moment from "moment";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const EnrolledClasses = () => {
   // Custom Axios hook for secure requests
  const [axiosSecure] = useAxiosSecure();

  // Auth context hook for accessing current user information
  const { currentUser, addDashBoardTitle } = useAuthContext();

    // React Query hook for fetching enrolled classes
  const {
    isLoading,
    error,
    data: selectedClasses = [],
  } = useQuery({
    queryKey: ["enrolledClasses", currentUser?.email],
    enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getEnrolledClasses?email=${currentUser?.email}`
      );
      return res.data;
    },
  });

  // Effect hook to set dashboard title when the component mounts
  useEffect(() => {
    addDashBoardTitle("My Enrolled Classes");
  }, []);

  // Loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <Skeleton
        style={{
          blockSize: "8rem",
          maxInlineSize: "800px",
          marginBlockStart: "3rem",
        }}
      />
    );
  }

  // Displaying error message if there's an error fetching data
  if (error) return <h2>Error Ocurred {error.message}</h2>;

  return (
    <div className="selected-container">
       {/* Displaying the number of enrolled classes */}
      <p className="selected-length">
        {selectedClasses.length} classes You have enrolled so far
      </p>

      {selectedClasses.map((classes, index) => (
        <div key={index}>
          <Divider />
          <div className="selected-class">
            <img src={classes.image} alt="" />

            <div className="middle-wrapper">
              <h4>{classes.title}</h4>
              <p> {classes.instructor_name}</p>

              <div className="price-container">
                <p> {classes.class_name}</p>
                <p className="price">${classes.price}</p>
              </div>

              <div className="duration">
                <p>{classes.duration}hrs</p>
                <p>{classes.available_seats} seats available</p>
              </div>
              <p>Last updated: {moment(classes.date).format("MMMM Do YYYY")}</p>
            </div>

            <div className="btns-container">
              <Button
                sx={{
                  ml: "auto",
                  cursor: "auto",
                }}
                variant="text"
                size="small"
                color="success"
              >
                Enrolled
              </Button>

              <Button
                sx={{
                  width: "max-content",
                }}
                variant="outlined"
                size="large"
              >
                Start Class
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrolledClasses;
