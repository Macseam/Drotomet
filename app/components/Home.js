import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  handleGoToChapter(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="main-menu-wrapper">
        <div onClick={this.handleGoToChapter.bind(this, 'animals')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <div className="image-placeholder"></div>
            <hr className="menu-item-divider" />
            <p>First Category</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'birds')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <div className="image-placeholder"></div>
            <hr className="menu-item-divider" />
            <p>Second Category</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'plants')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <div className="image-placeholder"></div>
            <hr className="menu-item-divider" />
            <p>Third Category</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'insects')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <div className="image-placeholder"></div>
            <hr className="menu-item-divider" />
            <p>Fourth Category</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Home));
