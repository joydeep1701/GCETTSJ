import React, {Component} from 'react';
import axios from 'axios';
import TopNav from '../components/navbar';
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
  TextArea,
  Accordion,
  Dimmer,
} from 'semantic-ui-react'
import IDE from './IDE.js';
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-remarkable';

axios.defaults.headers.common['Authorization'] = "Token f3365fd4d510563d41762225271a3d6d6cab5f42";


const ProblemContent = (props) => {
  return (<div>
    <Markdown>
      {props.md}
    </Markdown>
  </div>)
}
const SampleIO = (props) => {
  return (<div>
    <Form>
      <Header as='h3'>
        Sample Input
      </Header>
      <textarea disabled="disabled" value={props.samplein} />


      <Header as='h3'>
        Sample Output
      </Header>
      <textarea disabled="disabled" value={props.sampleout} />


    </Form>
    <Message warning={true}>
      <Message.Header>Warning</Message.Header>
      <p>Despite of submitting a valid solution, your code might not get accepted due to the following reasons</p>
      <ul>
        <li>Printing Extra Characters</li>
        <li>Lack of '\n' after the final output</li>
        <li>Waiting for input at the end</li>
        <li>Non-zero return code from main function</li>
      </ul>
    </Message>
  </div>)
}
const CustomIO = (props) => {
  return (<div>
    <Form>
      <Header as='h3'>
        Custom Input
      </Header>
      <Form.Field>
        <textarea value={props.customin} onChange={props.customINChangeHandler}/>

      </Form.Field>
    </Form>
    <Message info={true}>
      <Message.Header>Info on Input Mechanism</Message.Header>
      <p>GCETTSJ passes your input to the executing thread via pipeline mechanism.</p>
      <p>This is done via the following steps:</p>
      <ul>
        <li>Custom input is collected from the client</li>
        <li>Input is passed to the kernel</li>
        <li>Kernel writes the input to the STDIN buffer of the program</li>
        <li>Program reads from the STDIN buffer</li>
      </ul>
      <p>Using functions like fflush(stdin) may hamper the the execution.</p>

    </Message>

  </div>)
}
const CompilerLog = (props) => {
  //console.log(props);
  return (<div>
    {
      props.compiled?
      <div>
        <p><strong>Compiler: </strong>{props.compiler}</p>
        <p><strong>UID: </strong>{props.uid}</p>
        <p><strong>Compiler Errors: </strong>{""+props.errors}</p>
        {
          props.errors?
          <Message negative={true}>
            <Message.Header>Compilation Error</Message.Header>
            <Form>
              <TextArea autoHeight value={props.error} disabled={true} />
            </Form>
          </Message>
          :
          <Message positive={true}>
            <Message.Header>Code compiled successfully</Message.Header>
              <p>Go to <b>Output</b> tab to see the STDOUT now.</p>
          </Message>
        }
      </div>:
      <Message>
        <Message.Header>Code not compiled yet!</Message.Header>
          <p>Click on submit or run to compile your code</p>
      </Message>
    }
  </div>)
}
const ProgramOutput = (props) => {
  if(props.executed) {
    if(props.errors) {
      return (
        <div>
          <Message negative={true}>
            <Message.Header>Runtime Error</Message.Header>
            <p><strong>{props.error.type}: </strong>{props.error.text}</p>
          </Message>
        </div>
      )
    }
    else{
      return (
        <Form>
          <p><strong>STDOUT:</strong></p>
          <TextArea autoHeight value={props.stdout} disabled={true} />
        </Form>
      )
    }
  }
  return (
      <Message>
        <Message.Header>Code not executed yet!</Message.Header>
          <p>Click on submit or run to execute your code</p>
      </Message>
    )
}

