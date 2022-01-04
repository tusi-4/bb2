import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './Homepage.module.scss';

import { Button } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardActions } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAllUsers } from '../../../redux/usersRedux.js';
import { getAll } from '../../../redux/postsRedux.js';



const Component = ({className, users, posts}) => (
  <div className={clsx(className, styles.root)}>
    <Box className={clsx(className, styles.box)}>
      {users.logged === true ?
        <Button component={Link} className={clsx(className, styles.btn)} variant="contained" color="primary" href="post/add">Add post</Button>
        :
        <></>
      }
      {posts && posts.length > 0 && posts.map(post => (
        <Card key={post.id} className={clsx(className, styles.card)}>
          <CardContent>
            <Typography variant="overline" gutterBottom>
              {post.pubDate}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1">
              {post.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} size="small" href="post/:id">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  users: PropTypes.object,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  users: getAllUsers(state),
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
