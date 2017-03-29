import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  handleGoToChapter(path) {
    this.context.router.push(path);
  }

  render() {
    return (
      <div className="main-menu-wrapper">
        <div onClick={this.handleGoToChapter.bind(this, 'animals')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <img src="imgs/animals.png" />
            <hr className="menu-item-divider" />
            <p>Звери</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'birds')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <img src="imgs/birds.png" />
            <hr className="menu-item-divider" />
            <p>Птицы</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'plants')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <img src="imgs/plants.png" />
            <hr className="menu-item-divider" />
            <p>Растения</p>
          </div>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'insects')} className="top-level-menu-item">
          <div className="vertical-aligner">
            <img src="imgs/insects.png" />
            <hr className="menu-item-divider" />
            <p>Насекомые</p>
          </div>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(Home);
