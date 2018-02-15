import React, { Component } from 'react';
import { Form, Container, Divider, Button, Segment, Select } from 'semantic-ui-react'


export default class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {...this.state,
                  stream_options: [
                    { key: 'cse', text: 'CSE', value: 'cse' },
                    { key: 'it', text: 'IT', value: 'it' },
                  ]
                }
  }
  render() {
    return (
      <Segment color='teal'>
        <Divider horizontal>
          Register
        </Divider>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder="Name" />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Input fluid label="University Roll No" placeholder="1100xxxxxxx" />
            <Form.Input fluid label="Class Roll No" placeholder="Enter Class Roll No" />
            <Form.Field control={Select} label='Stream' options={this.state.stream_options} placeholder='Stream' />

          </Form.Group>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder="Enter Password" />
          </Form.Field>
          <Form.Field>
            <label>Re-Enter Password</label>
            <input type="password" placeholder="Enter Password Again" />
          </Form.Field>
          <Divider />
          <Container textAlign='right'>
            <Button color='teal'>Register</Button>
          </Container>
        </Form>
      </Segment>
    )
  }
}
