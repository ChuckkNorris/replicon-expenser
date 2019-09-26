import React, { useState } from "react";



export default function FilePreview(props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleShowDialog = () => {

    setIsOpen(!isOpen)
  };

    return (
      <div>
        <a href="#" align="right" onClick={handleShowDialog}> 
            {props.fileName}
        </a>
        {isOpen && (
          <dialog
            className="dialog"
            style={{ position: "absolute" }}
            open
            onClick={handleShowDialog}
          >
            <img
              className="image"
              src= {props.fileLink}
              onClick={handleShowDialog}
              alt="no image"
            />
          </dialog>
        )}
      </div>
    );
  
}
