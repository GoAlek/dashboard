const initialState = {users: {}};

export function usersReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const {user} = action;
      return {
        users: {
          ...state.users,
          [action.user.id]: user,
        }
      }
    }
    case 'edit': {
      const {user} = action;
      const previousUser = state.users[user.id]
      return {
        users: {
          ...state.users,
          [action.user.id]: {
            ...previousUser,
            ...user,
          },
        }
      }
    }
    case 'delete': {
      const {id} = action;
      return {
        users: {
          ...state.users,
          [id]: undefined,
        }
      }
    }
    default:
      throw new Error();
  }
}
