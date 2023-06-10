import { Button, Divider } from "@mui/material";
import "./SelectedClasses.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import moment from "moment";

const SelectedClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();

  const { currentUser } = useAuthContext();

  const {
    isLoading,
    error,
    data: selectedClasses = [],
  } = useQuery(["mySelectedClasses", currentUser?.email], async () => {
    const res = await axiosSecure.get(
      `/getSelectedClass?email=${currentUser?.email}`
    );
    return res.data;
  });

  console.log(selectedClasses);

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

  if (isLoading) return <h2>Loading...</h2>;
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
              <Button variant="contained">Pay</Button>
              <Button
                onClick={() => handleDelete(classes._id)}
                color="error"
                variant="outlined"
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
