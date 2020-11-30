import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Drawer.module.less';

const Drawer = (props) => {
  const {
    state: {
      drawerVisible, drawerContentVisible,
    },
    onDrawerClose,
    drawerContent,
  } = props;
  return (
    <div
      onClick={onDrawerClose}
      className={classnames(styles.wrapper, {
        [styles.hide]: !drawerVisible,
        [styles.none]: !drawerContentVisible,
      })}
      style={{ height: window.innerHeight }}
    >
      <div className={classnames(styles.content, {
        [styles.show]: drawerVisible,
      })}>
        {drawerContent}
      </div>
    </div>
  );
};

Drawer.PropTypes = {
  state: PropTypes.object,
  onDrawerClose: PropTypes.func,
};

export default Drawer;
