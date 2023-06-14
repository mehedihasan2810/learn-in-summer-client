import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Button, Skeleton } from "@mui/material";
import { useEffect } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";

const PaymentDetails = () => {
  const { addDashBoardTitle, user_data } = useAuthContext();
  const [axiosSecure] = useAxiosSecure();

  const { data: paymentDetails, isLoading: isPaymentLoading } = useQuery({
    queryKey: ["payment", user_data?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getPaymentDetails?email=${user_data?.email}`
      );
      return res.data;
    },
  });


  useEffect(() => {
    addDashBoardTitle("Payment Details");
  }, []);

  if (isPaymentLoading) {
    return Array.from({ length: 4 }).map((_, index) => (
      <Skeleton width={1200} height={100} variant="text" key={index} />
    ));
  }

  return (
    <div className="my-classes-container">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#126ed715" }}>
              <TableCell>Class Name</TableCell>
              <TableCell align="left">Instructor Name</TableCell>
              <TableCell align="left">Instructor Email</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left"> Transaction Id</TableCell>
              <TableCell align="left"> Status</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Class Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentDetails.map((payment) => (
              <TableRow
                key={payment._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {payment.class_name}
                </TableCell>
                <TableCell align="left">{payment.instructor_name}</TableCell>
                <TableCell align="left">{payment.instructor_email}</TableCell>
                <TableCell align="left">${payment.price}</TableCell>
                <TableCell align="left">{payment.transactionId}</TableCell>
                <TableCell align="left">{payment.status}</TableCell>
                <TableCell align="left">
                  {" "}
                  {moment(payment.date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="left">
                  <Button variant="outlined" size="small">
                    Class Details
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

export default PaymentDetails;
