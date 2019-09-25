// import React from "react";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableRowColumn } from "material-ui";
import ReceiptModal from "./ReceiptModal";
import RepliconForm from "./RepliconForm";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const information = (x, i, header) => (
  <TableRow key={`tr-${i}`}>
    {header.map((y, k) => (
      <TableRowColumn key={`trc-${k}`}>{x[y.prop]}</TableRowColumn>
    ))}
  </TableRow>
);

export default ({ data, header }) => {
  // export default function EditTable() {
  //   const classes = useStyles();

  const [fileNames, setFileNames] = useState([]);

  const callBackFromTable = files => {
    const names = files.map(files => files.name.split("_"));
    setFileNames(names);
    //var data = names.split("_")
  };

  //const data = fileNames.split("_");
  //console.log(data)

  console.log("File Names: ", fileNames);

  return (
    // <Paper className={classes.root}>
    //   <Table className={classes.table}>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((x, i) => (
              <TableCell key={`thc-${i}`}>{x.name}</TableCell>
            ))}
            {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, i) => information(x, i, header))}

          {/* {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
      <ReceiptModal callBackFromTable={callBackFromTable} />
    </Paper>
  );
};
