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
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

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

// const information = (x, i, header) => (
//   <TableRow key={`tr-${i}`}>
//     {header.map((y, k) => (
//       <TableRowColumn key={`trc-${k}`}>{x[y.prop]}</TableRowColumn>
//     ))}
//   </TableRow>
// );

const index123 = 0;

export default ({ data, header }) => {
  // export default function EditTable() {
  const classes = useStyles();

  const [fileNames, setFileNames] = useState([]);
  const [receiptRow, setReceiptRow] = useState([]);
  const [fileLink, setFileLink] = useState([]);

  const callBackFromTable = files => {
    const fullName = files.map(files => files.name);
    const names = files.map(files => files.name.split("_"));
    console.log("this is the names", names);
    setFileNames(names);
    setFileLink(fullName);
    //var data = names.split("_")
    console.log(names[0]);
  };

  const createRow = event => {
    setReceiptRow(event.target.value);
  };

  const handleDelete = index => {
    console.log(index);
    fileNames.splice(index, 1);
    console.log(fileNames);
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
          </TableRow>
        </TableHead>

        <TableBody
          inputProps={{
            dateIncurred: "receiptRow.dateIncurred",
            expenseType: "receiptRow.expenseType",
            purpose: "receiptRow.purpose",
            place: "receiptRow.place",
            amount: "receiptRow.amount",
            files: "receiptRow.files"
          }}
        >
          {/* {data.map((x, i) => information(x, i, header))} */}
          {fileNames.map((fileNames, index) => (
            <TableRow>
              {console.log(index)}
              <TableCell> key = {`trc-${index}`}</TableCell>
              <TableCell align="right">{fileNames[0]}</TableCell>
              <TableCell align="right">{fileNames[1]}</TableCell>
              <TableCell align="right">{fileNames[2]}</TableCell>
              <TableCell align="right">{fileNames[3]}</TableCell>
              <TableCell align="right">
                {"$" + parseFloat(fileNames[4]).toFixed(2)}
              </TableCell>
              <TableCell align="right">{fileLink}</TableCell>
              <TableCell>
                <Fab
                  color="secondary"
                  aria-label="edit"
                  className={classes.fab}
                  //   onClick={() => handleEdit(index)}
                >
                  <EditIcon />
                </Fab>
                <Fab
                  color="primary"
                  aria-label="delete"
                  className={classes.fab}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
          {/* value={receiptRow}
            // onClick={selectRequest} */}
        </TableBody>
      </Table>
      <ReceiptModal callBackFromTable={callBackFromTable} />
    </Paper>
  );
};
