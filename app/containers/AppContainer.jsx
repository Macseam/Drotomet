'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navigation } from 'react-router';

class AppContainer extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const {
      children
    } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default connect(state => state)(AppContainer);