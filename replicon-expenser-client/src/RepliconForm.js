import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios';

export default function RepliconForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [encodedPassword, setEncodedPassword] = useState("");
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");

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

  const handleSubmit = event => {
    event.preventDefault();
    console.log('WholeFile: ', props.wholeFile);
    axios({
          method: 'post',
          url: `http://localhost:3005/api/create-expense-report`,
          headers: {
            //   //   //figure out how to configure this
            'Content-Type': "application/form-data; charset=utf-8"
             },
          data: {
            description: "test",
            client: "G&A",
            project: "Training",
            receiptFiles: props.wholeFile, // link to files
            // receiptFiles: storedFiles,
            email: "megan.moore@credera.com",
            password: "JGNvdXRFbGxpZTEh"
        }
      })
    // axios({
    //   method: "POST",
    //   url: `https://localhost:3005/api/create-expense-report`, 
    //   // headers: {
    //   //   //figure out how to configure this
    //   //   "Content-Type": "application/form-data; charset=utf-8"
    //   // },
    //   data: {
    //     "description": "test",
    //     "client": "G&A",
    //     "project": "Training",
    //     "receiptFiles": props.storedFiles, // link to files
    //     // receiptFiles: storedFiles,
    //     "email": "megan.moore@credera.com",
    //     "password": "JGNvdXRFbGxpZTEh"
    //   }
    // })
      //.then(response => response.json())
      .then(response => {
        console.log("Response: ",response);
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
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bssize="large">
          <label>Email </label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
        </Form.Group>
        <Form.Group controlId="password" bssize="large">
          <label>Password</label>
          <Form.Control
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
          <br />
        </Form.Group>
        <Form.Group controlId="description" bssize="large">
          <label>Description</label>
          <Form.Control
            value={description}
            onChange={handleDescriptionChange}
            type="description"
          />
          <br />
        </Form.Group>
        <Form.Group controlId="client" bssize="large">
          <label>Client</label>
          <Form.Control
            value={client}
            onChange={handleClientChange}
            type="client"
          />
          <br />
        </Form.Group>
        <Form.Group controlId="project" bssize="large">
          <label>Project</label>
          <Form.Control
            value={project}
            onChange={handleProjectChange}
            type="project"
          />
          <br />
        </Form.Group>
        <button onClick={e => handleSubmit(e)}>Submit</button>
      </Form>
    </div>
  );
}
// export default class RepliconForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//       description: "",
//       client: "",
//       project: ""
//     };
//   }

//   validateForm() {
//     return (
//       this.state.email.length > 0 &&
//       this.state.password.length > 0 &&
//       this.state.description.length > 0 &&
//       this.state.client.length > 0 &&
//       this.state.project.length > 0
//     );
//   }

//   handleChange = event => {
//     this.setState({
//       [event.target.id]: event.target.value
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//   };

//   render() {
//     return (
//       <div className="RepliconForm">
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Group controlId="email" bsSize="large">
//             <label>Email </label>
//             <Form.Control
//               autoFocus
//               type="email"
//               value={this.state.email}
//               onChange={this.handleChange}
//             />
//             <br />
//           </Form.Group>
//           <Form.Group controlId="password" bsSize="large">
//             <label>Password</label>
//             <Form.Control
//               value={this.state.password}
//               onChange={this.handleChange}
//               type="password"
//             />
//             <br />
//           </Form.Group>
//           <Form.Group controlId="description" bsSize="large">
//             <label>Description</label>
//             <Form.Control
//               value={this.state.description}
//               onChange={this.handleChange}
//               type="description"
//             />
//             <br />
//           </Form.Group>
//           <Form.Group controlId="client" bsSize="large">
//             <label>Client</label>
//             <Form.Control
//               value={this.state.client}
//               onChange={this.handleChange}
//               type="client"
//             />
//             <br />
//           </Form.Group>
//           <Form.Group controlId="project" bsSize="large">
//             <label>Project</label>
//             <Form.Control
//               value={this.state.project}
//               onChange={this.handleChange}
//               type="project"
//             />
//             <br />
//           </Form.Group>
//         </Form>
//       </div>
//     );
//   }
// }
