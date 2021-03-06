import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import clsx from 'clsx';

import styles from './Post.module.scss';

import { Box } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAllUsers } from '../../../redux/usersRedux.js';
import { getOne, fetchById } from '../../../redux/postsRedux.js';



const Component = ({className, post, users, fetchOnePost}) => {
  useEffect(() => {
    fetchOnePost();
  }, [fetchOnePost]);

  return (
    <div className={clsx(className, styles.root)}>
      <Box className={clsx(className, styles.box)}>
        <Card key={post._id} sx={{ maxWidth: 345 }}>
          {post.photo && 
            <CardMedia
              component="img"
              height="250"
              image={post.photo}
            />
          }
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {post.text}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {post.price && `Price: ${post.price}`}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Contact: {post.author} {post.phone && ` | ${post.phone}`}<br />
              {post.location && `Location: ${post.location}`}
            </Typography>
            <Typography variant="caption">
              Added: {post.created} {post.updated && ` | ${post.updated}`}
            </Typography>
          </CardContent>
          <CardActions>
            {users.logged === true && users.email === post.author || users.type === 'admin' ?
              <Button component={Link} size="small" color="primary" href={`${post._id}/edit`}>Edit</Button>
              :
              <></>
            }
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  users: PropTypes.object,
  post: PropTypes.object,
  fetchOnePost: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  const post = getOne(state, props.match.params.id);

  return ({
    users: getAllUsers(state),
    post,
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchOnePost: () => dispatch(fetchById(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
