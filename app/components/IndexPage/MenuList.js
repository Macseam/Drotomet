'use strict';

import React from 'react';
import _ from 'lodash';
import MenuItem from './MenuItem';

const MenuList = props => {
  return (
    <div className="main-menu-wrapper">
      {props.menuChapters && !_.isEmpty(props.menuChapters)
      && _.map(props.menuChapters, (menuItemObj, index)=>{
        return (
          <MenuItem
            key={index}
            title={menuItemObj.title}
            color={menuItemObj.color}
            goToAction={()=>{props.goToAction('chapter/' + menuItemObj.slug)}}
          />
        );
      })}
    </div>
  );
};

export default MenuList;
