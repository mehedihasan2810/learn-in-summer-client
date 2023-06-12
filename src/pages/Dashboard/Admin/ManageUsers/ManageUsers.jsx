import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ManageUsers.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import moment from "moment/moment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();
  const { currentUser, addDashBoardTitle } = useAuthContext();
  addDashBoardTitle("Manage Users");

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["manageUsers"],
    enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUsers`);
      return res.data;
    },
  });

  console.log(users);

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
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Joined At</TableCell>
              <TableCell align="left">Make instructor</TableCell>
              <TableCell align="left">Make Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    className="my-classes-img"
                    src={user.photoUrl}
                    alt=""
                  />
                </TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.role}</TableCell>
                <TableCell align="left">
                  {moment(user.date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="left">
                  <Button
                    sx={{
                      width: "max-content",
                    }}
                    variant="outlined"
                  >
                    Make Instructor
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    sx={{
                      width: "max-content",
                    }}
                    variant="outlined"
                  >
                    Make Admin
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageUsers;
