'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as prepareActions from '../redux/actions/sampleActions';

export class StartPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="app-title">Drotomet</div>
      </div>
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

export default connect(state => state, mapDispatchToProps)(StartPage);
