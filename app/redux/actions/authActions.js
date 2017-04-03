'use strict';

import axios from 'axios';
import { requestData, receiveData, receiveError } from './actionUtils';
import * as AuthTypes from '../types/authTypes';

export function getHeaderAuthToken () {
  return (dispatch) => {
    dispatch(requestData(AuthTypes.GET_HEADER_AUTH_TOKEN_REQUEST));
    return axios.get(`http://macseam.ru/form`)
      .then((response) => {
        dispatch(receiveData(AuthTypes.GET_HEADER_AUTH_TOKEN_SUCCESS, response.data));
      }).catch((response) => {
        dispatch(receiveError(AuthTypes.GET_HEADER_AUTH_TOKEN_FAILURE, response.data));
      });
  };
}

export function getChaptersList () {
  return (dispatch) => {
    dispatch(requestData(AuthTypes.GET_CHAPTERS_LIST_REQUEST));
    return axios.get(`app/sample_data/sample.json`)
      .then((response) => {
        dispatch(receiveData(AuthTypes.GET_CHAPTERS_LIST_SUCCESS, response.data));
      }).catch((response) => {
        dispatch(receiveError(AuthTypes.GET_CHAPTERS_LIST_FAILURE, response.data));
      });
  };
}
