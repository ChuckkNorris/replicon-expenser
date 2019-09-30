import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  image: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #D3D3D3",
    //boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "none",
    //boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function FilePreview(props) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const handleShowDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <a href="#" align="right" onClick={handleShowDialog}>
        {props.fileName}
      </a>
      {isOpen && (
        <dialog className={classes.paper} open onClick={handleShowDialog}>
          <img
            className={classes.image}
            src={props.fileLink}
            onClick={handleShowDialog}
            alt="no image"
          />
        </dialog>
      )}
    </div>
  );
}
