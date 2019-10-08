// import React from "react";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ReceiptUpload from "./ReceiptUpload";

import FilePreview from "./FilePreview";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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

export default ({ data, header }) => {
  // export default function EditTable() {
  const [storedFiles, setFiles] = useState([]);
  const [wholeFile, setWholeFile] = useState([{}]);
  const [fileNames, setfileNames] = useState();
  const [tempFiles, setTempFiles] = useState([]);

  const [editFiles, setEditFiles] = useState([]);


  const callBackFromTable = files => {

    setWholeFile(files);
    setTempFiles(files);
    console.log("this is the files:", files)

    files.map((tempfile, i) => {
      console.log("File from the file list:", tempfile)
      if (tempFiles.filter(x => x.name === tempfile.name).length >= 1) {
        console.log("here is tempfile, what we are using to check (main):", tempfile)
        console.log("The File:", tempFiles, "already exists")


      }
      else {
        console.log("The File:", tempFiles, "does not exist")
        console.log("putting", tempfile, "into Stored Files");
        setFiles(         //run setFiles so that storedFiles is updated
          files.map(file => {
            return {
              Name: file.name,
              NameParts: file.name.split("_"),
              Link: window.URL.createObjectURL(file)
            };
          })
        );
      }
    })
  };
  console.log("Whole File:", wholeFile)
  console.log("Stored Files", storedFiles);



  const handleDelete = (index, file) => {
    var tempFile = [...file];
    if (index !== -1) {
      tempFile.splice(index, 1);
      setFiles(tempFile);
      console.log("storedFiles:", storedFiles)
      console.log("File:", tempFile);
    }
    console.log("Index: ", index);
  };


  const handleEdit = (index, file) => {
    var editFile = [...storedFiles];
    console.log("Index:", index);
    console.log("File:", editFile);
    setFiles(editFiles)
    console.log("this should be populated", storedFiles);
    console.log("editFile:", editFile[index])


  };


  return (
    <div>
      <Paper>
        <RepliconForm
          wholeFile={wholeFile}
          storedFiles={storedFiles}
          fileNames={fileNames}
        />{" "}
        <ReceiptUpload callBackFromTable={callBackFromTable} />{" "}
        <Table>
          <TableHead>
            <TableRow>
              {" "}
              {header.map((x, i) => (
                <TableCell key={`thc-${i}`}> {x.name} </TableCell>
              ))}{" "}
            </TableRow>{" "}
          </TableHead>
          {storedFiles.map((file, index) => (
            <TableRow>
              <TableCell align="right"> {file.NameParts[0]} </TableCell>{" "}
              <TableCell align="right"> {file.NameParts[1]} </TableCell>{" "}
              <TableCell align="right"> {file.NameParts[2]} </TableCell>{" "}
              <TableCell align="right"> {file.NameParts[3]} </TableCell>{" "}
              <TableCell align="right">
                {" "}
                {"$" + parseFloat(file.NameParts[4]).toFixed(2)}{" "}
              </TableCell>{" "}
              <TableCell>
                <FilePreview fileLink={file.Link} fileName={file.Name} />{" "}
              </TableCell>{" "}
              <TableCell>
                {/* <EditIcon onClick={() => handleEdit(index, storedFiles)} /> */}
                <EditIcon onClick={() => handleEdit(index, storedFiles)} />
                <DeleteIcon onClick={() => handleDelete(index, storedFiles)} />
              </TableCell>
            </TableRow>
          ))}{" "}
        </Table>{" "}
      </Paper>{" "}
    </div>
  );
};
