import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import FormControl from 'react-bootstrap/FormControl'


export default function RepliconForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [encodedPassword, setEncodedPassword] = useState("");
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState({
    passwordError: "",
    descriptionError: "",
    clientError: "",
    projectError: ""
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [clientError, setClientError] = useState('');
  const [projectError, setProjectError] = useState('');
  const [initialState, setInitialState] = useState({
    email: "",
    password: "",
    description: "",
    client: "",
    project: ""
  });

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  const handleClientChange = event => {
    setClient(event.target.value);
  };
  const handleProjectChange = event => {
    setProject(event.target.value);
  };
  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  let isError = false;
  const validate = event => {
    
    let emailError = "";
    let passwordError = "";
    let descriptionError = "";
    let clientError = "";
    let projectError = "";
    // const errors = {
    //   emailError: "Email must include an '@'",
    //   passwordError: "",
    //   descriptionError: "",
    //   clientError: "",
    //   projectError: ""
    // };

    if (!email.includes("@")) {
      //alert("Email must include an '@'");
      setEmailError("Email must include an '@'")
      // return !isError;
    }

    if (!password > 0) {
      //alert("Password is empty");
      setPasswordError("Please input a password")
      // return !isError;
    }

    if (!description > 0) {
      //alert("Description is empty");
      setDescriptionError("Please input a description")
      // return !isError;
    }

    if (!client > 0) {
      //alert("Client is empty");
      setClientError("Please input a client")
      // return !isError;
    }

    if (!project > 0) {
      //alert("Project is empty");
      setProjectError("Please input a project")
      // return !isError;
    }

    if (!email.includes("@") || (!password > 0) || (!description > 0) || (!client > 0)|| (!project > 0)) {
      
      return !isError
    }

    if (isError === false) {
      setEmail("");
      setPassword("");
      setDescription("");
      setClient("");
      setProject("");
    }

    return isError;

  };

  const handleSubmit = event => {
    if (isError === false) {
      setEmailError("");
      setPasswordError("");
      setDescriptionError("");
      setClientError("");
      setProjectError("");
    }
    // alert("CLICKED");
    event.preventDefault();
    const isValid = validate(event);

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
     
    if (!isValid) {
      let files = props.wholeFile;
      let formData = new FormData();
      formData.append("email", email); //"muizz.soomar@credera.com"
      formData.append("password", password); //"RkBzdGNhcnMxMjM0"
      for (var x = 0; x < files.length; x++) {
        formData.append("receipts", files[x]);
        console.log("File num:" + x);
      }
      formData.append("description", description); //"Muizz is this going to wwork"
      formData.append("client", client); //"G&A"
      formData.append("project", project); //"Training"
      const response = axios({
        method: "post",
        url: "http://localhost:3005/api/create-expense-report",
        data: formData
      });
      setValid(true);
    }
  };
  return (
    <div>
      <Form noValidate onSubmit={handleSubmit} valid={valid}>
        <Form.Group controlId="email" bssize="large">
          <Form.Label> Email </Form.Label>{" "}
          <input
            autoFocus
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            // isValid={errors.emailError}
          />{" "}
          <div style={{ color: 'red' }}>{emailError}</div>
          {/* <Form.Control.Feedback type="invalid">
            Email must include an "@".
          </Form.Control.Feedback> */}
          <br />
        </Form.Group>{" "}
        <Form.Group controlId="password" bssize="large" >
          <Form.Label> Password </Form.Label>{" "}
          <input
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            required
            // isValid= {errors.passwordError}
          />
          <div style={{ color: 'red' }}>{passwordError}</div>
          {/* <Form.Control.Feedback type="valid">
            Please input a password.
          </Form.Control.Feedback> */}
          <br />
        </Form.Group>{" "}
        <Form.Group controlId="description" bssize="large">
          <Form.Label> Description </Form.Label>{" "}
          <input
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            type="description"
            isInvalid= {description.length > 0}
          />
          <div style={{ color: 'red' }}>{descriptionError}</div>
          {/* <Form.Control.Feedback type="invalid">
            Please input a description.
          </Form.Control.Feedback> */}
          <br />
        </Form.Group>{" "}
        <Form.Group controlId="client" bssize="large">
          <Form.Label> Client </Form.Label>{" "}
          <input
            placeholder="Client"
            value={client}
            onChange={handleClientChange}
            type="client"
            required
            // isValid = {errors.clientError}
          />
          <div style={{ color: 'red' }}>{clientError}</div>
          {/* <Form.Control.Feedback type="invalid">
            Please input a client.
          </Form.Control.Feedback> */}
          <br />
        </Form.Group>{" "}
        <Form.Group controlId="project" bssize="large">
          <Form.Label> Project </Form.Label>{" "}
          <input
            placeholder="Project"
            value={project}
            onChange={handleProjectChange}
            type="project"
            required
            // isValid = {errors.projectError}
          />
          <div style={{ color: 'red' }}>{projectError}</div>
          {/* <Form.Control.Feedback type="invalid">
            Please input a project.
          </Form.Control.Feedback> */}
          <br />
        </Form.Group>{" "}
        {/* <div class="text text-danger" role="alert" color={red}>
          {" "}
          <strong>Muizz wants me to do this</strong>
        </div> */}
        <button onClick={e => handleSubmit(e)}> Submit </button>{" "}
        {/* <button type="submit">Submit</button> */}
      </Form>{" "}
    </div>
  );
}
