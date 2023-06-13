import { Button, Divider, Skeleton } from "@mui/material";
import "./EnrolledClasses.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import moment from "moment";
import { useEffect } from "react";

const EnrolledClasses = () => {
  const [axiosSecure] = useAxiosSecure();

  const { currentUser, addDashBoardTitle } = useAuthContext();

  

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

useEffect(() => {
  addDashBoardTitle("My Enrolled Classes");
}, [])


  if (isLoading) {
    return <Skeleton width={1200} height={100} variant="text" />;
  }
  if (error) return <h2>Error Ocurred {error.message}</h2>;

  return (
    <div className="selected-container">
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
