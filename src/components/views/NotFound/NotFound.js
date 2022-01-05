import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './NotFound.module.scss';

import { Box } from '@material-ui/core';
import { Link } from '@material-ui/core';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';


const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <Box className={clsx(className, styles.box)}>
      <h2>NotFound</h2>
      <p>
        Please return to&nbsp;
        <Link color="primary" variant="button" href="/">Homepage</Link>
      </p>
    </Box>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
