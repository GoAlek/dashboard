import {createContext, useMemo, useReducer} from 'react';
import {usersReducer} from './users.store';

export const UsersContext = createContext({
  state: {},
  dispatch: () => {}
});

export const useUsers = () => {
  const [state, dispatch] = useReducer(usersReducer, {users: {}});

  return useMemo(() => ({
    state,
    dispatch,
  }), [state]);
}
