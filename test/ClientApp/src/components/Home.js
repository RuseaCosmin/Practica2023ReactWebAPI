import React, { Component } from 'react';
import CategoriesListGroup from './CategoriesListGroup.tsx';
import Cookies from 'js-cookie';

export class Home extends Component {
    static displayName = Home.name;
    handleSelectItem = (item) => { console.log(item) }; 


    render() {

    document.body.style.background = "white";
    return (
        <div>
            <h1>Welcome User</h1>
      </div>
    );
  }
}
