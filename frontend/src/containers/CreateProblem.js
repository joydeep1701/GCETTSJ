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

import General from './CreateProblem/General'


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
  //console.log(op);
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
    this.updateTestCases = this.updateTestCases.bind(this);
  }
  updateValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
    //console.log(this.state);
  }
  updateTestCases = (args) => {
    //console.log("updateTestCases Base");
    this.props.updateTestCases(RandomNumberGenerator,args)
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
          <Button secondary onClick={
            () => {this.updateTestCases([
                    this.state.min,this.state.max,this.state.iter]
                  )}}>Append</Button>
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
  //console.log(op);
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
    this.updateTestCases = this.updateTestCases.bind(this);

  }
  updateValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
    //console.log(this.state);
  }
  updateTestCases = (args) => {
    //console.log("updateTestCases Base");
    this.props.updateTestCases(RandomNumberMatrixGenerator,args)
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

          <Button onClick={() => {
            this.updateTestCases([
              this.state.rows,this.state.cols,this.state.min,this.state.max,
              this.state.dist,this.state.append,this.state.iter
            ])
          }} secondary>Append</Button>
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
  //console.log(op);
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
      rows: 1,
      cols: 1,
      dist: false,
      append: true,
      seperate: true,
      iter: 1,
    }
    this.updateValue = this.updateValue.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
    this.updateTestCases = this.updateTestCases.bind(this);
  }
  updateValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
    //console.log(this.state);
  }
  setBoolean(name, value) {
    this.setState({[name]: value})
  }
  updateTestCases = (args) => {
    //console.log("updateTestCases Base");
    this.props.updateTestCases(RandomCharMatrixGenerator,args)
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} name="rows" onChange={this.updateValue} value={this.state.rows} label="Number of Rows"/>
            <Form.Field control={Input} name="cols" onChange={this.updateValue} value={this.state.cols} label="Number of Columns"/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={TextArea} label="Allowed Characters" value={JSON.stringify(ascii_map)} autoHeight={true} disabled={true}/>

          </Form.Group>
          <Form.Field>
              <Checkbox name="dist" onChange={this.updateValue} checked={this.state.dist} label='Distinct Characters' />
          </Form.Field>
          <Form.Field>
              <Checkbox name="append" onChange={() => {this.setBoolean('append',!this.state.append)}} checked={this.state.append} label='Append N,M to top' />
          </Form.Field>
          <Form.Field>
              <Checkbox name="seperate" onChange={() => {this.setBoolean('seperate',!this.state.seperate)}} checked={this.state.seperate} label='Seperate using space' />
          </Form.Field>
          <Form.Field name="iter" onChange={this.updateValue} control={Input} value={this.state.iter} label="No. of Instances"/>

          <Button secondary onClick={
            () => {this.updateTestCases([
                    this.state.rows, this.state.cols, '',
                    this.state.dist, this.state.append, this.state.seperate,
                    this.state.iter
                  ])
                }
            }>Append</Button>
        </Form>
      </div>
    )
  }
}

const TestCase = (props) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <p>STDIN #{props.tcid} </p>
        <Form>
          <TextArea disabled={true} value={props.stdin}/>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <p>STDOUT #{props.tcid} </p>
        <Form>
          <TextArea disabled={true} value={props.stdout}/>
        </Form>
      </Grid.Column>
    </Grid.Row>
  )

}

