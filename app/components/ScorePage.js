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
      <div className="form-group" style={{width: this.props.width}}>
        <input
          type="text"
          className="form-control darts"
          value={this.state.score}
          onChange={this.changeScore.bind(this)} />
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
    this.setState({
      currentPlayer: (this.state.currentPlayer !== this.state.playersData.playerNames.length)
        ? this.state.currentPlayer + 1
        : 1
    });
    if (scoreSum >= this.state.playersData.maxScore) {
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

    return (
      <div className="score-page-container">
        <table className="table">
          <thead>
            <tr>
              <th>Игрок</th>
              <th>Счёт</th>
            </tr>
          </thead>
          <tbody>

            {_.map(this.state.playersData.playerNames, (player, index)=>{
              const percentage = (player.score / (self.state.playersData.maxScore / 100));
              return (
                <tr key={index}>
                  <td>
                    <span className={((percentage >= 100)
                      ? "label label-success player-name"
                      : "label label-default player-name") + ((player.id === self.state.currentPlayer) ? " current" : "")}>
                      {player.name}
                    </span>
                    {(player.id === self.state.currentPlayer) &&
                      <div className="current-player-controls">
                        <form className="form-inline">
                          {_.map(dartsCountArray, (dataNum, index) => {
                            return (
                              <ScoreInput
                                ref={player.id + '-' + (index + 1)}
                                key={index}
                                className="form-group"
                                width={(100 / self.state.playersData.dartsCount) + '%'}
                              />
                            );
                          })}
                        </form>
                        <button
                          onClick={self.addScore.bind(self, player.id)}
                          type="button"
                          className="btn btn-primary"
                        >
                          Следующий
                        </button>
                      </div>
                    }
                  </td>
                  <td>
                    <div
                      className={(percentage >= 100)
                        ? "progress-bar progress-bar-success progress-bar-striped active"
                        : "progress-bar nonactive"}
                      style={{width: percentage + "%"}}>
                      {player.score}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {self.state.currentPlayer === 100 &&
          <button
            type="button"
            onClick={this.startNewGame.bind(this)}
            className="btn btn-primary"
          >
            Начать новую игру
          </button>
        }
        {self.state.currentPlayer === 100 &&
        <button
          type="button"
          onClick={this.startSameGame.bind(this)}
          className="btn btn-primary"
        >
          Повторить игру
        </button>
        }
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
