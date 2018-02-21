import React, {Component} from 'react';
import axios from 'axios';
import TopNav from '../components/navbar';

import IDE from './IDE.js';
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header,
  Card,
  Divider,
  Container,
  Grid,
  Feed,
  Label,
  Form,
  Message,
  Modal,
  Tab,
  Input,
  TextArea,
  Accordion,
  Dimmer,
  Dropdown,
  Select,
  Checkbox,
} from 'semantic-ui-react'
import Markdown from 'react-remarkable';

const RandomNumber = (props) => {
  return (
    <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label="Minimum Value"/>
          <Form.Field control={Input} label="Maximum Value"/>
        </Form.Group>
        <Form.Field control={Input} label="No. of Instances"/>
        <Button secondary>Append</Button>
      </Form>
    </div>
  )
}
const RandomNumberMatrix = (props) => {
  return (
    <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label="Number of Rows"/>
          <Form.Field control={Input} label="Number of Columns"/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label="Minimum Value"/>
          <Form.Field control={Input} label="Maximum Value"/>
        </Form.Group>
        <Form.Field>
            <Checkbox label='Distinct Numbers' />
        </Form.Field>
        <Form.Field>
            <Checkbox label='Append N,M to top' />
        </Form.Field>



        <Form.Field control={Input} label="No. of Instances"/>
        <Button secondary>Append</Button>
      </Form>
    </div>
  )
}
const RandomCharMatrix = (props) => {
  return (
    <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label="Number of Rows"/>
          <Form.Field control={Input} label="Number of Columns"/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label="Allowed Characters"/>

        </Form.Group>
        <Form.Field>
            <Checkbox label='Distinct Characters' />
        </Form.Field>
        <Form.Field>
            <Checkbox label='Append N,M to top' />
        </Form.Field>
        <Form.Field>
            <Checkbox label='Seperate using space' />
        </Form.Field>



        <Form.Field control={Input} label="No. of Instances"/>
        <Button secondary>Append</Button>
      </Form>
    </div>
  )
}

class TestCases extends Component {
  constructor() {
    super();
    this.panes = [
      {
        menuItem: 'Number',
        render: () => (<div>
          <RandomNumber />
        </div>)
      }, {
        menuItem: 'Number Matrix',
        render: () => (<div>
          <RandomNumberMatrix />
        </div>)
      },
      {
        menuItem: 'Character Matrix',
        render: () => (<div>
          <RandomCharMatrix />
        </div>)
      },
    ]
  }
  render() {
    return (
      <div>
        <Tab menu={{
            secondary: true,
            color: 'blue',
            attached: false,
            fluid: true,
            vertical: true,
            tabular: 'right'
          }} panes={this.panes} />
      </div>
    )
  }
}

class General extends Component {
  constructor() {
    super();
      this.languages = [
        { key: 'C', text: 'C', value: 'c' },
        { key: 'C++', text: 'C++', value: 'c++' },
        { key: 'Java', text: 'Java', value: 'java' },
        { key: 'JavaScript', text: 'JavaScript', value: 'javascript' },
        { key: 'Python', text: 'Python', value: 'python' },
      ]
      this.timeoutoptions = [
        { key: '0.2', text: '20ms', value: '0.2' },
        { key: '0.4', text: '40ms', value: '0.4' },
        { key: '0.8', text: '80ms', value: '0.8' },
        { key: '1.0', text: '100ms', value: '1.0' },
      ]
      this.state = {
        md:'',
      }
      this.updateDocs = this.updateDocs.bind(this);

  }
  updateDocs(e) {
    this.setState({
      ...this.state,
      md:e.target.value,
    })
  }
  render() {
    return (
      <Grid divided='vertically' style={{
          padding: '20px'
        }}>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Container>
              <Form>
                <Form.Field control={Input} label="Unique ID"/>
                <Form.Field control={Input} label="Title"/>
                <TextArea placeholder="Problem Description " value={this.state.md} onChange={this.updateDocs} autoHeight/>
                <Divider horizontal>More Information</Divider>
                <Form.Group widths='equal'>
                  <Form.Field control={Input} label="Start Date" placeholder='DD-MM-YY'/>
                  <Form.Field control={Input} label="End Date" placeholder='DD-MM-YY'/>
                </Form.Group>
                <p><strong>Accepted Languages:</strong></p>
                <Dropdown placeholder='Languages' fluid multiple selection options={this.languages} />
                <p><strong>Timeout Duration:</strong></p>
                <Select placeholder='Select Timeout Duration' options={this.timeoutoptions}/>
              </Form>

            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container>
              Preview
              <Markdown>
                {this.state.md}
              </Markdown>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}


class CreateProblem extends Component {
  constructor(props) {
    super(props);
    this.panes = [
      {
        menuItem: 'General',
        render: () => (<Tab.Pane><General/></Tab.Pane>)
      }, {
        menuItem: 'Code',
        render: () => (<IDE buttons={
            <Button color='orange'>Compile Code</Button>
        }>
        <Button.Group>
          <Button color='teal' basic={true}>Save current code</Button>
          <Button color='black' basic={true}>Clear</Button>
        </Button.Group>
      </IDE>)
      }, {
        menuItem: 'Test Case Generator',
        render: () => (<Tab.Pane attached={false}>
          <TestCases />
        </Tab.Pane>)
      }, {
        menuItem: 'Test Cases',
        render: () => (<Tab.Pane attached={false}>
          <TestCases />
        </Tab.Pane>)
      }, {
        menuItem: 'Submit',
        render: () => (<Tab.Pane attached={false}>
          Validation
        </Tab.Pane>)
      }
    ]

  }
  render() {
    return (<div>
      <TopNav/>
      <Container style={{
          padding: '20px'
        }}>
        <Tab menu={{
            secondary: true,
            pointing: true,
            color: 'blue',
            attached: false,
            fluid: true
          }} panes={this.panes}/>
      </Container>

    </div>)
  }
}

export default CreateProblem;
