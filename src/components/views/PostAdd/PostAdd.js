import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

import clsx from 'clsx';

import styles from './PostAdd.module.scss';

import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAllUsers } from '../../../redux/usersRedux.js';
//import { addPostRequest } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';



class Component extends React.Component {
  state = {
    post: {
      title: '',
      text: '',
      pubDate: '',
      upDate: '',
      email: '',
      status: '',
      image: '',
      price: '',
      phone: '',
      location: '',
    },
  }

  updateTextField = ({ target }) => {
    const { post } = this.state;
    const { value, name} = target;

    this.setState({ post: {...post, [name]: value }});
  }

  submitForm = async (e) => {
    const { post } = this.state;
    //const { addPost } = this.props;

    e.preventDefault();

    if(post.title.length > 10 && post.text.length > 20 && post.email.includes('@')){
      // await addPost(post);
      this.setState({
        post: {
          title: '',
          text: '',
          pubDate: '',
          upDate: '',
          email: '',
          status: '',
          image: '',
          price: '',
          phone: '',
          location: '',
        },
      });
    }
  }

  render() {
    const { updateTextField, submitForm } = this;
    const { className, users } = this.props;
    const { post } = this.state;

    return (
      <div className={clsx(className, styles.root)}>
        <Box className={clsx(className, styles.box)}>
          {users.logged === true ?
            <form onSubmit={submitForm} className={clsx(className, styles.form)}>
              <TextField
                required
                id="standard-required"
                label="Title"
                variant="filled"
                margin="normal"
                value={post.title}
                name="title"
                onChange={updateTextField}
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
                name="text"
                onChange={updateTextField}
              />
              <TextField 
                required
                id="standard-required"
                label="E-mail"
                variant="filled"
                margin="normal"
                value={post.email}
                name="email"
                onChange={updateTextField}
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
                name="price"
                onChange={updateTextField}
              />
              <TextField 
                id="standard-number"
                label="Phone number"
                variant="filled"
                margin="normal"
                value={post.phone}
                name="phone"
                onChange={updateTextField}
              />
              <TextField 
                id="standard"
                label="Location"
                variant="filled"
                margin="normal"
                value={post.location}
                name="location"
                onChange={updateTextField}
              />
              <Button type="submit" variant="contained" color="primary" className={clsx(className, styles.btn)}>Add post</Button>
            </form>
            :
            <NotFound />
          }
        </Box>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  users: PropTypes.object,
  //addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  users: getAllUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   addPost: (post) => dispatch(addPostRequest(post)),
// });

const Container = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
