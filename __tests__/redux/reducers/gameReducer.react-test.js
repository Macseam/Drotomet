import gameInfo from '../../../app/redux/reducers/gameReducer';
import { ScorePage } from '../../../app/components/ScorePage';
import { shallow } from 'enzyme';
import React from 'react';

describe('Game reducer', ()=>{
  beforeEach(function () {
    this.props = {
      data: 'val'
    }});
  it('дефолтное состояние стора в норме', ()=>{
    expect(gameInfo(undefined, {
      type: 'undefined'
    })).toEqual({
      chaptersList: null,
      chapterItemsList: null,
      gameData: null
    });
  });
  it('инициализация игровых данных в норме', ()=>{
    expect(gameInfo(undefined, {
      type: 'INITIALIZE_GAME_DATA_SUCCESS',
      data: 'test game data'
    })).toEqual({
      chaptersList: null,
      chapterItemsList: null,
      gameData: 'test game data'
    });
  });
  it('очистка игровых данных в норме', ()=>{
    expect(gameInfo(undefined, {
      type: 'CLEAR_PLAYERS_SCORE_SUCCESS',
      data: {
        currentState: {
          playerNames: [
            {
              score: 350,
              winnerStatus: 1
            }
          ]
        }
      }
    })).toEqual({
      chaptersList: null,
      chapterItemsList: null,
      gameData: {
        playerNames: [
          {
            score: 0,
            winnerStatus: 0
          }
        ]
      }
    });
  });
  it('количество колонок игроков соответствует числу участников', ()=>{
    expect(
      shallow(<ScorePage gameInfo={{
        chapterItemsList: null,
        chaptersList: null,
        gameData: {
          dartsCount: "6",
          maxScore: "300",
          playerNames: [
            {
              id: 1,
              name: "testPlayer1",
              score: 0,
              winnerStatus: 0
            },
            {
              id: 2,
              name: "testPlayer2",
              score: 0,
              winnerStatus: 0
            }
          ]
        }
      }} />)
        .find('.each-player-score')
    ).toHaveLength(2);
  });
});