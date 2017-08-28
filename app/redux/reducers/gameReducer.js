// @flow

type State = {
  someData: string;
  playerData: ?Array<mixed>;
};

type Action = {
  type: string;
  payload: Object
};

'use strict';

const initialState = {
  someData: 'sdgdgdsgdsg',
  playerData: []
};

export default function gameInfo(state: State = initialState, action: Action) {
  switch (action.type) {

    default:
      return state;
  }
}
