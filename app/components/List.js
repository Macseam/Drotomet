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

  nameChapterAppropriately(pathName) {
    console.log(pathName);
    switch(pathName) {
      case 'animals':
        return 'Звери';
      case 'birds':
        return 'Птицы';
      case 'insects':
        return 'Насекомые';
      case 'plants':
        return 'Растения';
      default:
        return 'Неизвестный раздел';
    }
  }

  render() {
    const { children } = this.props;
    const listItems = [
      {name: 'Тестовое название', path: 'test-path'},
      {name: 'Еще тестовое название', path: 'other-test-path'},
      {name: 'И еще одно тестовое название', path: 'another-test-path'}
    ];
    if (this.props.params.name) {
      return (
        <div>
          {children}
        </div>
      );
    }
    return (
      <div>
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={this.handleGoBack.bind(this)}
        >
          Вернуться в главное меню
        </button>
        <h3>{this.nameChapterAppropriately(this.props.params.chapter)}</h3>
          {_.map(listItems, (listItem, key)=>{
            return (
            <div
              key={'listItem' + key}
              className="bs-callout bs-callout-info"
              onClick={this.handleGoToDetails.bind(this, listItem.path)}
            >
              <img src="imgs/squirrel.jpg" />
              <h4 className="link">{listItem.name}</h4>
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
