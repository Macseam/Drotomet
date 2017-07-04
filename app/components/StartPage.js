import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import { bindActionCreators } from 'redux';
import * as prepareActions from '../redux/actions/sampleActions';

class FormGroup extends Component {

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
      <div className="form-group new-player">
        <label className="player-name-label" htmlFor={"inputName" + this.props.idNumber}>{this.props.idNumber}</label>
        <input type="text" className="player-name-input form-control" id={"inputName" + this.props.idNumber} onChange={this.changePlayerName.bind(this)} />
      </div>
    );
  }
}

class StartPage extends Component {

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
      players: (event.target && /^\d+$/.test(event.target.value) && (parseInt(event.target.value) <= 6) && parseInt(event.target.value) > 0) ? event.target.value : ''
    });
  }

  changeDartsCount(event) {
    this.setState({
      dartsCount: (event.target && /^\d+$/.test(event.target.value) && (parseInt(event.target.value) <= 6) && parseInt(event.target.value) > 0) ? event.target.value : ''
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
      if (this.refs['inputName' + i]) {
        playerNames.push({
          id: i,
          name: this.refs['inputName' + i].state.playerName || i,
          score: 0,
          winnerStatus: 0
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
          <hr className="divider" />
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
            disabled={(parseInt(this.state.players) < 1) || this.state.players === ''}
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
