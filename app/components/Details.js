import React, { Component } from 'react';
import _ from 'lodash';
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

    const chapterTitle = _.find(this.props.authState.chaptersList, (chapterObj)=>{
      return (chapterObj.slug === this.props.params.chapter);
    });

    let itemDetails = null;

    if (chapterTitle && !_.isEmpty(chapterTitle)) {
      itemDetails = _.find(chapterTitle.items, (itemObj)=>{
        return (itemObj.slug === this.props.params.details);
      });
    }

    return (
      <div className="item-details-wrapper">
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={this.handleGoBack.bind(this)}
        >
          Go back to items list
        </button>
        <h4>{(itemDetails && itemDetails.title) || 'No title'}</h4>
        <div className="image-placeholder" style={{backgroundColor: (itemDetails && itemDetails.color) || 'gray'}}>&nbsp;</div>
        <p>{(itemDetails && itemDetails.description) || 'No description'}</p>
      </div>
    );
  }
}

ChapterDetails.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(ChapterDetails);
