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
  const [wholeFile, setWholeFile] = useState();

  const callBackFromTable = files => {
    console.log("check this", files);
    setWholeFile(files);
    setFiles(
      files.map(file => {
        return {
          Name: file.name,
          NameParts: file.name.split("_"),
          Link: window.URL.createObjectURL(file)
        };
      })
    );
  };

  const handleDelete = (index, file) => {
    var tempFile = [...file];
    if (index !== -1) {
      tempFile.splice(index, 1);
      setFiles(tempFile);
      console.log("File:", tempFile);
    }
    console.log("Index: ", index);
  };

  return (
    <div>
      <Paper>
        <RepliconForm wholeFile={wholeFile} />
        <ReceiptUpload callBackFromTable={callBackFromTable} />
        <Table>
          <TableHead>
            <TableRow>
              {header.map((x, i) => (
                <TableCell key={`thc-${i}`}>{x.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          {storedFiles.map((file, index) => (
            <TableRow>
              <TableCell align="right">{file.NameParts[index]}</TableCell>
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
                                                                       
                <EditIcon />
                {/* onClick={() => handleEdit(index, file)} */}
                                                                 
                <DeleteIcon onClick={() => handleDelete(index, storedFiles)} />
                                                                 
                                                             
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Paper>
    </div>
  );
};
