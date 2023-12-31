import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./MyClasses.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, ButtonGroup } from "@mui/material";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Toast } from "../../../../Toast/Toast";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function MyClasses() {
  // Custom Axios hook for secure requests
  const [axiosSecure] = useAxiosSecure();

  // React Query hook for fetching instructor's classes
  const queryClient = useQueryClient();
  const { addDashBoardTitle, user_data } = useAuthContext();

  // Fetching instructor's classes
  const {
    isLoading,
    error,
    data: myClasses = [],
  } = useQuery(["myClasses"], async () => {
    const res = await axiosSecure.get(
      `/getAInstructorClasses?email=${user_data?.email}`
    );
    return res.data;
  });

  // React Query mutation for deleting a class
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/deleteClass/${id}`);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch query for "myClasses" after successful deletion
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });

  // Function to handle class deletion
  const handleDeleteClass = (id) => {
    mutation.mutate(id);

    // Displaying success message
    Toast.fire({
      icon: "success",
      title: "Deleted successfully",
    });
  };

  // Effect hook to set dashboard title when the component mounts
  useEffect(() => {
    addDashBoardTitle("My Classes");
  }, []);

  // Loading skeleton while data is being fetched
  if (isLoading) {
    return Array.from({ length: 10 }).map((_, index) => (
      <Skeleton
        style={{
          height: "5rem",
          marginBlockEnd: "0.2rem",
        }}
        key={index}
      />
    ));
  }

  // Displaying error message if there's an error fetching data
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="my-classes-container">
      {/* Table for displaying instructor's classes */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#126ed715" }}>
              <TableCell>Image</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell align="left">Class Title</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Available Seats</TableCell>
              <TableCell align="left">Enrolled</TableCell>
              <TableCell align="left">Last Updated</TableCell>
              <TableCell align="left">Duration</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Update/Delete</TableCell>
              <TableCell align="left">See Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myClasses.map((classes) => (
              <TableRow
                key={classes._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img className="my-classes-img" src={classes.image} alt="" />
                </TableCell>
                <TableCell align="left">{classes.class_name}</TableCell>
                <TableCell align="left">{classes.title}</TableCell>
                <TableCell align="left">${classes.price}</TableCell>
                <TableCell align="left">{classes.available_seats}</TableCell>
                <TableCell align="left">{classes.enrolled}</TableCell>
                <TableCell align="left">
                  {moment(classes.date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="left">{classes.duration}</TableCell>
                <TableCell align="left">
                  <Button
                    color={
                      classes.status === "approved"
                        ? "success"
                        : classes.status === "denied"
                        ? "error"
                        : "primary"
                    }
                  >
                    {classes.status}
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <ButtonGroup
                    disableElevation
                    variant="outlined"
                    size="small"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button>
                      <Link
                        to={`/dashboard/my-classes/update-class/${classes._id}`}
                      >
                        Update
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleDeleteClass(classes._id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => {
                      Swal.fire({
                        title: "Feedback!",
                        text: `${
                          classes.feedback
                            ? classes.feedback
                            : "No feedback given yet!"
                        }`,
                        confirmButtonText: "X",
                      });
                    }}
                    sx={{
                      width: "max-content",
                    }}
                    variant="outlined"
                    size="small"
                  >
                    See Feedback
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
