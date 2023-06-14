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
import { Button, Skeleton } from "@mui/material";
import moment from "moment/moment";
import "./ManageClasses.css";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { Toast } from "../../../../Toast/Toast";

const ManageClasses = () => {
  const { addDashBoardTitle } = useAuthContext();
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: myClasses = [],
  } = useQuery(["myClasses"], async () => {
    const res = await axiosSecure.get("/allClasses");
    return res.data;
  });

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

  const handleApproveClass = (id) => {
    approveMutation.mutate(id);
    Toast.fire({
      icon: "success",
      title: "Approved successfully",
    });
  };

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

  useEffect(() => {
    addDashBoardTitle("Manage Classes");
  }, []);

  if (isLoading) {
    return Array.from({ length: 4 }).map((_, index) => (
      <Skeleton width={1200} height={100} variant="text" key={index} />
    ));
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="my-classes-container">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
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
                <TableCell align="left">{classes.instructor_name}</TableCell>
                <TableCell align="left">{classes.email}</TableCell>
                <TableCell align="left">{classes.available_seats}</TableCell>
                <TableCell align="left">${classes.price}</TableCell>
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
                  {moment(classes.date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="left">
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
