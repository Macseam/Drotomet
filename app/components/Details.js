import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import _ from 'lodash';

class ChapterDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  handleGoBack() {
    this.context.router.goBack();
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={this.handleGoBack.bind(this)}
        >
          Вернуться к списку
        </button>
        <h4>{this.props.params.name}</h4>
        <img className="details-portrait" src="../../imgs/squirrel.jpg" />
      </div>
    );
  }
}

ChapterDetails.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(ChapterDetails);
