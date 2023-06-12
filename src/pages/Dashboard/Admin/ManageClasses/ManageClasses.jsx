import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ManageClasses.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import moment from "moment/moment";
import { Toast } from "../../../../routes/root";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();
  const { addDashBoardTitle } = useAuthContext();
  addDashBoardTitle("Manage Classes");

  const {
    isLoading,
    error,
    data: myClasses = [],
  } = useQuery(["myClasses"], async () => {
    const res = await axiosSecure.get("/allClasses");
    return res.data;
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/deleteClass/${id}`);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });

  const handleDeleteClass = (id) => {
    console.log(id);

    mutation.mutate(id);

    Toast.fire({
      icon: "success",
      title: "Deleted successfully",
    });
  };

  if (isLoading) return "Loading...";

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
                <TableCell align="left">{classes.status}</TableCell>
                <TableCell align="left">
                  {moment(classes.date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="left">
                  <Button variant="outlined">Approve</Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="outlined" color="error">
                    Deny
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    sx={{
                      width: "max-content",
                    }}
                    variant="outlined"
                  >
                    Send Feedback
                  </Button>
                </TableCell>
                {/* <TableCell align="left">
                  <Button variant="outlined" size="small">
                    See Feedback
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageClasses;
