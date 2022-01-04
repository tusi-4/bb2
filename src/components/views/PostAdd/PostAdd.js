import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './PostAdd.module.scss';

import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAllUsers } from '../../../redux/usersRedux.js';

import { NotFound } from '../NotFound/NotFound';



const Component = ({className, users}) => (
  <div className={clsx(className, styles.root)}>
    <Box className={clsx(className, styles.box)}>
      {users.logged === true ?
        <>
          <TextField
            required
            id="standard-required"
            label="Title"
            variant="filled"
            margin="normal"
          />
          <TextField
            required
            id="standard-multiline-static"
            label="Text"
            multiline
            rows={5}
            variant="filled"
            margin="normal"
          />
          <TextField 
            required
            id="standard-required"
            label="E-mail"
            variant="filled"
            margin="normal"
          />
          <span>dodawacz zdjęcia</span>
          <TextField 
            id="standard"
            label="Price"
            variant="filled"
            margin="normal"
          />
          <TextField 
            id="standard-number"
            label="Phone number"
            variant="filled"
            margin="normal"
          />
          <TextField 
            id="standard"
            label="Location"
            variant="filled"
            margin="normal"
          />
          <Button variant="contained" color="primary" className={clsx(className, styles.btn)}>Add post</Button>
        </>
        :
        <NotFound />
      }
    </Box>
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
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
