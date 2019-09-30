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
import ReceiptModal from "./ReceiptUpload";
import RepliconForm from "./RepliconForm";
import FilePreview from "./FilePreview";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import { DropzoneDialog } from "material-ui-dropzone";
import { useDropzone } from "react-dropzone";
import { DropzoneArea } from "material-ui-dropzone"; 
//import UploadReceipts from "../src/ReceiptModal";


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

export default ({ data, header }) => {
  // export default function EditTable() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [storedFiles, setFiles] = useState([]);

  const callBackFromTable = files => {
    {console.log("check this",files)}
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
    // console.log(names[0]);
  };

  const handleDelete = (index, file) => {
    let tempFile = [...file]
    if(index !== -1){
      tempFile.splice(index, 1);
      setFiles(tempFile)
      console.log('File: ', tempFile);
    }
    // console.log("this is the index we are at", index);
    // console.log("this is the row we are taking out", file);
    // setFiles(file.slice(index, 1));
    // console.log(file);
  };

  const handleEdit = (index, file) => {
    console.log("I want to edit this file", index)
  }

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSave = files => {
  //   // event.preventDefault();
  //   setOpen(false);
  //   props.callBackFromTable(files);
  // };

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
      <div>
        <ReceiptModal callBackFromTable={callBackFromTable} />
      {/* <DropzoneArea
        open={open}
        onDrop={handleSave}
        //onChange={handleChange}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviewsInDropzone={true}
        maxFileSize={5000000}
        onClose={handleClose}
        filesLimit={100}
      /> */}
    
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
          {storedFiles.map((file, index) => (
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
              <TableCell>
                                                                       
                <EditIcon onClick={() => handleEdit(index, file)}/>
                                                                 
                <DeleteIcon onClick={() => handleDelete(index, storedFiles)} />
                                                                 
                                                             
              </TableCell>
            </TableRow>
          ))}

          {/* value={receiptRow}
            // onClick={selectRequest} */}
        </TableBody>
      </Table>
      
    </Paper>
    </div>
  );
};

