'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class AppContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>App Container</p>
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.node
};

export default connect(state => state)(AppContainer);