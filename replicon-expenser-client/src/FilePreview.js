import React, { useState } from "react";



export default class FilePreview extends React.Component {
  state = { isOpen: false };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("clicked");
  };

  

//   callBackFromTable = fileLink => {
//     var fileButton = fileLink;
//     //var data = names.split("_")
//   };

  render() {
    return (
      <div>
        <a href="#" align="right" onClick={this.handleShowDialog}> 
            Preview
        </a>
        {this.state.isOpen && (
          <dialog
            className="dialog"
            style={{ position: "absolute" }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image"
              src="./2019-09-24_Meal_Lunch_Chipotle_$23.65.png"
              onClick={this.handleShowDialog}
              alt="no image"
            />
          </dialog>
        )}
      </div>
    );
  }
}
