import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './Header.module.scss';

import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAllUsers } from '../../../redux/usersRedux.js';



const Component = ({className, users}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar position="static">
      <Toolbar disableGutters className={clsx(className, styles.toolbar)}>     
        {users.logged === false ?
          <Link component={Button} className={clsx(className, styles.link)} href="http://google.com">Login</Link>
          :
          <div>
            <Link component={Button} className={clsx(className, styles.link)} href="/">My board</Link>
            <Link component={Button} className={clsx(className, styles.link)} href="/">Logout</Link>
          </div>
        }
      </Toolbar>
    </AppBar>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  users: PropTypes.object,
};

const mapStateToProps = state => ({
  users: getAllUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
