import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./MyClasses.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, ButtonGroup } from "@mui/material";
import moment from "moment/moment";
import { Link } from "react-router-dom";

export default function MyClasses() {
  const [axiosSecure] = useAxiosSecure();

  const {
    isLoading,
    error,
    data: myClasses = [],
    refetch,
  } = useQuery(["myClasses"], async () => {
    const res = await axiosSecure.get("/allClasses");
    return res.data;
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="my-classes-container">
      <h2 className="section-title">My Classes</h2>
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
              <TableCell align="left">Added Date</TableCell>
              <TableCell align="left">Duration</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Update/Delete</TableCell>
              <TableCell align="left">Feedback</TableCell>
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
                <TableCell align="left">{classes.price}</TableCell>
                <TableCell align="left">{classes.available_seats}</TableCell>
                <TableCell align="left">{classes.enrolled}</TableCell>
                <TableCell align="left">
                  {moment(classes.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </TableCell>
                <TableCell align="left">{classes.duration}</TableCell>
                <TableCell align="left">{classes.status}</TableCell>
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
                    <Button color="error">Delete</Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell align="left">
                  <Button variant="outlined" size="small">
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
