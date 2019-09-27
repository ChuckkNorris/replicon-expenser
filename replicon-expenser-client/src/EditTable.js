// import React from "react";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ReceiptModal from "./ReceiptModal";
import FilePreview from "./FilePreview";
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

export default ({ data, header }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [storedFiles, setFiles] = useState([]);

  const callBackFromTable = files => {
    //Input File and split file into array of elements
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
    file.splice(index, 1);
    console.log(file);
  };

  return (
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
        //   inputProps={{
        //     dateIncurred: "receiptRow.dateIncurred",
        //     expenseType: "receiptRow.expenseType",
        //     purpose: "receiptRow.purpose",
        //     place: "receiptRow.place",
        //     amount: "receiptRow.amount",
        //     files: "receiptRow.files"
        //   }}
        >
          {storedFiles.map((file, index) => (
            <TableRow>
              <TableCell align="right">{file.NameParts[index]}</TableCell>
              {/* <TableCell align="right">{file.NameParts[1]}</TableCell>
              <TableCell align="right">{file.NameParts[2]}</TableCell>
              <TableCell align="right">{file.NameParts[3]}</TableCell>
              <TableCell align="right">
                {"$" + parseFloat(file.NameParts[4]).toFixed(2)}
              </TableCell>
              <TableCell>
                <FilePreview fileLink={file.Link} fileName={file.Name} />
              </TableCell> */}
              <TableCell>
                                                              
                <Fab
                  color="secondary"
                  aria-label="edit"
                  className={classes.fab} //
                  //   onClick={() => handleEdit(index)}
                >
                                                                         
                  <EditIcon />
                                                                    
                </Fab>
                                                               
                <Fab
                  color="primary"
                  aria-label="delete"
                  className={classes.fab}
                  onClick={() => handleDelete(index, storedFiles)}
                >
                                                                     
                  <DeleteIcon />
                                                                   
                </Fab>
                                                             
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ReceiptModal callBackFromTable={callBackFromTable} />
    </Paper>
  );
};
