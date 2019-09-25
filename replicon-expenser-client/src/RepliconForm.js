import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class RepliconForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      description: "",
      client: "",
      project: ""
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.description.length > 0 &&
      this.state.client.length > 0 &&
      this.state.project.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="RepliconForm">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <label>Email </label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <label>Password</label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="description" bsSize="large">
            <label>Description</label>
            <Form.Control
              value={this.state.description}
              onChange={this.handleChange}
              type="description"
            />
          </Form.Group>
          <Form.Group controlId="client" bsSize="large">
            <label>Client</label>
            <Form.Control
              value={this.state.client}
              onChange={this.handleChange}
              type="client"
            />
          </Form.Group>
          <Form.Group controlId="project" bsSize="large">
            <label>Project</label>
            <Form.Control
              value={this.state.project}
              onChange={this.handleChange}
              type="project"
            />
          </Form.Group>
          <button type="button">Submit</button>
        </Form>
      </div>
    );
  }
}
