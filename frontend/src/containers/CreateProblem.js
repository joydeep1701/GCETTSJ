import React, {Component} from 'react';
import axios from 'axios';
import TopNav from '../components/navbar';

import IDE from './IDE.js';
import {
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header,
  Divider,
  Container,
  Grid,
  Label,
  Form,
  Message,
  Modal,
  Tab,
  Input,
  TextArea,
  Accordion,
  Dropdown,
  Select,
  Checkbox,
} from 'semantic-ui-react'
import Markdown from 'react-remarkable';

const randInt = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

const RandomNumberGenerator = function(min, max, iterations) {
  min = parseInt(min,10);
  max = parseInt(max,10);
  iterations = parseInt(iterations,10);
  var op = '';
  for (var i = 0; i < iterations; i++) {
    op += `${randInt(min,max)}
`
  }
  console.log(op);
  return op;
}

class RandomNumber extends Component {
  constructor() {
    super();
    this.state = {
      min:0,
      max:100,
      iter:1,
    }
    this.updateValue = this.updateValue.bind(this);
  }
  updateValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field value={this.state.min} name="min" onChange={this.updateValue} control={Input} label="Minimum Value"/>
            <Form.Field value={this.state.max} name="max" onChange={this.updateValue} control={Input} label="Maximum Value"/>
          </Form.Group>
          <Form.Field value={this.state.iter} name="iter" onChange={this.updateValue} control={Input} label="No. of Instances"/>
          <Button secondary onClick={() => {RandomNumberGenerator(this.state.min,this.state.max,this.state.iter)}}>Append</Button>
        </Form>
      </div>
    )
  }
}
const RandomNumberMatrixGenerator = function(rows,cols,min,max,dist,append,iterations) {
  rows=parseInt(rows,10);
  cols=parseInt(cols,10);
  min=parseInt(min,10);
  max=parseInt(max,10);
  iterations=parseInt(iterations,10);
  var op = '';
  for (var i = 0; i < iterations; i++) {
    op += `${rows} ${cols}
`
    for (var j = 0; j < rows; j++) {
      for (var k = 0; k < cols; k++) {
        op += `${randInt(min,max)}`
        op += " "
      }
      (j !== rows-1 )? op += `\n`: op += ``;
    }
    op += `\n`;
  }
  console.log(op);
  return op;
}

class RandomNumberMatrix extends Component{
  constructor() {
    super();
    this.state = {
      rows: 1,
      cols: 1,
      min: 1,
      max: 100,
      dist: false,
      append: true,
      iter: 1,
    }
    this.updateValue = this.updateValue.bind(this);
  }
  updateValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field value={this.state.rows} name="rows" onChange={this.updateValue} control={Input} label="Number of Rows"/>
            <Form.Field value={this.state.cols} name="cols" onChange={this.updateValue} control={Input} label="Number of Columns"/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field value={this.state.min} name="min" onChange={this.updateValue} control={Input} label="Minimum Value"/>
            <Form.Field value={this.state.max} name="max" onChange={this.updateValue} control={Input} label="Maximum Value"/>
          </Form.Group>
          <Form.Field>
              <Checkbox checked={this.state.dist} name="dist" onChange={this.updateValue} label='Distinct Numbers' />
          </Form.Field>
          <Form.Field>
              <Checkbox checked={this.state.append} name="append" onChange={this.updateValue} label='Append N,M to top' />
          </Form.Field>
          <Form.Field value={this.state.iter} name="iter" onChange={this.updateValue} control={Input} label="No. of Instances"/>

