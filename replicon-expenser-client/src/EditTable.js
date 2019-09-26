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
  //   const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [storedFiles, setFiles] = useState([]);

  const callBackFromTable = files => {
    setFiles(
      files.map(file => {
        return {
          Name: file.name,
          NameParts: file.name.split("_"),
          Link: window.URL.createObjectURL(file)
        };
      })
    );
    //var data = names.split("_")
    console.log(names[0]);
  };

  // const onImageChange = () => {
  //     if (fileLink) {
  //         setImage({image: URL.createObjectURL(fileLink)
  //         });
  //   }
  //   var binaryData = [];
  //   binaryData.push(fileLink);
  //   window.URL.createObjectURL(new Blob(binaryData, { type: "/png" }));
  // };

  // const createRow = event => {
  //   setReceiptRow(event.target.value);
  // };

  // const handleShowFile = () => {
  //   if (open == true) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // };

  // const handleCloseFile = () => {
  //   setOpen(false);
  // };

  //const data = fileNames.split("_");

  //console.log("File Names: ", fileNames);

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
          {storedFiles.map(file => (
            <TableRow>
              <TableCell align="right">{file.NameParts[0]}</TableCell>
              <TableCell align="right">{file.NameParts[1]}</TableCell>
              <TableCell align="right">{file.NameParts[2]}</TableCell>
              <TableCell align="right">{file.NameParts[3]}</TableCell>
              <TableCell align="right">
                {"$" + parseFloat(file.NameParts[4]).toFixed(2)}
              </TableCell>
              <TableCell>
                <FilePreview fileLink={file.Link} fileName={file.Name} />
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
