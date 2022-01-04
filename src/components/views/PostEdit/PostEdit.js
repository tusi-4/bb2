import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './PostEdit.module.scss';

import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { getOne } from '../../../redux/postsRedux.js';



const Component = ({className, post}) => (
  <div className={clsx(className, styles.root)}>
    <Box className={clsx(className, styles.box)}>
      {post && post.length > 0 && post.map(post => (
        <form className={clsx(className, styles.form)} key={post.id}> {/*vsc zada elementu nadrzednego, i gdzies trzeba wrzucic key*/}
          <TextField
            required
            id="standard-required"
            label="Title"
            variant="filled"
            margin="normal"
            value={post.title}
          />
          <TextField
            required
            id="standard-multiline-static"
            label="Text"
            multiline
            rows={5}
            variant="filled"
            margin="normal"
            value={post.text}
          />
          <TextField 
            required
            id="standard-required"
            label="E-mail"
            variant="filled"
            margin="normal"
            value={post.email}
          />
          <span>dodawacz zdjęcia</span>
          <TextField 
            id="standard"
            label="Price"
            variant="filled"
            margin="normal"
            value={post.price}
          />
          <TextField 
            id="standard-number"
            label="Phone number"
            variant="filled"
            margin="normal"
            value={post.phone}
          />
          <TextField 
            id="standard"
            label="Location"
            variant="filled"
            margin="normal"
            value={post.location}
          />
          <Button variant="contained" color="primary" className={clsx(className, styles.btn)}>Edit post</Button> {/*to powinien byc submit*/}
        </form>
      ))}
    </Box>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.array,
};

const mapStateToProps = (state, props) => {
  const post = getOne(state, props.match.params.id);

  return ({
    post,
  });
};

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
