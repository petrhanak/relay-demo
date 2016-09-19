import React, { Component } from 'react';
import App from './App';

export default class Html extends React.Component {
  render() {
    return (
      <html>
      <body>
      <div id="root">
        <App/>
      </div>
      </body>
      </html>
    )
  }
}