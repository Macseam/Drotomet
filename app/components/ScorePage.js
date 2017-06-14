import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

class ScorePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        score page
      </div>
    );
  }
}

ScorePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(ScorePage);
