import React, {Component} from 'react';
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
  Label
} from 'semantic-ui-react'

class Problem extends Component {
  render() {
    return (
    <Card color='red'>
      <Card.Content>
        <Card.Header>
           <Label as='a' color='green' ribbon>Solved</Label>
           #3 Problem Title
        </Card.Header>
        <Card.Meta>
          Due Date
        </Card.Meta>
        <Card.Description>
          Problem Definition
        </Card.Description>
      </Card.Content>
      <Card.Content extra="extra">
        <p><strong>Languages: </strong>C,C++,Java</p>
        <Button basic="basic" color='green' floated='right'>Open in IDE</Button>
      </Card.Content>
    </Card>)
  }
}

class ProblemsDashboard extends Component {

  render() {
    //console.log("ProblemsDashboard");
    return (<div>
      <TopNav/>
      <Container style={{
          padding: '10px'
        }}>
        <Grid columns={2} divided="divided" padded="padded">
          <Grid.Column width={12}>
            <Segment style={{
                padding: '10px'
              }}>
              <Header as='h2'>Problems</Header>
              <Card.Group itemsPerRow={1}>
                <Problem/>
                <Problem/>
                <Problem/>
                <Problem/>
              </Card.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header>
                  Recent Activity
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date content='1 day ago'/>
                      <Feed.Summary>
                        You added
                        <a>Jenny Hess</a>
                        to your
                        <a>coworker</a>
                        group.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>

    </div>)
  }
}

export default ProblemsDashboard;
