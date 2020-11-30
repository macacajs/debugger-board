'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

window._debugger_board = window._debugger_board || {
  append(element) {
    const identifer = '_debugger_board';
    if (document.querySelector(`#${identifer}`)) {
      return;
    }
    const button = document.createElement('div');
    button.id = identifer;
    element.appendChild(button);
    const toolbarIcon = 'https://macacajs.github.io/macaca-datahub/logo/logo-color.svg';
    const localStorageKey = '_debugger_board_minimize';
    if (!window._debugger_board_datahub_options) {
      return;
    }
    const {
      port = 9200, hostname = '127.0.0.1',
    } = window._debugger_board_datahub_options;
    const drawerContent = (
      <iframe
        src={`http://${hostname}:${port}/dashboard`}
        width="100%" height="100%" frameBorder="0"
      />
    );
    ReactDOM.render((
      <App
        toolbarIcon={toolbarIcon}
        localStorageKey={localStorageKey}
        drawerContent={drawerContent}
      />
    ), button);
  },
  /* eslint-disable */
  version: VERSION
  /* eslint-enable */
};

const script = document.querySelector('script[append]');

if (script) {
  const appendName = script.getAttribute('append').trim();
  const appendContainer = document.querySelector(appendName);
  if (appendContainer) {
    window._debugger_board.append(appendContainer);
  }
}
