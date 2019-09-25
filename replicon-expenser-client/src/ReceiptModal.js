import React, { useState, useCallback, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { DropzoneArea } from "material-ui-dropzone";
import { DropzoneDialog } from "material-ui-dropzone";
import { useDropzone } from "react-dropzone";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

//const createRow =

// export default function ReceiptModal() {
//  const classes = useStyles();
//  const [modalStyle] = useState(getModalStyle);
//  const [open, setOpen] = useState();
//  const acceptedFiles = useDropzone();

// const handleOpen = () => {
//     setOpen(true);
// };

// const handleClose = () => {
//     setOpen(false);
// };

// const handleSubmit = () => {
//     setOpen(false);
//     { console.log(acceptedFiles) }
// }

//     const handleFileChange = (files) => {
//         console.log("Files: ", files)
//     }

//     // validate = () => {
//     //     let isError = false;
//     //     const errors = {
//     //         dateIncurredError: "",
//     //         expenseTypeError: "",
//     //         purposeError: "",
//     //         placeError: "",
//     //         amountError: "",
//     //     };

//     //     if (isValidDate(this.state.dateIncurred))
//     //     { isError = true;
//     //         errors.dateIncurredError = "Please format the date YYYY-MM-DD"
//     //     }
//     //     if (this.state.expenseType = !NaN) {
//     //         isError = true;
//     //         errors.expenseTypeError = "Expense type cannot be a number"
//     //     }
//     //     if (purposeError = !NaN) {
//     //         isError = true;
//     //         errors.purposeError = "Purpose cannot be a number"
//     //     }
//     //     if (placeError = !NaN) {
//     //         isError = true;
//     //         errors.placeError = "Place cannot be a number"
//     //     }
//     //     if (amountError = NaN) {
//     //         isError = true;
//     //         errors.amountError = "Amount must be a number"
//     //     }
//     // }

//     return (
//         <div>
//             <button type="button" onClick={handleOpen}>
//                 Upload Receipts
//             </button>
//             <Modal
//                 aria-labelledby="simple-modal-title"
//                 aria-describedby="simple-modal-description"
//                 open={open}
//                 onClose={handleClose}
//             >
//                 <div style={modalStyle} className={classes.paper}>
//                     <h2 id="simple-modal-title">Upload Receipts</h2>
//                     <p id="simple-modal-description"> Please select the files of your receipts.
//                         </p>
//                     <DropzoneArea
//                         onChange={(files) => handleFileChange(files)}
//                         allowMultiple={true}
//                         acceptedFiles={['image/jpeg', 'image/png']}
//                         showPreviews={false}
//                         showFileNamesInPreview={false}
//                         showFileNames={false}
//                         showPreviewsInDropzone={true}
//                         filesLimit={50}
//                     />
//                     <div style={{ marginTop: "10%", textAlign: "right" }}>
//                         <button type="button" onClick={handleClose}>Close</button>
//                         <button value="Submit" onClick={handleSubmit}> Submit</button>
//                     </div>
//                 </div>
//                 {/* </div> */}

//             </Modal>
//         </div>
//     );
// }
export default function UploadReceipts(props) {
  const [open, setOpen] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = files => {
    setOpen(false);
    // this.props.handleSave(this.state);
    props.callBackFromTable(files);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Upload Receipts
      </button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        filesLimit={100}
    />
    </div>
  );
}
