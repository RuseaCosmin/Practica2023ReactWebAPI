import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { Container, Col, Row, BrowserRouter } from 'bootstrap'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (<>
        <div className="row">
            <div className="col-2">
                <Layout />
            </div>
            <div className="col-10">
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
                </Routes>
            </div>
        </div>
      </>
    );
  }
}