class Submissions extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Label color='green' horizontal>Accepted</Label>
          <Icon name='dropdown' />
          ID: #asddfsjk-fdjklsjl-uei9ua
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          ID: #jjkldfsjk-fdsjl-uei9jlkua
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          ID: #erdfsjk-fdsjl-ueiwq9ua
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
        </Accordion.Content>
      </Accordion>
    )
  }
}

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ide: {
        problemId: this.props.match.params.id,
        code: "",
      },
      modal: {
        open: false
      },
      problemcontent : {
        md: `# Problem name
            & Some description`
      },
      compilerlog: {
        compiled: false,
        compiler: '',
        errors: false,
        uid: '',
        error: '',
      },
      runtimelog: {
        executed: false,
        errors: false,
        stdout: '',
        error: '',
      },
      input: {
        samplein: "SampleIN",
        sampleout: "SampleOUT",
        customin: "CustomIN",
      },
      output: {
        sampleout: "SampleOUT",
        currentout: ""
      },

      tabs:{
        activeIndex:0
      }
    }
    this.panes = [
        {
          menuItem: 'Problem',
          render: () => (<Tab.Pane attached={false}>
            <ProblemContent {...this.state.problemcontent}/>
          </Tab.Pane>)
        }, {
          menuItem: 'Sample IO',
          render: () => (<Tab.Pane attached={false}>
            <SampleIO {...this.state.input}/>
          </Tab.Pane>)
        }, {
          menuItem: 'Custom Input',
          render: () => (<Tab.Pane attached={false}>
            <CustomIO {...this.state.input} customINChangeHandler={this.customINChangeHandler}/>
          </Tab.Pane>)
        }, {
          menuItem: 'Compiler Log',
          render: () => (<Tab.Pane attached={false}>
            <CompilerLog {...this.state.compilerlog}/>
          </Tab.Pane>)
        }, {
          menuItem: 'Output',
          render: () => (<Tab.Pane attached={false}>
            <ProgramOutput {...this.state.runtimelog}/>
          </Tab.Pane>)
        }, {
          menuItem: 'Submissions',
          render: () => (<Tab.Pane attached={false}>
            <Submissions/>
          </Tab.Pane>)
        }, {
          menuItem: 'Saved Codes',
          render: () => (<Tab.Pane attached={false}>
            <ProgramOutput/>
          </Tab.Pane>)
        }
      ]
    this.updateCode = this.updateCode.bind(this);
    this.compileCode = this.compileCode.bind(this);
    this.runCode = this.runCode.bind(this);
    this.customINChangeHandler = this.customINChangeHandler.bind(this);
  }
  updateCode = (code) => {
    this.setState({
      ...this.state,
      ide: {
        ...this.state.ide,
        code: code
      }
    });
    //  console.log(this.state);
  }
  customINChangeHandler = (e) => {
    // console.log(e.target.value);
    this.setState({
      ...this.state,
      input:{
        ...this.state.input,
        customin: e.target.value,
      }
    })
  }
  compileCode = (stdin) => {
    this.setState({
      ...this.state,
      modal: {
        open: true,
      }
    })
    var fd = new FormData();
    fd.set('problemId', this.state.ide.problemId);
    fd.set('code', this.state.ide.code);
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
        ...this.state,
        compilerlog: {
          compiled: true,
          compiler: response.data.compiler,
          errors: response.data.error,
          uid: response.data.uid,
          error: response.data.stderr,
        },
        modal: {
          open: false,
        },
        tabs:{
          ...this.state.tabs,
          activeIndex:3,
        }

      })
      //console.log(response);
      if(response.data.error === false) {
        this.runCode(stdin);
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
  runCode = (stdin) => {
    this.setState({
      ...this.state,
      modal: {
        open: true,
      }
    })
    var fd = new FormData();
    fd.set('codeuid', this.state.compilerlog.uid);
    fd.set('stdin', this.state.input[stdin]);
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
      console.log(response.data);
      this.setState({
        ...this.state,
        modal: {
          open: false,
        },
        runtimelog: {
          ...this.state.runtimelog,
          executed: true,
          errors: response.data[0].errors.hasOwnProperty('type'),
          stdout: response.data[0].stdout,
          error: response.data[0].errors,
        },
        tabs:{
          ...this.state.tabs,
          activeIndex:4,
        }
      })
    }).catch((error) => {
      console.log(error);
      this.setState({
        ...this.state,
        modal: {
          open: false,
        }
      })
    })
  }
  handleTabChange = (e, {activeIndex}) => {
    this.setState({
      ...this.state,
      tabs:{
        ...this.state.tabs,
        activeIndex
      }
    })


  }

  render() {
    //console.log(this.props.match.params.id);
    return (<div>
      <TopNav/>

      <Grid divided='vertically' style={{
          padding: '20px'
        }}>

        <Grid.Row columns={2}>
          <Grid.Column>

            <Container>
              <Message positive>
                <Message.Header>You have already solved this problem</Message.Header>
                <p>Go to your <b>special offers</b> page to see now.</p>
              </Message>
              <Tab menu={{
                  secondary: true,
                  color: 'blue',
                  attached: false,
                  fluid: true,
                  vertical: true,
                  tabular: 'right'
                }} panes={this.panes}
                activeIndex={this.state.tabs.activeIndex} onTabChange={this.handleTabChange}/>
            </Container>

          </Grid.Column>
          <Grid.Column>
            <IDE buttons={<Button.Group >
              <Button onClick={() => this.compileCode('samplein')} color='teal'>Run with Sample Input</Button>
              <Button.Or/>
              <Button color='orange'>Submit Code</Button>
              <Button.Or/>
              <Button onClick={() => this.compileCode('customin')} color='black'>Run with Custom Input</Button>
            </Button.Group>} updateCode={this.updateCode}>
              <Button.Group>
                <Button color='teal' basic={true}>Save current code</Button>

                <Button color='black' basic={true}>Clear</Button>
              </Button.Group>
            </IDE>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Dimmer
        active={this.state.modal.open}
        onClickOutside={this.handleClose}
        page
      >
      <Header as='h2' icon inverted>
          <Icon name='circle notched' loading={true}/>
          <Message.Header>Just one second</Message.Header>
          <Header.Subheader>We are fetching that content for you.</Header.Subheader>
      </Header>
    </Dimmer>

    </div>)
  }
}
export default Problem;
