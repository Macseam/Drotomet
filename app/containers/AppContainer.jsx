'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class AppContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.node
};

export default connect(state => state)(AppContainer);