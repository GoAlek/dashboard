import React, {useCallback, useContext, useEffect, useState} from 'react';
import {UsersContext} from '../hooks/useUsers';
import {Link} from 'react-router-dom';
import {Delete} from './Delete';

export const UserList = () => {
  const {state, dispatch} = useContext(UsersContext);
  const [isAscending, setIsAscending] = useState(true);
  const [userToDelete, setUserToDelete] = useState(undefined);

  const fetchUsers = useCallback(async () => {
    await fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
      .then((response) => response.json())
      .then(users => dispatch({type: 'initial', users}))
  }, [dispatch]);

  useEffect(() => {
    if (!Object.keys(state.usersObj)?.length) {
      fetchUsers();
    }
  }, [fetchUsers, state.usersObj]);

  const compareUsernames = (firstUser, secondUser) => {
    const discriminator = isAscending ? 1 : -1;
    if (!firstUser.username) {
      return discriminator;
    }
    const first = firstUser?.username?.toLowerCase();
    const second = secondUser?.username?.toLowerCase();
    if (first < second) {
      return -discriminator;
    }
    if (first > second) {
      return discriminator;
    }
    return 0;
  }

  return (
    <>
      <div className="ui segment">
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <h4>User list</h4>
          <Link to="/add">
            <div className="ui blue button">Add new</div>
          </Link>
        </div>
        <div className="ui divider"/>
        <table className="ui sortable compact celled striped table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th
                className={`sorted ${isAscending ? 'ascending' : 'descending'}`}
                onClick={() => setIsAscending(!isAscending)}
              >
                Username
              </th>
              <th>Email</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(state.usersObj).sort(compareUsernames).map((user) => user && (
              <tr key={user.id}>
                <td data-label="Id">{user.id}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Username">{user.username}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="City">{user.address?.city}</td>
                <td data-label="Edit">
                  <Link to={`/edit/${user.id}`}>
                    <div className="ui yellow button">edit</div>
                  </Link>
                </td>
                <td data-label="Delete">
                  <div className="ui red button" onClick={() => setUserToDelete(user)}>
                    delete
                  </div>
                </td>
              </tr>
            ))}
            {(Object.values(state.usersObj).every(user => user === undefined)) && (
              <tr>
                <td>
                  <h1 className="ui header orange">There are no users in the system</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {userToDelete && (
        <Delete
          user={userToDelete}
          onDismiss={() => setUserToDelete(undefined)}
        />
      )}
    </>
  )
};