const TestCases = (props) => {

  return (
    <div>
      <Button color='teal' onClick={props.genEvalTestCases}>Generate & Evaluate Test Cases</Button>
      <Grid columns={2} divided padded={true}>
        {
          props.state.test_cases.map(function(tc,i){
            return(
              <TestCase stdin={tc.stdin} stdout={tc.stdout} key={i} tcid={i}/>
            )
          })
        }

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
          <RandomNumber updateTestCases={this.props.updateTestCases} />
        </div>)
      }, {
        menuItem: 'Number Matrix',
        render: () => (<div>
          <RandomNumberMatrix updateTestCases={this.props.updateTestCases} />
        </div>)
      },
      {
        menuItem: 'Character Matrix',
        render: () => (<div>
          <RandomCharMatrix updateTestCases={this.props.updateTestCases} />
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




class CreateProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      description:'',
      prob_uid:'',
      n_test_cases: 5,
      start_date: '',
      end_date: '',
      languages: [],
      timeout: '',
      code:`#include <stdio.h>

int main(void) {
    printf("OK");
}`,
      test_case_generator: [],
      test_case_generator_args : [],
      ide: {
        compiling: false,
        uid: '',
        errors: '',
        error: '',
      },
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
          <div>
            {this.state.ide.errors?
              <Message error={true}>
                <Form>
                  <TextArea value={this.state.ide.error} autoHeight={true} disabled={true} />
                </Form>
              </Message>
              :
              <p></p>
            }
            <IDE buttons={
              <Button color='orange' loading={this.state.ide.compiling}
                onClick={() => this.compileCode()}>Compile Code</Button>
            } updateCode={this.updateCode} value={this.state.code}>
              <Button.Group>
                <Button color='teal' basic={true}>Save current code</Button>
                <Button color='black' basic={true}>Clear</Button>
              </Button.Group>
            </IDE>
        </div>)
      }, {
        menuItem: 'Test Case Generator',
        render: () => (
        <div>
          <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <TestCaseGenerator updateTestCases={this.updateTestCases}/>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    Sample Test Case
                    <Form>
                      <Form.Field>
                          <TextArea value={this.generateTestCase()} disabled={true} autoHeight={true}/>
                      </Form.Field>
                      <Button color='red' onClick={this.clearTestCases}>Clear</Button>
                    </Form>

                  </Segment>
                </Grid.Column>
              </Grid.Row>
          </Grid>



        </div>)
      }, {
        menuItem: 'Test Cases',
        render: () => (<Tab.Pane attached={false}>
          <TestCases genEvalTestCases={this.genEvalTestCases} state={this.state} />
        </Tab.Pane>)
      }, {
        menuItem: 'Submit',
        render: () => (<Tab.Pane attached={false}>
          Validation
          <Button color={'green'} onClick={this.saveProblem}>Save Problem</Button>
        </Tab.Pane>)
      }
    ];
    this.updateCode = this.updateCode.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateTestCases = this.updateTestCases.bind(this);
    this.generateTestCase = this.generateTestCase.bind(this);
    this.clearTestCases = this.clearTestCases.bind(this);
    this.compileCode = this.compileCode.bind(this);
    this.genEvalTestCases = this.genEvalTestCases.bind(this);
    this.saveProblem = this.saveProblem.bind(this);
  }
  generateTestCase = () => {
    var op = ``;
    for (var i = 0; i < this.state.test_case_generator.length; i++) {
      op += this.state.test_case_generator[i](...this.state.test_case_generator_args[i]);

    }
    //console.log(op);
    return op
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

  updateTestCases = (funct, args) => {
    console.log("updateTestCases Main");
    var new_generator = [...this.state.test_case_generator];
    var new_args = [...this.state.test_case_generator_args]
    new_generator.push(funct);
    new_args.push(args);
    this.setState({
      test_case_generator:new_generator,
      test_case_generator_args:new_args,
    });
    //console.log(this.state);
  }
  clearTestCases = () => {
    this.setState({
      test_case_generator:[],
      test_case_generator_args:[],
    })
  }
  compileCode = () => {
    this.setState({
      ide: {
        compiling: true,
      }
    })
    var fd = new FormData();
    fd.set('code', this.state.code);
    axios({
      method: 'post',
      url: '/problems/compile/',
      data: fd,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    }).then((response) => {
      this.setState({
        ide: {
          compiling: false,
          errors: response.data.error,
          uid: response.data.uid,
          error: response.data.stderr,
        }
      })
    }).catch((error) => {
      console.log(error.response);
    })
  }
  genEvalTestCases = () => {

    let length = parseInt(this.state.n_test_cases);
    let code_uid = this.state.ide.uid;
    if(code_uid === "") {
      alert("Code not Compiled")
      return;
    }

    let new_test_cases = [];

    for (var i = 0; i < length; i++) {
      let test_case = {'stdin':this.generateTestCase(),
                       'stdout':'',
                      }
      new_test_cases.push(test_case)
    }

    this.setState({
      test_cases: new_test_cases,
    })
    var fd = new FormData();
    fd.set('codeuid', code_uid);

    new_test_cases.map((tc,i) => {
      fd.set('stdin', tc.stdin);
      axios({
        method: 'post',
        url: '/problems/run/',
        data: fd,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      }).then((response) => {
        if(response.data[0].errors.hasOwnProperty('type')) {
          alert("Runtime Error for Test Case #" + i+" : "+response.data[0].errors.type)
          return;
        }
        console.log(response.data);
        new_test_cases[i]['stdout'] = response.data[0].stdout;
        this.setState({
          test_cases: new_test_cases,
        })
      })
    })

  }
  saveProblem = () => {
    var fd = new FormData();
    var state = JSON.stringify(this.state);
    fd.set('payload',state)
    axios({
      method: 'post',
      url: '/problems/save/',
      data: fd,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    })
  }


  render() {
    //console.log(this.generateTestCase());
    //console.log(this.state);
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
