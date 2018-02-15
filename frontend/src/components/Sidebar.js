import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class LeftSidebar extends Component {
  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' visible={visible} icon='labeled' direction='top'>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Problems
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Leaderboard
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Submissions
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='setting' />
              Settings
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='sign out' />
              Log Out
            </Menu.Item>

          </Sidebar>
          <Sidebar.Pusher style={{minHeight:window.innerHeight}}>
            <div className="equal height grid full height">
              <div>
                {this.props.children}
              </div>
            </div>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
  }
}

export default LeftSidebar;
