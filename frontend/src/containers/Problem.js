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
  TextArea
} from 'semantic-ui-react'
import IDE from './IDE.js';
import ReactMarkdown from 'react-markdown';

axios.defaults.headers.common['Authorization'] = "Token f3365fd4d510563d41762225271a3d6d6cab5f42";

const input = `
  # Problem Header
  ### Problem Definiton
  Some Text

  > Quote

  Some **Description**
  \`\`\`C
  #include <stdio.h>
  int main(void) {
    printf("Hello World!");
  }
  \`\`\`

`

const AsyncLoading = (props) => {
  return (<Message icon="icon">
    <Icon name='circle notched' loading="loading"/>
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      We are fetching that content for you.
    </Message.Content>
  </Message>)
}
const ProblemContent = (props) => {
  console.log(props);

  return (<div>
    <ReactMarkdown source={input}/>
  </div>)
}
const SampleIO = (props) => {
  return (<div>
    <Form>
      <Header as='h3'>
        Sample Input
      </Header>
      <textarea disabled="disabled">
        1 2 3 \n 4 5 6
      </textarea>
      <Header as='h3'>
        Sample Output
      </Header>
      <textarea disabled="disabled">
        1 2 3 4 5 6
      </textarea>
    </Form>
    <Message warning="warning">
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
        <textarea>
          1 2 3 \n 4 5 6
        </textarea>
      </Form.Field>
    </Form>
    <Message info="info">
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
  console.log(props);
  return (<div>
    {
      props.compiled?
      <div>
        <p><strong>Compiler: </strong>{props.compiler}</p>
        <p><strong>UID: </strong>{props.uid}</p>
        <p><strong>Compiler Errors: </strong>{""+props.errors}</p>
        {
          props.errors?
          <Form>
            <TextArea autoHeight value={props.error} disabled={true}>

            </TextArea>
          </Form>

          :<p>Code Compiled Successfully</p>
        }
      </div>:<p>Code not compiled yet!</p>
    }
  </div>)
}
const ProgramOutput = (props) => {
  return (<div>
    Program Output Will Appear Here
  </div>)
}

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ide: {
        problemId: this.props.match.params.id,
        code: "",
        samplein: "",
        sampleout: "",
        customin: "",
        customout: "",
        compiles: true,
        compileErrors: "",
        runs: true,
        runtimeErrors: ""
      },
      modal: {
        open: false
      },
      problemcontent : {
        md: `# Problem Header
          ### Problem Definiton
          Some Text

          > Quote

          Some **Description**
          \`\`\`C
          #include <stdio.h>
          int main(void) {
            printf("Hello World!");
          }
          \`\`\`

        `
      },
      compilerlog: {
        compiled: false,
        compiler: '',
        errors: false,
        uid: '',
        error: '',
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
            <SampleIO/>
          </Tab.Pane>)
        }, {
          menuItem: 'Custom Input',
          render: () => (<Tab.Pane attached={false}>
            <CustomIO/>
          </Tab.Pane>)
        }, {
          menuItem: 'Compiler Log',
          render: () => (<Tab.Pane attached={false}>
            <CompilerLog {...this.state.compilerlog}/>
          </Tab.Pane>)
        }, {
          menuItem: 'Output',
          render: () => (<Tab.Pane attached={false}>
            <ProgramOutput/>
          </Tab.Pane>)
        }, {
          menuItem: 'Submissions',
          render: () => (<Tab.Pane attached={false}>
            <ProgramOutput/>
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
  compileCode = () => {
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
        }

      })
      console.log(response);
    }).catch(function(error) {
      console.log(error);
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

              <Tab menu={{
                  secondary: true,
                  color: 'blue',
                  attached: false,
                  fluid: true,
                  vertical: true,
                  tabular: 'right'
                }} panes={this.panes}/>
            </Container>

          </Grid.Column>
          <Grid.Column>
            <IDE buttons={<Button.Group > <Button onClick={() => this.compileCode()} color='teal'>Run with Sample Input</Button>
              <Button.Or/>
              <Button color='orange'>Submit Code</Button>
              <Button.Or/>
              <Button color='black'>Run with Custom Input</Button>
            </Button.Group>} updateCode={this.updateCode}>
              <Button.Group>
                <Button color='teal' basic="basic">Save current code</Button>

                <Button color='black' basic="basic">Clear</Button>
              </Button.Group>
            </IDE>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal open={this.state.modal.open}>
        <Modal.Header>
          Your code was sent to the server...
        </Modal.Header>
        <Modal.Content>
          <AsyncLoading/>
        </Modal.Content>
        <Modal.Actions>
          {/* <Button primary="primary" disabled loading="loading">OK</Button> */}
        </Modal.Actions>
      </Modal>

    </div>)
  }
}
export default Problem;
