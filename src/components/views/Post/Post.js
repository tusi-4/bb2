import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './Post.module.scss';

import { Box } from '@material-ui/core';
// import { Card } from '@material-ui/core';
// import { CardMedia } from '@material-ui/core';
// import { CardContent } from '@material-ui/core';
// import { Typography } from '@material-ui/core';
// import { CardActions } from '@material-ui/core';
// import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAllUsers } from '../../../redux/usersRedux.js';
import { getOne } from '../../../redux/postsRedux.js';



const Component = ({className, post}) => (
  <div className={clsx(className, styles.root)}>
    <Box className={clsx(className, styles.box)}>
      {post && post.length > 0 && post.map(post => (
        <><span key={post.id}>{post.title}</span><span>{post.text}</span></>
      ))}
    </Box>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  users: PropTypes.object,
  post: PropTypes.array,
};

const mapStateToProps = state => ({
  users: getAllUsers(state),
  post: getOne(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
