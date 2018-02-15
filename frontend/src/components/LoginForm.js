import React, { Component } from 'react';
import {Form, Container, Divider, Button, Segment, Message} from 'semantic-ui-react'


class LoginForm extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if(nextProps.status.loginFailed === true){
      this.setState({
        button: {
          loading: false,
          color: 'red'
        },
        showMessege: true,
        message: "Login Failed",
      })
    }
  }
  constructor() {
    super()
    this.state = {
      formStatus: 'new',
      univ_roll: null,
      password: null,
      button: {
        loading: false,
        color: 'blue'
      },
      message: "",
      showMessege: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit() {
    console.log(this.state);
    this.setState({
      button: {
        loading: true,
        color: 'black'
      }
    })
    this.props.loginAction({
        username: this.state.univ_roll,
        password: this.state.password,
      })
  }
  render() {
    return (
      <Segment color='red'>
        {this.state.showMessege?
          <Message negative>
            <p>{this.state.message}</p>
          </Message>
          :null
        }
        <Divider horizontal>
          Log In
        </Divider>
        <Form>
          <Form.Field>
            <label>University Roll No</label>
            <input
              name="univ_roll"
              onChange={this.handleInputChange}
              placeholder="Enter University Roll No" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onInput={this.handleInputChange}
              placeholder="Enter Password" />
          </Form.Field>
          <Divider />
          <Container textAlign='right'>
            <Button
              color={this.state.button.color}
              loading={this.state.button.loading}
              onClick={this.handleSubmit}>Log In</Button>
          </Container>
        </Form>
      </Segment>
    )
  }
}

export default LoginForm;
