import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import moment from "moment/moment";
import "./ManageClasses.css";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { Toast } from "../../../../Toast/Toast";
import Skeleton from "react-loading-skeleton";

const ManageClasses = () => {
  // Accessing the context and hooks
  const { addDashBoardTitle } = useAuthContext();
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();

  // Query to get the classes
  const {
    isLoading,
    error,
    data: myClasses = [],
  } = useQuery(["myClasses"], async () => {
    const res = await axiosSecure.get("/allClasses");
    return res.data;
  });

  // Mutation to deny class
  const denyMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.put(`/updateDenyStatus/${id}`);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });

  // Function to handle denying a class
  const handleDenyClass = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deny it!",
    }).then((result) => {
      if (result.isConfirmed) {
        denyMutation.mutate(id);
        Swal.fire("Denied!", "The class has been denied.", "success");
      }
    });
  };

  // Mutation to approve class
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.put(`/updateApproveStatus/${id}`);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });

  // Function to handle approving a class
  const handleApproveClass = (id) => {
    approveMutation.mutate(id);
    Toast.fire({
      icon: "success",
      title: "Approved successfully",
    });
  };

  // Mutation to send feedback
  const feedbackMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.put(`/updateFeedback/${data.id}`, {
        message: data.message,
      });
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });

  // Function to handle updating feedback
  const handleUpdateFeedback = async (id) => {
    const { value: message } = await Swal.fire({
      input: "textarea",
      inputLabel: "Feedback",
      confirmButtonText: "Send",
      inputPlaceholder: "Type your feedback here...",
      inputAttributes: {
        "aria-label": "Type your feedback here",
      },
      showCancelButton: true,
    });

    if (message) {
      feedbackMutation.mutate({ id, message });
      Swal.fire(message);
    }

    // feedbackMutation.mutate(id, message)
  };

  // Effect hook to set dashboard title
  useEffect(() => {
    addDashBoardTitle("Manage Classes");
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

  // Displaying error if there's an issue with fetching data
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="my-classes-container">
      {/* Table for displaying class information */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          {/* Table header */}
          <TableHead>
            <TableRow sx={{ bgcolor: "#126ed715" }}>
              <TableCell>Image</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell align="left">Instructor Name</TableCell>
              <TableCell align="left">Instructor Email</TableCell>
              <TableCell align="left">Available Seats</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Last Updated</TableCell>
              <TableCell align="left">Approve</TableCell>
              <TableCell align="left">Deny</TableCell>
              <TableCell align="left">Send Feedback</TableCell>
            </TableRow>
          </TableHead>

          {/* Table body */}
          <TableBody>
            {/* Mapping through classes and displaying each row */}
            {myClasses.map((classes) => (
              <TableRow
                key={classes._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {/* Image of the class */}
                  <img className="my-classes-img" src={classes.image} alt="" />
                </TableCell>
                <TableCell align="left">{classes.class_name}</TableCell>
                <TableCell align="left">{classes.instructor_name}</TableCell>
                <TableCell align="left">{classes.email}</TableCell>
                <TableCell align="left">{classes.available_seats}</TableCell>
                <TableCell align="left">${classes.price}</TableCell>
                <TableCell align="left">
                  {/* Status of the class */}
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
                  {/* Last updated date of the class */}
                  {moment(classes.date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="left">
                  {/* Button for approving a class */}
                  <LoadingButton
                    onClick={() => handleApproveClass(classes._id)}
                    variant="outlined"
                    loading={approveMutation.isLoading}
                    loadingIndicator="Loading…"
                    disabled={
                      classes.status === "denied" ||
                      classes.status === "approved"
                    }
                  >
                    Approve
                  </LoadingButton>
                </TableCell>
                <TableCell align="left">
                  {/* Button for denying a class */}
                  <LoadingButton
                    onClick={() => handleDenyClass(classes._id)}
                    variant="outlined"
                    loading={denyMutation.isLoading}
                    loadingIndicator="Loading…"
                    disabled={
                      classes.status === "denied" ||
                      classes.status === "approved"
                    }
                    color="error"
                  >
                    Deny
                  </LoadingButton>
                </TableCell>
                <TableCell align="left">
                  {/* Button for sending feedback */}
                  <LoadingButton
                    onClick={() => handleUpdateFeedback(classes._id)}
                    sx={{
                      width: "max-content",
                    }}
                    variant="outlined"
                  >
                    Send Feedback
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageClasses;
