import React, { useState} from "react";
import { DropzoneArea } from "material-ui-dropzone";

export default function UploadReceipts(props) {
  const [open, setOpen] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = files => {
    // event.preventDefault();
    setOpen(false);
    props.callBackFromTable(files);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
   
      <DropzoneArea
        open={open}
        onChange={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviewsInDropzone={false}        
        maxFileSize={5000000}
        onClose={handleClose}
        filesLimit={100}
      />
    </div>
  );
}
