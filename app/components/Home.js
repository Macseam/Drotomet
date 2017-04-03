import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.actions = this.props.authActions;
  }

  componentDidMount() {
    this.actions.getChaptersList();
  }

  handleGoToChapter(path) {
    this.context.router.push(path);
  }

  render() {
    return (
      <div className="main-menu-wrapper">
        <div onClick={this.handleGoToChapter.bind(this, 'firstChapter')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <div className="image-placeholder">&nbsp;</div>
            <hr className="menu-item-divider" />
            <p>Chapter 1</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'secondChapter')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <div className="image-placeholder">&nbsp;</div>
            <hr className="menu-item-divider" />
            <p>Chapter 2</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'thirdChapter')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <div className="image-placeholder">&nbsp;</div>
            <hr className="menu-item-divider" />
            <p>Chapter 3</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'fourthChapter')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <div className="image-placeholder">&nbsp;</div>
            <hr className="menu-item-divider" />
            <p>Chapter 4</p>
          </div>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(Home);
