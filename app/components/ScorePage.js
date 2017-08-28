import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as prepareActions from '../redux/actions/sampleActions';

export class ScorePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>score page</div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    prepareActions: bindActionCreators({
      ...prepareActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(ScorePage);
