import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import _ from 'lodash';

class ChapterList extends React.Component {

  constructor(props) {
    super(props);
  }

  handleGoToDetails(path) {
    this.context.router.push(this.props.params.chapter + '/' + path);
  }

  handleGoBack() {
    this.context.router.push('');
  }

  render() {
    const { children } = this.props;
    const listItems = [
      {name: 'First item of the list', path: 'firstItem'},
      {name: 'Second item', path: 'secondItem'},
      {name: 'And here goes the third item', path: 'thirdItem'}
    ];
    if (this.props.params.name) {
      return (
        <div>
          {children}
        </div>
      );
    }
    return (
      <div className="chapter-items-list-wrapper">
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={this.handleGoBack.bind(this)}
        >
          Go back to main menu
        </button>
        <h3>{this.props.params.chapter}</h3>
          {_.map(listItems, (listItem, key)=>{
            return (
            <div
              key={'listItem' + key}
              className="bs-callout bs-callout-info list-item"
            >
              <div className="image-placeholder">&nbsp;</div>
              <h4 className="link list-item-title" onClick={this.handleGoToDetails.bind(this, listItem.path)}>{listItem.name}</h4>
              <p>Sometimes emphasis classes cannot be applied due to the specificity of another selector. In most cases, a sufficient workaround is to wrap your text.</p>
            </div>
            );
          })}
      </div>
    );
  }
}

ChapterList.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(ChapterList);
