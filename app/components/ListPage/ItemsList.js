import React from 'react';
import _ from 'lodash';

import SingleItem from './SingleItem';

const ItemsList = props => {

  return (
    <div className="chapter-items-list-wrapper">
      <button
        type="button"
        className="btn btn-default btn-xs"
        onClick={props.goBack}
      >
        Go back to main menu
      </button>
      <h3>{props.chapterTitle}</h3>
        {_.map(props.chapterItems, (chapterItem, key)=>{
          return (
          <SingleItem
            key={key}
            title={chapterItem.title}
            color={chapterItem.color}
            description={chapterItem.description}
            goToItem={()=>{props.goToItem('chapter/' + props.chapterSlug + '/details/' + chapterItem.slug)}}
          />
          );
        })}
    </div>
  );
};

export default ItemsList;
