import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Drawer from './Drawer.jsx';

import styles from './App.module.less';

const inIframe = window.self !== window.top;

const useViewModel = (props) => {
  const { localStorageKey } = props;
  const [toolbarVisible, setToolbarVisible] = useState(!inIframe);
  const [toolbarMinimize, setToolbarMinimize] = useState(localStorage.getItem(localStorageKey));
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContentVisible, setDrawerContentVisible] = useState(false);

  const onMinimize = () => {
    setToolbarMinimize(true);
    localStorage.setItem(localStorageKey, '1');
  };
  const onDrawerShow = () => {
    setToolbarVisible(false);
    setDrawerContentVisible(true);
    setTimeout(() => setDrawerVisible(true), 16);
  };
  const onDrawerClose = () => {
    setDrawerVisible(false);
    setTimeout(() => setDrawerContentVisible(false), 500);
    setToolbarVisible(true);
    setToolbarMinimize(false);
    localStorage.removeItem(localStorageKey);
  };

  return {
    state: {
      toolbarVisible,
      toolbarMinimize,
      drawerVisible,
      drawerContentVisible,
    },
    onMinimize,
    onDrawerShow,
    onDrawerClose,
  };
};

const App = (props) => {
  const vm = useViewModel(props);
  const {
    state: {
      toolbarVisible,
      toolbarMinimize,
    },
    onMinimize,
    onDrawerShow,
  } = vm;
  const {
    toolbarIcon,
    toolbarIconSize,
  } = props; 
  return (
    <>
      <div
        className={classnames(styles.toolbar, {
          [styles.hide]: !toolbarVisible,
          [styles.mini]: toolbarMinimize,
        })}
        onClick={onDrawerShow}
      >
        <img
          src={toolbarIcon}
          width={toolbarIconSize}
          height={toolbarIconSize}
        />
        <img
          onClick={e => {
            e.stopPropagation();
            onMinimize();
          }}
          className={classnames(styles.minimizeButton, styles.mini)}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUUlEQVQ4T2NkoBAwUqifYdQABkgY/P//P4GBgUGexAB9yMjIuABmwAEGBgZ7Eg04yMjI6EA1AyYwMDAYkOiCC4yMjAWj6QCaDkgMPBTlFAciAMdPFBFJiZyaAAAAAElFTkSuQmCC"
        />
      </div>
      <Drawer {...props} {...vm} />
    </>
  );
};

App.defaultProps = {
  localStorageKey: '_debugger_board_minimize',
  toolbarIconSize: 36,
};

App.PropTypes = {
  localStorageKey: PropTypes.string,
  toolbarIcon: PropTypes.string,
  toolbarIconSize: PropTypes.number,
};

export default App;
