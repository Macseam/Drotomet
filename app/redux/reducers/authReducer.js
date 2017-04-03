'use strict';

import * as AuthTypes from '../types/authTypes';

const initialState = {
  authToken: null,
  chaptersList: null,
  loading: false,
  loaded: false,
};

export default function authInfo(state = initialState, action) {
  switch (action.type) {

    case AuthTypes.GET_HEADER_AUTH_TOKEN_REQUEST:
      return { ...state, authToken: initialState.authToken, loading: true, loaded: false };
    case AuthTypes.GET_HEADER_AUTH_TOKEN_SUCCESS:
      return { ...state, authToken: action.data, loading: false, loaded: true };
    case AuthTypes.GET_HEADER_AUTH_TOKEN_FAILURE:
      return { ...state, authToken: initialState.authToken, loading: false, loaded: true };

    case AuthTypes.GET_CHAPTERS_LIST_REQUEST:
      return { ...state, chaptersList: initialState.chaptersList, loading: true, loaded: false };
    case AuthTypes.GET_CHAPTERS_LIST_SUCCESS:
      return { ...state, chaptersList: action.data, loading: false, loaded: true };
    case AuthTypes.GET_CHAPTERS_LIST_FAILURE:
      return { ...state, chaptersList: initialState.chaptersList, loading: false, loaded: true };

    default:
      return state;
  }
}
