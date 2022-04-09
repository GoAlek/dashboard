export function usersReducer(state, action) {
  switch (action.type) {
    case 'initial': {
      const {users} = action;
      return {
        usersObj: users.reduce((acc, user) => ({
          ...acc,
          [user.id]: user,
        }), {}),
      }
    }
    case 'add': {
      const {user} = action;
      return {
        usersObj: {
          ...state.usersObj,
          [action.user.id]: user,
        }
      }
    }
    case 'edit': {
      const {user} = action;
      const previousUser = state.usersObj[user.id]
      return {
        usersObj: {
          ...state.usersObj,
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
        usersObj: {
          ...state.usersObj,
          [id]: undefined,
        }
      }
    }
    default:
      throw new Error();
  }
}
