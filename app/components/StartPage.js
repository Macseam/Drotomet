import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

class StartPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        start page
      </div>
    );
  }
}

StartPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(StartPage);
