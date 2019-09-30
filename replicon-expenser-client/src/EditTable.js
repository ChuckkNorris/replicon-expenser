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

import FilePreview from "./FilePreview";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import Form from "react-bootstrap/Form";
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [encodedPassword, setEncodedPassword] = useState('');
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');

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
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
}

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
}


  const handleClientChange = (event) => {
    setClient(event.target.value);
}

  const handleProjectChange = (event) => {
    setProject(event.target.value);
}

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
}

  const handleDelete = (index, file) => {
    var tempFile = [...file];
    if (index !== -1) {
       tempFile.splice(index, 1);
       setFiles(tempFile);
    console.log('File:',tempFile);
    }
    
    console.log("Index: ",index);
    
    //console
    //setFiles(file.splice(index, 1));
  };

  // async function submitExpense() {
  //   console.log(`Verify Expense\nemail: ${email}\npassword: ${encodedPassword}\nclient: ${client}\nproject: ${project}\n
  //               description: ${description}\nreceiptFiles: ${storedFiles}`)  
  //       axios({
  //           method: 'post',
  //           url: `https://replicon-expenser-api.azurewebsites.net/api/create-expense-report`,
  //           data: {
  //             "email": email,
  //             "password": encodedPassword,
  //             "client": client,
  //             "project": project,
  //             "description": description,
  //             "receiptFiles": storedFiles
  //           }
  //       }).then(response => {
  //         console.log(response);
  //       }, (error) => {
  //         console.log(error);
  //       });;
  // }

  const handleSubmit = (event) => {
      console.log("Button Clicked");
      fetch(`https://localhost:3000/api/create-expense-report`, {
        method: "POST",
        headers: {
          //figure out how to configure this
          "Content-Type": "application/form-data; charset=utf-8"
        },
        body: JSON.stringify({
          description: "test",
          client: "G&A",
          project: "handy",
          receiptFiles: storedFiles, // link to files
          // receiptFiles: storedFiles,
          email: "muizz.soomar@credera.com",
          password: "RkBzdGNhcnMxMjM="
        })
      })
        .then(response => response.json())
        .then(response => {
          console.log(response.message);
          // if (response.message === true) {
          //   console.log('reciepts have been uploaded');
          //   let set = response.set;
          //   set.key = set._id;
          //   this.getSets();
          // } else {
          //   console.log('reciepts are not uploaded');
          // }
        })
        .catch(error => {
          console.log("Could not save set!");
          console.log(error);
        });
    };



  return (

    <Paper>
      {/* <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <label>Email </label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <label>Password</label>
            <Form.Control
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            <br />
          </Form.Group>
          <Form.Group controlId="description" bsSize="large">
            <label>Description</label>
            <Form.Control
              value={description}
              onChange={handleDescriptionChange}
              type="description"
            />
            <br />
          </Form.Group>
          <Form.Group controlId="client" bsSize="large">
            <label>Client</label>
            <Form.Control
              value={client}
              onChange={handleClientChange}
              type="client"
            />
            <br />
          </Form.Group>
          <Form.Group controlId="project" bsSize="large">
            <label>Project</label>
            <Form.Control
              value={project}
              onChange={handleProjectChange}
              type="project"
            />
            <br />
          </Form.Group>
        </Form>
      <button onClick={(e) => handleSubmit(e)}>
        Submit
      </button> */}
      <RepliconForm storedFiles={storedFiles}/>
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

          {/* value={receiptRow}
            // onClick={selectRequest} */}
        </TableBody>
      </Table>
      <ReceiptModal callBackFromTable={callBackFromTable} />
    </Paper>
  );
};
