'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import MenuList from "../components/IndexPage/MenuList";

class IndexContainer extends Component {

  constructor(props) {
    super(props);

    this.actions = this.props.authActions;
    this.state = {
      menuChapters: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.chaptersList !== this.state.menuChapters &&
      nextProps.authState.loaded) && nextProps.authState.chaptersList) {
      this.setState({
        menuChapters: nextProps.authState.chaptersList,
      });
    }
  }

  componentDidMount() {
    this.actions.getChaptersList();
  }

  handleGoToChapter(path) {
    this.context.router.push(path);
  }

  render() {
    const {
      menuChapters
    } = this.state;
    return (
      <div>
        {menuChapters && !_.isEmpty(menuChapters) &&
          <MenuList goToAction={this.handleGoToChapter.bind(this)} menuChapters={menuChapters} />
        }
      </div>
    );
  }
}

IndexContainer.contextTypes = {
  router: React.PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(IndexContainer);