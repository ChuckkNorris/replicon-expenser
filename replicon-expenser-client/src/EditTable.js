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
  const [receiptRow, setReceiptRow] = useState([]);
  const [fileLink, setFileLink] = useState([]);

  const callBackFromTable = files => {
    const fullName = files.map(files => files.name);
    const names = files.map(files => files.name.split("_"));
    setFileNames(names);
    setFileLink(fullName);
    //var data = names.split("_")
  };

  const createRow = (event) => {
    setReceiptRow(event.target.value);
  }

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

        <TableBody
          inputProps={{
            dateIncurred: 'receiptRow.dateIncurred',
            expenseType: 'receiptRow.expenseType',
            purpose: 'receiptRow.purpose',
            place: 'receiptRow.place',
            amount: 'receiptRow.amount',
            files: 'receiptRow.files',
          }}
        >
          {/* {data.map((x, i) => information(x, i, header))} */}
          {fileNames.map((fileNames) => (
              <TableRow>
                <TableCell align="right">{fileNames[0]}</TableCell>
                <TableCell align="right">{fileNames[1]}</TableCell>
                <TableCell align="right">{fileNames[2]}</TableCell>
                <TableCell align="right">{fileNames[3]}</TableCell>
                <TableCell align="right">{'$' + parseFloat(fileNames[4]).toFixed(2)}</TableCell>
                <TableCell align="right">{fileLink}</TableCell>
              </TableRow>

            ))}
          
          {/* value={receiptRow}
            // onClick={selectRequest} */}
            

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
