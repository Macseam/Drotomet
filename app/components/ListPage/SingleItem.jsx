'use strict';

import React from 'react';

const SingleItem = props => {
  return (
    <div
      className="bs-callout bs-callout-info list-item"
    >
      <div className="image-placeholder" style={{backgroundColor: props.color || 'gray'}}>&nbsp;</div>
      <h4 className="link list-item-title" onClick={props.goToItem}>{props.title}</h4>
      <p>{props.description}</p>
    </div>
  );
};

export default SingleItem;