'use strict';

import axios from 'axios';
import _ from 'lodash';
import { requestData, receiveData, receiveError } from './actionUtils';

export function initializeGameData (action) {
  const actionName = 'INITIALIZE_GAME_DATA';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}

export function changeRandomNumber (action) {
  const actionName = 'CHANGE_RANDOM_NUMBER';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}

export function addPlayerScore (action) {
  const actionName = 'ADD_PLAYER_SCORE';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}

export function checkForWinners (action) {
  const actionName = 'CHECK_FOR_WINNERS';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}

export function clearPlayersScore (action) {
  const actionName = 'CLEAR_PLAYERS_SCORE';
  return (dispatch) => {
    dispatch(receiveData(actionName, action));
  };
}

export function getChaptersList () {
  const actionName = 'GET_CHAPTERS_LIST';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(`app/sample_data/sample.json`)
      .then((response) => {

        response.data = response.data.chapters;

        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}

export function getItemsList (action) {
  const actionName = 'GET_ITEMS_LIST';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(`app/sample_data/sample.json`)
      .then((response) => {

        const responseItem = _.find(response.data.chapters, (chapterItem)=>{
          return (
            chapterItem.slug === action
          );
        });
        response.data = (responseItem && responseItem.items) || response.data;

        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
  };
}
