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
import { useEffect, useState } from "react";
import { Toast } from "../../../../Toast/Toast";
import Skeleton from "react-loading-skeleton";

const ManageUsers = () => {
  const [RoleBtnId, setRoleBtnId] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();
  const { currentUser, addDashBoardTitle } = useAuthContext();

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


 

  const updateUserRoleMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.put(`/updateUserRole/${data.id}`, {
        role: data.role,
      });
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["manageUsers"] });
    },
  });

  const handleMakeAdmin = (id) => {

    updateUserRoleMutation.mutate({ id, role: "admin" });
    setRoleBtnId(id);

    Toast.fire({
      icon: "success",
      title: "Successfully Made This User Admin",
    });
  };

  const handleMakeInstructor = (id) => {

    updateUserRoleMutation.mutate({ id, role: "instructor" });
    setRoleBtnId(id);

    Toast.fire({
      icon: "success",
      title: "Successfully Made This User Instructor",
    });
  };

  useEffect(() => {
    addDashBoardTitle("Manage Users");
  }, []);

  if (isLoading) {
    return Array.from({ length: 10 }).map((_, index) => (
      <Skeleton style={{
         height: '5rem',
         marginBlockEnd: '0.2rem'
      }} key={index} />
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
                <TableCell align="left">
                  <Button
                    color={
                      user.role === "admin"
                        ? "secondary"
                        : user.role === "instructor"
                        ? "success"
                        : "primary"
                    }
                  >
                    {currentUser?.email === user.email
                      ? `${user.role}(You)`
                      : `${user.role}`}
                  </Button>
                </TableCell>
                <TableCell align="left">
                  {moment(user.date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => handleMakeInstructor(user._id)}
                    sx={{
                      width: "max-content",
                    }}
                    variant="outlined"
                    disabled={RoleBtnId === user._id || currentUser?.email === user.email}
                  >
                    Make Instructor
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => handleMakeAdmin(user._id)}
                    sx={{
                      width: "max-content",
                    }}
                    variant="outlined"
                    disabled={RoleBtnId === user._id || currentUser?.email === user.email}
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
