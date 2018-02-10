import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class UserList extends Component {

  render() {
    console.log(this.props);
    return(
      <div>

      </div>

    )
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(UserList);
