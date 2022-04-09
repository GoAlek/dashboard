import React, {useCallback, useContext, useEffect} from 'react';
import {UsersContext} from '../hooks/useUsers';
import {Link} from 'react-router-dom';

export const UserList = () => {
  const {state, dispatch} = useContext(UsersContext);
  
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
        <table className="ui compact celled definition table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(state.usersObj).map((user) => user && (
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
                  <Link to={`/delete/${user.id}`}>
                    <div className="ui red button">delete</div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
};
