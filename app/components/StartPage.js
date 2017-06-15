import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Navigation } from 'react-router';

import { bindActionCreators } from 'redux';
import * as prepareActions from '../redux/actions/sampleActions';

class FormGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerName: '',
    };
  }

  changePlayerName(event) {
    this.setState({
      playerName: event.target ? event.target.value : ''
    });
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={"inputName" + this.props.idNumber}>Игрок {this.props.idNumber}</label>
        <input type="text" className="form-control" id={"inputName" + this.props.idNumber} onChange={this.changePlayerName.bind(this)} />
        {(this.props.idNumber > 1) &&
          <button onClick={this.props.deletePlayer} type="button" className="btn btn-danger delete-player">X</button>
        }
      </div>
    );
  }
}

class StartPage extends React.Component {

  constructor(props) {
    super(props);

    this.actions = this.props.prepareActions;

    this.state = {
      players: 1,
      dartsCount: '0',
      maxScore: '0',
    };
  }

  addPlayer() {
    this.setState({
      players: this.state.players + 1
    });
  }

  deletePlayer() {
    this.setState({
      players: this.state.players > 0 ? this.state.players - 1 : 0
    });
  }

  changeDartsCount(event) {
    this.setState({
      dartsCount: (event.target && /^\d+$/.test(event.target.value)) ? event.target.value : ''
    });
  }

  changeMaxScore(event) {
    this.setState({
      maxScore: (event.target && /^\d+$/.test(event.target.value)) ? event.target.value : ''
    });
  }

  startGame() {
    let playerNames = [];
    for (let i = 1; i <= this.state.players; i ++) {
      if (this.refs['inputName' + i]
        && this.refs['inputName' + i].state.playerName
        && !_.isEmpty(this.refs['inputName' + i].state.playerName)) {
        playerNames.push({
          id: i,
          name: this.refs['inputName' + i].state.playerName,
          score: 0
        });
      }
    }
    this.actions.initializeGameData({
      playerNames,
      dartsCount: this.state.dartsCount,
      maxScore: this.state.maxScore
    });
    this.context.router.push('game');
  }

  render() {

    const self = this;
    const playerNames = [];

    for (let i = 0; i < this.state.players; i ++) {
      playerNames.push(i);
    }

    return (
      <div>
        <h4>Дротомёт v.1.0</h4>
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="dartsCount">
              До скольки баллов играем?
            </label>
            <input
              type="text"
              className="form-control"
              id="maxScore"
              value={this.state.maxScore}
              onChange={this.changeMaxScore.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dartsCount">
              Сколько дротиков кидаем каждый раз?
            </label>
            <input
              type="text"
              className="form-control"
              id="dartsCount"
              value={this.state.dartsCount}
              onChange={this.changeDartsCount.bind(this)}
            />
          </div>
          {playerNames.map(function(playerName, idNumber) {
            return (
              <FormGroup
                key={idNumber + 1}
                ref={"inputName" + (idNumber + 1)}
                idNumber={idNumber + 1}
                deletePlayer={self.deletePlayer.bind(self)} />
            );
          })}
          <br/>
          <button
            type="button"
            onClick={this.addPlayer.bind(this)}
            className="btn btn-success"
          >
            Добавить игрока
          </button>
          <button
            type="button"
            onClick={this.startGame.bind(this)}
            className="btn btn-primary"
          >
            Играть >>>
          </button>
        </form>
      </div>
    );
  }
}

StartPage.contextTypes = {
  router: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    prepareActions: bindActionCreators({
      ...prepareActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(StartPage);