          <Button onClick={() => {RandomNumberMatrixGenerator(this.state.rows,this.state.cols,this.state.min,this.state.max,this.state.dist,this.state.append,this.state.iter)}} secondary>Append</Button>
        </Form>
      </div>
    )
  }
}
const RandomCharMatrixGenerator = function(rows,cols, allowedchars, dist, append, sep, iterations) {
  var op = ``;
  for (var i = 0; i < iterations; i++) {
    append===true?op += `${rows} ${cols}\n`:op+='';
    for (var j = 0; j < rows; j++) {
      for (var k = 0; k < cols; k++) {
        op += ascii_map[randInt(65,122)];
        sep===true?op+=' ':op+='';
      }
      (j !== rows-1 )? op += `\n`: op += ``;
    }
    op += `\n`;
  }
  console.log(op);
  return op;
}
const ascii_map = {
  65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',75:'K',
  76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',85:'U',86:'V',
  87:'W',88:'X',89:'Y',90:'Z',91:'@',92:'/',93:'#',94:'$',95:'&',96:'+',97:'a',
  98:'b',99:'c',100:'d',101:'e',102:'f',103:'g',104:'h',105:'i',106:'j',107:'k',
  108:'l',109:'m',110:'n',111:'o',112:'p',113:'q',114:'r',115:'s',116:'t',117:'u'
  ,118:'v',119:'w',120:'x',121:'y',122:'z',
}
class RandomCharMatrix extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label="Number of Rows"/>
            <Form.Field control={Input} label="Number of Columns"/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={TextArea} label="Allowed Characters" value={JSON.stringify(ascii_map)} autoHeight={true} disabled={true}/>

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
          <Button secondary onClick={() => {RandomCharMatrixGenerator(4,3,'',false,true,false,5)}}>Append</Button>
        </Form>
      </div>
    )
  }
}

const TestCases = (props) => {
  return (
    <div>
      <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <p>STDIN # </p>
              <Form>
                <TextArea disabled={true}/>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <p>STDOUT # </p>
              <Form>
                <TextArea disabled={true}/>
              </Form>
            </Grid.Column>
          </Grid.Row>


      </Grid>
    </div>
  )
}

class TestCaseGenerator extends Component {
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
    this.props.updateValue({target:{name:'description',value:e.target.value}})
  }
  render() {
      console.log(this.props);
    return (
      <Grid divided='vertically' style={{
          padding: '20px'
        }}>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Container>
              <Form>

                <Form.Field control={Input} label="Title" name='title' onChange={this.props.updateValue} value={this.props.state.title}/>
                <Form.Field>
                  <TextArea placeholder="Problem Description " value={this.props.state.description} onChange={this.updateDocs} autoHeight/>
                </Form.Field>

                <Form.Group widths='equal'>
                  <Form.Field control={Input} label="Unique ID"/>
                  <Form.Field control={Input} label="No. of Test Cases" placeholder=''/>
                </Form.Group>
                <Divider horizontal>More Information</Divider>
                <Form.Group widths='equal'>
                  <Form.Field control={Input} label="Start Date" placeholder='DD-MM-YY'/>
                  <Form.Field control={Input} label="End Date" placeholder='DD-MM-YY'/>
                </Form.Group>
                <p><strong>Accepted Languages:</strong></p>
                <Form.Dropdown placeholder='Languages' fluid multiple selection options={this.languages} onChange={(e,d) => {console.log(d.value)}} />
                <p><strong>Timeout Duration:</strong></p>
                <Select placeholder='Select Timeout Duration' options={this.timeoutoptions} onChange={(e,d) => {console.log(d.value)}}/>
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
    this.state = {
      title:'',
      description:'',
      prob_uid:'',
      n_test_cases: '',
      start_date: '',
      end_date: '',
      languages: '',
      timeout: '',
      code:'',
      test_case_arr: [],
      test_cases: [],
    }
    this.panes = [
      {
        menuItem: 'General',
        render: () => (
          <Tab.Pane>
            <General updateValue={this.updateValue} state={this.state}/>
          </Tab.Pane>)
      }, {
        menuItem: 'Code',
        render: () => (
          <IDE buttons={
            <Button color='orange'>Compile Code</Button>
          } updateCode={this.updateCode}>
            <Button.Group>
              <Button color='teal' basic={true}>Save current code</Button>
              <Button color='black' basic={true}>Clear</Button>
            </Button.Group>
          </IDE>)
      }, {
        menuItem: 'Test Case Generator',
        render: () => (
        <div>
          <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <TestCaseGenerator />
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    Format
                  </Segment>
                </Grid.Column>
              </Grid.Row>
          </Grid>



        </div>)
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
    ];
    this.updateCode = this.updateCode.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }
  updateCode = (code) => {
    this.setState({
      ...this.state,
      code: code,
    });
  }
  updateValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
    console.log(this.state);
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
