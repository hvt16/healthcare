import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, netmeds, mg, pharmeasy) {
  return { name, netmeds, mg, pharmeasy };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
let medicines = "";
export default function CustomizedTables(props) {
  medicines = Array.from(props.medicines);
  console.log(medicines);
  // medicines = props.medicines[0];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Medicine Name</StyledTableCell>
            <StyledTableCell align="right">netmeds</StyledTableCell>
            <StyledTableCell align="right">1mg&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">PharmEasy&nbsp;(g)</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="outlined" color="error">
                  <Link
                    target="_blank"
                    rel="noopener"
                    href={
                      "https://www.netmeds.com/catalogsearch/result?q=" +
                      row.name
                    }
                    underline="none"
                  >
                    {row.netmeds}
                  </Link>
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="outlined" color="error">
                  <Link
                    target="_blank"
                    rel="noopener"
                    href={"https://www.1mg.com/search/all?name=" + row.name}
                    underline="none"
                  >
                    {row.mg}
                  </Link>
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="outlined" color="error">
                  <Link
                    target="_blank"
                    rel="noopener"
                    href={"https://pharmeasy.in/search/all?name=" + row.name}
                    underline="none"
                  >
                    {row.pharmeasy}
                  </Link>
                </Button>
              </StyledTableCell>
              {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
