'use strict';

import React from 'react';

const MenuItem = props => {
  return (
    <div onClick={props.goToAction} className="top-level-menu-item">
      <div className="vertical-aligner">
        <div className="image-placeholder" style={{backgroundColor: props.color || 'gray'}}>&nbsp;</div>
        <hr className="menu-item-divider" />
        <p>{props.title || 'No title available'}</p>
      </div>
    </div>
  );

};

export default MenuItem;