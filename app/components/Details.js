import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

class ChapterDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  handleGoBack() {
    this.context.router.goBack();
  }

  render() {
    return (
      <div className="item-details-wrapper">
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={this.handleGoBack.bind(this)}
        >
          Go back to items list
        </button>
        <h4>{this.props.params.name}</h4>
        <div className="image-placeholder">&nbsp;</div>
      </div>
    );
  }
}

ChapterDetails.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(ChapterDetails);
