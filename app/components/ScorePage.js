import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import { bindActionCreators } from 'redux';
import * as prepareActions from '../redux/actions/sampleActions';

class ScoreInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      score: '',
    };
  }

  changeScore(event) {
    this.setState({
      score: (event.target && /^\d+$/.test(event.target.value)) ? event.target.value : ''
    });
  }

  render() {
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">+</div>
          <input
            type="text"
            className="form-control darts"
            value={this.state.score}
            onChange={this.changeScore.bind(this)} />
        </div>
      </div>
    );
  }
}

class ScorePage extends React.Component {

  constructor(props) {
    super(props);

    this.actions = this.props.prepareActions;

    this.state = {
      currentPlayer: 1,
      playersData: this.props.gameInfo.gameData
    };
  }

  componentWillMount() {
    if (!this.props.gameInfo.gameData) {
      this.context.router.push('');
    }
  }

  componentDidUpdate() {
    const self = this;
    const overallWinners = _.filter(this.state.playersData.playerNames, (playerObj)=>{
      return (playerObj.winnerStatus !== 0);
    });
    const currentPlayerData = _.find(this.state.playersData.playerNames, (curPlayer)=>{
      return curPlayer.id === self.state.currentPlayer;
    });
    if (!_.isEmpty(currentPlayerData) && currentPlayerData.winnerStatus !== 0 && overallWinners.length < 3) {
      this.setState({
        currentPlayer: (this.state.currentPlayer !== this.state.playersData.playerNames.length)
          ? this.state.currentPlayer + 1
          : 1
      });
      if (this.state.currentPlayer === this.state.playersData.playerNames.length) {
        console.log('next round');
        this.actions.checkForWinners({
          currentState: self.state.playersData
        });
      }
    }
    if (this.state.currentPlayer !== 100 && overallWinners && overallWinners.length >= 3) {
      this.setState({
        currentPlayer: 100
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameInfo.gameData !== this.props.gameInfo.gameData) {
      this.setState({
        playersData: nextProps.gameInfo.gameData
      });
    }
  }

  addScore(id) {
    const currentState = this.props.gameInfo.gameData;
    const currentPlayerScore = _.find(this.state.playersData.playerNames, (curPlayer)=>{
      return curPlayer.id === id;
    });
    let scoreSum = currentPlayerScore.score;
    for (let i = 1; i <= parseInt(this.state.playersData.dartsCount); i ++) {
      if (this.refs[currentPlayerScore.id + '-' + i]
        && this.refs[currentPlayerScore.id + '-' + i].state.score
        && !_.isEmpty(this.refs[currentPlayerScore.id + '-' + i].state.score)) {
        scoreSum = parseInt(scoreSum) + parseInt(this.refs[currentPlayerScore.id + '-' + i].state.score);
      }
    }
    this.actions.addPlayerScore({
      id,
      scoreSum,
      currentState
    });
    if (this.state.currentPlayer === this.state.playersData.playerNames.length) {
      console.log('next round');
      this.actions.checkForWinners({
        currentState
      });
    }
    this.setState({
      currentPlayer: (this.state.currentPlayer !== this.state.playersData.playerNames.length)
        ? this.state.currentPlayer + 1
        : 1
    });
    let overallWinners = _.filter(this.state.playersData.playerNames, (playerObj)=>{
      return (playerObj.winnerStatus !== 0);
    });
    if (overallWinners && overallWinners.length >= 3) {
      this.setState({
        currentPlayer: 100
      });
    }
  }

  startNewGame() {
    this.startSameGame();
    this.context.router.push('');
  }

  startSameGame() {
    this.actions.clearPlayersScore({currentState: this.props.gameInfo.gameData});
    this.setState({
      currentPlayer: 1
    });
  }

  render() {

    const self = this;

    if (!this.props.gameInfo.gameData) {
      return (<div>&nbsp;</div>);
    }

    const dartsCountArray = [];

    for (let i = 1; i <= this.state.playersData.dartsCount; i ++) {
      dartsCountArray.push(i);
    }

    const greetingsArray = [
      'И это моя первая скрипка? Руку выше, движения плавнее,',
      'Целься в единичку,',
      'Правильно кидать - левой рукой,',
      'Вот ты тут играешь, а там прод упал,',
      'С утра подротил - весь день свободен,',
      'Не забывай менять руку,',
      'Чики-брики и в дамки,',
    ];

    const currentPlayerName = _.find(self.state.playersData.playerNames, (playerObj)=>{
      return (playerObj.id === self.state.currentPlayer);
    });

    return (
      <div className="score-page-container">
        <div className="row score-header">
          <div className="col-sm-4">
            Играем до {self.state.playersData.maxScore}, кидаем по {self.state.playersData.dartsCount} раз
          </div>
          {currentPlayerName && !_.isEmpty(currentPlayerName) &&
            <div className="col-sm-6">
              {_.sample(greetingsArray) + ' ' + (currentPlayerName ? currentPlayerName.name : '')}
            </div>
          }
        </div>
        {_.map(self.state.playersData.playerNames, (player, index)=>{
          const literal = [
            'zero', 'first', 'second', 'third', 'fourth', 'fifth'
          ];
          const percentage = (player.score / (self.state.playersData.maxScore / 100));
          return (
            <div className="each-player-score" key={index}>
              <div className="progress-bar-wrapper">
                <div
                  className={(percentage >= 100)
                    ? "progress-bar progress-bar-success progress-bar-striped active"
                    : "progress-bar nonactive"}
                  style={{height: percentage + "%"}}>
                  {player.score}
                  {player.winnerStatus !== 0 &&
                    <div className={'reward' + ' ' + literal[player.winnerStatus] + '-place'}>&nbsp;</div>
                  }
                </div>
                <span className={((percentage >= 100)
                  ? "label label-success player-name"
                  : "label label-default player-name") + ((player.id === self.state.currentPlayer) ? " current" : "")}>
                  {player.name}
                </span>
                {self.state.currentPlayer === 100 &&
                <div className="current-player-controls">
                  <form className="form-inline">
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={this.startNewGame.bind(this)}
                        className="btn btn-success"
                      >
                        Изменить настройки
                      </button>
                      <button
                        type="button"
                        onClick={this.startSameGame.bind(this)}
                        className="btn btn-primary"
                      >
                        Повторить игру
                      </button>
                    </div>
                  </form>
                </div>
                }
                {(player.id === self.state.currentPlayer) &&
                <div className="current-player-controls">
                  <form className="form-inline">
                    {_.map(dartsCountArray, (dataNum, index) => {
                      return (
                        <ScoreInput
                          ref={player.id + '-' + (index + 1)}
                          key={index}
                          className="form-group"
                        />
                      );
                    })}
                    {(player.id === self.state.currentPlayer) &&
                    <div className="form-group">
                      <button
                        onClick={self.addScore.bind(self, player.id)}
                        type="button"
                        className="btn btn-primary"
                      >
                        Завершить ход
                      </button>
                    </div>
                    }
                  </form>
                </div>
                }
              </div>
            </div>
          );
        })}
      </div>

    );
  }
}

ScorePage.contextTypes = {
  router: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    prepareActions: bindActionCreators({
      ...prepareActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(ScorePage);
