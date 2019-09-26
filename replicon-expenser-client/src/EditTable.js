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
import FilePreview from "./FilePreview";

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
  const [image, setImage] = useState();
  const [open, setOpen] = useState(true);

  const callBackFromTable = files => {
    const fullName = files.map(files => files.name);
    const names = files.map(files => files.name.split("_"));
    setFileNames(names);
    setFileLink(fullName);
    setImage(files.name);
    //var data = names.split("_")
  };

  const onImageChange = () => {
    //   if (fileLink) {
    //       setImage({image: URL.createObjectURL(fileLink)
    //       });
    // }
    var binaryData = [];
    binaryData.push(fileLink);
    window.URL.createObjectURL(new Blob(binaryData, { type: "/png" }));
  };

  const createRow = event => {
    setReceiptRow(event.target.value);
  };

  const handleShowFile = () => {
    if (open == true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleCloseFile = () => {
    setOpen(false);
  };

  //const data = fileNames.split("_");

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
          {fileNames.map(fileNames => (
            <TableRow>
              <TableCell align="right">{fileNames[0]}</TableCell>
              <TableCell align="right">{fileNames[1]}</TableCell>
              <TableCell align="right">{fileNames[2]}</TableCell>
              <TableCell align="right">{fileNames[3]}</TableCell>
              <TableCell align="right">
                {"$" + parseFloat(fileNames[4]).toFixed(2)}
              </TableCell>
              <a href="#" src="./2019-09-24_Meal_Lunch_Chipotle_$23.65.png">
              <TableCell>{fileLink}</TableCell>
              </a>
              <TableCell>
                <FilePreview />
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
