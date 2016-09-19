import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../client/components/Html';

export default function (req, res, next) {
  res.send(
    '<!doctype html>' +
    ReactDOM.renderToString(<Html />)
  );
}