'use strict';

import axios from 'axios';
import _ from 'lodash';
import { requestData, receiveData, receiveError } from './actionUtils';

export function getHeaderAuthToken () {
  const actionName = 'GET_HEADER_AUTH_TOKEN';
  return (dispatch) => {
    dispatch(requestData(actionName));
    return axios.get(`http://macseam.ru/form`)
      .then((response) => {
        dispatch(receiveData(actionName, response.data));
      }).catch((response) => {
        dispatch(receiveError(actionName, response.data));
      });
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
