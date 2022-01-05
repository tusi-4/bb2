import Axios from 'axios';

/* selectors */
export const getAll = ({posts}) => posts.data;
// export const getOne = ({posts}, id) => posts.data.find(post => post.id === id );
export const getOne = ({posts}) => posts.post;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_ONE = createActionName('FETCH_ONE');

const ADD_POST = createActionName('ADD_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOne = payload => ({ payload, type: FETCH_ONE });

export const addPost = payload => ({ payload, type: ADD_POST });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const{ posts } = getState();
    if(posts.data.length === 0 && posts.loading.active === false){
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchById = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchOne(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostRequest = (post) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .post('http://localhost:8000/api/posts/add', post)
      .then(res => {
        dispatch(addPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ONE: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        post: action.payload,
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    default:
      return statePart;
  }
};
