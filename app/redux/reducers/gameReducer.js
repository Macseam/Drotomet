'use strict';

import _ from 'lodash';

const initialState = {
  chaptersList: null,
  chapterItemsList: null,
  gameData: null
};

export default function gameInfo(state = initialState, action) {
  switch (action.type) {

    case 'INITIALIZE_GAME_DATA_SUCCESS':
      return { ...state, gameData: action.data };

    case 'ADD_PLAYER_SCORE_SUCCESS':
      let editedPlayers = [];
      _.map(action.data.currentState.playerNames, (playerObj)=>{
        if (playerObj.id === action.data.id) {
          let playerMutated = playerObj;
          playerMutated.score = action.data.scoreSum;
          editedPlayers.push(playerMutated);
        }
        else {
          editedPlayers.push(playerObj);
        }
      });
      let mutatedAddScoreState = action.data.currentState;
      mutatedAddScoreState.playerNames = editedPlayers;
      return { ...state, gameData: mutatedAddScoreState };

    case 'CHECK_FOR_WINNERS_SUCCESS':
      let winners = [];
      let editedWinners = [];
      let mutatedWinnersState = action.data.currentState;
      let overallWinners = _.filter(action.data.currentState.playerNames, (playerObj)=>{
        return (playerObj.winnerStatus !== 0);
      });
      overallWinners = overallWinners.length || 0;

      _.map(action.data.currentState.playerNames, (playerObj)=>{
        if ((playerObj.winnerStatus === 0) && (playerObj.score >= action.data.currentState.maxScore)) {
          winners.push(playerObj);
        }
      });

      if (winners && !_.isEmpty(winners)) {
        winners = _.sortBy(winners, (winnerObj)=>{
          return (winnerObj.score);
        });
        winners.reverse();
      }

      _.map(winners, (winnerObj, index)=>{
        let winnerMutated = winnerObj;
        winnerMutated.winnerStatus = index+1+overallWinners;
        editedWinners.push(winnerMutated);
      });

      winners = [];

      _.map(action.data.currentState.playerNames, (playerObj)=>{
        let winnerData = _.find(editedWinners, (winnerObj)=>{
          return (playerObj.id === winnerObj.id);
        });
        let playerMutated = playerObj;
        playerMutated.winnerStatus = winnerData ? winnerData.winnerStatus : playerMutated.winnerStatus;
        winners.push(playerMutated);
      });

      mutatedWinnersState.playerNames = winners;
      return { ...state, gameData: mutatedWinnersState };

    case 'CLEAR_PLAYERS_SCORE_SUCCESS':
      let editedPlayersToClear = [];
      _.map(action.data.currentState.playerNames, (playerObj)=>{
        let playerMutated = playerObj;
        playerMutated.score = 0;
        playerMutated.winnerStatus = 0;
        editedPlayersToClear.push(playerMutated);
      });
      let mutatedStateToClear = action.data.currentState;
      mutatedStateToClear.playerNames = editedPlayersToClear;
      return { ...state, gameData: mutatedStateToClear };

    default:
      return state;
  }
}
