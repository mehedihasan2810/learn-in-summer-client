import { Button, Divider } from "@mui/material";
import "./SelectedClasses.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import moment from "moment";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const SelectedClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();

  const { currentUser, addDashBoardTitle } = useAuthContext();

  const {
    isLoading,
    error,
    data: selectedClasses = [],
  } = useQuery({
    queryKey: ["mySelectedClasses", currentUser?.email],
    enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getSelectedClass?email=${currentUser?.email}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(
        `/deleteSelectedClass?id=${id}&email=${currentUser?.email}`
      );
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["mySelectedClasses", currentUser?.email],
      });
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  useEffect(() => {
    addDashBoardTitle("My Selected Class");
  }, []);

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
  if (error) return <h2>Error Ocurred {error.message}</h2>;

  return (
    <div className="selected-container">
      <p className="selected-length">
        {selectedClasses.length} classes You have selected so far
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
              <Link to={`/dashboard/selected-classes/payment/${classes._id}`}>
                <Button
                  sx={{
                    width: "100%",
                  }}
                  variant="contained"
                >
                  Enroll
                </Button>
              </Link>
              <Button
                onClick={() => handleDelete(classes._id)}
                color="error"
                variant="outlined"
                startIcon={<DeleteOutline />}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedClasses;
