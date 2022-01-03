export const getAllUsers = ({users}) => users;

const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

const FETCH_USERS = createActionName('FETCH_USERS');

export const fetchUsers = payload => ({ payload, type: FETCH_USERS });

export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_USERS: {
      return {
        ...statePart,
        logged: action.payload,
      };
    }
    default:
      return statePart;
  }
};