import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Button } from "@mui/material";

const PaymentDetails = () => {
  const { addDashBoardTitle } = useAuthContext();
  addDashBoardTitle("Payment Details");
  return (
    <div className="my-classes-container">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#126ed715" }}>
              <TableCell>Class Name</TableCell>
              <TableCell align="left">Instructor Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left"> Transaction Id</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Class Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Drum Class
                </TableCell>
                <TableCell align="left">Mehedi hasan</TableCell>
                <TableCell align="left">$44</TableCell>
                <TableCell align="left">op1i2u34231i4123oi</TableCell>
                <TableCell align="left">12/11/23</TableCell>
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
