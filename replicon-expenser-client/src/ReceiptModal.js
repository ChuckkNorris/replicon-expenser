import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DropzoneArea } from 'material-ui-dropzone';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function ReceiptModal() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Upload Receipts
            </button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Upload Receipts</h2>
                    <p id="simple-modal-description"> Please select the files of your receipts. 
                    </p>
                    <DropzoneArea 
                        allowMultiple={true}
                        acceptedFiles={['image/jpeg', 'image/png']}
                        showPreviews={true}
                        showFileNamesInPreview={true}
                        showFileNames={true}
                        showPreviewsInDropzone={false}
                        filesLimit={5}
                        />
                    <button type="button" onClick={handleClose}>Close</button>
                    <input type="submit" value="Submit" onSubmit={handleClose} />
                    
                </div>
            </Modal>
        </div>
    );
}