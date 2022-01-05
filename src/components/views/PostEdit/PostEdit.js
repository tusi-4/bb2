import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

import clsx from 'clsx';

import styles from './PostEdit.module.scss';

import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { getOne } from '../../../redux/postsRedux.js';
import { getAllUsers } from '../../../redux/usersRedux.js';

import { NotFound } from '../NotFound/NotFound';


const Component = ({className, post, users}) => (
  <div className={clsx(className, styles.root)}>
    <Box className={clsx(className, styles.box)}>
      {users.logged && users.email === post.author ?
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
            value={post.author}
          />
          <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            //onChange={setPhoto}
            singleImage={true}
          />
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
        :
        <NotFound />
      }
    </Box>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  users: PropTypes.object,
  post: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  const post = getOne(state, props.match.params.id);

  return ({
    users: getAllUsers(state),
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
