import React, { Component } from 'react';
import CategoriesListGroup from './CategoriesListGroup.tsx';

export class Home extends Component {
    static displayName = Home.name;
    handleSelectItem = (item) => { console.log(item) }; 

    render() {
    document.body.style.backgroundColor = "white";
    return (
        <div>
            <h1>Test Area</h1>
      </div>
    );
  }
}
