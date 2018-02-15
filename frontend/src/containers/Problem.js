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
  Message
} from 'semantic-ui-react'
import IDE from './IDE.js';
import ReactMarkdown from 'react-markdown';

const input = `
  # Problem Header
  ### Problem Definiton
  Some Text

  > Quote

  Some **Description**

`

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ide: {
        problemId:this.props.match.params.id,
        code: "",
        samplein: "",
        sampleout: "",
        customin: "",
        customout: "",
        compiles: true,
        compileErrors: "",
        runs: true,
        runtimeErrors: "",
      }
    }
    this.updateCode = this.updateCode.bind(this);
    this.compileCode = this.compileCode.bind(this);
  }
  updateCode = (code) => {
    this.setState({
      ...this.state,
      ide: {
        ...this.state.ide,
        code: code,
      }
    });
  //  console.log(this.state);
  }
  compileCode = () => {
    var fd = new FormData();
    fd.set('problemId',this.state.ide.problemId);
    fd.set('code',this.state.ide.code);
    axios({
      method: 'post',
      url:'/api/problems/compile',
      data: fd,
      config: {headers: {'AuthToken':'AuthToken',
                        'Content-Type':'multipart/form-data',
                        },
              }
    }).then(function(response){
      console.log(response);
    }).catch(function(error){
      console.log(error);
    })

  }
  render() {
    //console.log(this.props.match.params.id);
    return (
      <div>
        <TopNav />
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <ReactMarkdown source={input} />
              </Segment>
              <Segment>
                <Form>
                  <Header as='h3'>
                    Sample Input
                  </Header>
                  <textarea disabled>
                    1 2 3 \n
                    4 5 6
                  </textarea>
                  <Header as='h3'>
                    Sample Output
                  </Header>
                  <textarea disabled>
                    1 2 3

                    4 5 6
                  </textarea>
                </Form>
                <Message warning>
                <Message.Header>Warning</Message.Header>
                  <p>Despite of submitting a valid solution, your code might not get accepted due to the following reasons</p>
                  <ul>
                    <li>Printing Extra Characters</li>
                    <li>Lack of '\n' after the final output</li>
                    <li>Waiting for input at the end</li>
                    <li>Not returning zero from main</li>
                  </ul>
                </Message>
              </Segment>

            </Grid.Column>
            <Grid.Column>
              <IDE buttons={
                <Button.Group>
                  <Button onClick={() => this.compileCode()}>Run</Button>
                  <Button.Or />
                  <Button positive>Submit</Button>
                </Button.Group>
              } updateCode={this.updateCode}>
              <Form>
                <Grid divided='vertically'>
                  <Grid.Row columns={2}>

                    <Grid.Column>
                      <Header as='h3'>
                        Custom Input
                      </Header>
                      <Form.Field>
                      <textarea>
                        1 2 3 \n
                        4 5 6
                      </textarea>
                    </Form.Field>
                    <Form.Field>

                        <Button primary>Run with custom input</Button>
                        <Button secondary>Clear Input</Button>
                    </Form.Field>




                    </Grid.Column>
                    <Grid.Column>
                      <Header as='h3'>
                        Program Output
                      </Header>
                      <textarea disabled>
                        1 2 3 \n
                        4 5 6
                      </textarea>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </Form>


              </IDE>
            </Grid.Column>
          </Grid.Row>
        </Grid>


      </div>
    )
  }
}
export default Problem;
