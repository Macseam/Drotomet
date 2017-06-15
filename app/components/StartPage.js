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
        <label className="player-name-label" htmlFor={"inputName" + this.props.idNumber}>Игрок {this.props.idNumber}</label>
        <input type="text" className="player-name-input form-control" id={"inputName" + this.props.idNumber} onChange={this.changePlayerName.bind(this)} />
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
      dartsCount: '6',
      maxScore: '300',
    };
  }

  changePlayersCount(event) {
    this.setState({
      players: (event.target && /^\d+$/.test(event.target.value) && (parseInt(event.target.value) <= 6) && parseInt(event.target.value) > 0) ? event.target.value : 1
    });
  }

  changeDartsCount(event) {
    this.setState({
      dartsCount: (event.target && /^\d+$/.test(event.target.value) && (parseInt(event.target.value) <= 6) && parseInt(event.target.value) > 0) ? event.target.value : 1
    });
  }

  changeMaxScore(event) {
    this.setState({
      maxScore: (event.target && /^\d+$/.test(event.target.value)) ? event.target.value : 0
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
      <div className="start-page-container">
        <div className="logo-title">Дротомёт</div>
        <form className="form-inline">
          <div className="form-group start-page-option-block">
            <div className="start-option-icon max-score">&nbsp;</div>
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
          <div className="form-group start-page-option-block">
            <div className="start-option-icon darts-count">&nbsp;</div>
            <label htmlFor="dartsCount">
              Сколько дротиков кидаем?
            </label>
            <input
              type="text"
              className="form-control"
              id="dartsCount"
              value={this.state.dartsCount}
              onChange={this.changeDartsCount.bind(this)}
            />
          </div>
          <div className="form-group start-page-option-block">
            <div className="start-option-icon players-count">&nbsp;</div>
            <label htmlFor="dartsCount">
              Сколько будет игроков?
            </label>
            <input
              type="text"
              className="form-control"
              id="dartsCount"
              value={this.state.players}
              onChange={this.changePlayersCount.bind(this)}
            />
          </div>
          {playerNames.map(function(playerName, idNumber) {
            return (
              <FormGroup
                key={idNumber + 1}
                ref={"inputName" + (idNumber + 1)}
                idNumber={idNumber + 1}
              />
            );
          })}
          <br/>
          <button
            type="button"
            onClick={this.startGame.bind(this)}
            className="btn btn-primary start-game-button"
          >
            Начать игру
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
