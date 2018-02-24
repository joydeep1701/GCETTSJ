import React, {Component} from 'react';
import  {
  Grid,
  Container,
  Form,
  TextArea,
  Divider,
  Select,
  Input,
} from 'semantic-ui-react';
import Markdown from 'react-remarkable';

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
                  <Form.Field control={Input} value={this.props.state.prob_uid} name="prob_uid" onChange={this.props.updateValue} label="Unique ID"/>
                  <Form.Field control={Input} value={this.props.state.n_test_cases} name="n_test_cases" onChange={this.props.updateValue} label="No. of Test Cases" placeholder=''/>
                </Form.Group>
                <Divider horizontal>More Information</Divider>
                <Form.Group widths='equal'>
                  <Form.Field control={Input} value={this.props.state.start_date} name="start_date" onChange={this.props.updateValue} label="Start Date" placeholder='DD-MM-YY'/>
                  <Form.Field control={Input} value={this.props.state.end_date} name="end_date" onChange={this.props.updateValue} label="End Date" placeholder='DD-MM-YY'/>
                </Form.Group>
                <p><strong>Accepted Languages:</strong></p>
                <Form.Dropdown placeholder='Languages' fluid multiple selection options={this.languages} onChange={(e,d) => {this.props.updateValue(
                  {target:
                    {name:'languages',value:d.value}
                  }
                )}} value={this.props.state.languages} />
                <p><strong>Timeout Duration:</strong></p>
                <Select placeholder='Select Timeout Duration' options={this.timeoutoptions} onChange={(e,d) => {this.props.updateValue(
                  {target:
                    {name:'timeout',value:d.value}
                  }
                )}} value={this.props.state.timeout} />
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

export default General;
