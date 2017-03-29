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
