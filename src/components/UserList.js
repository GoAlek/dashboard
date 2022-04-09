import React, {useCallback, useContext, useEffect, useState} from 'react';
import {UsersContext} from '../hooks/useUsers';

export const UserList = () => {
  const {state, dispatch} = useContext(UsersContext);
  
  const fetchUsers = useCallback(async () => {
    await fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
      .then((response) => response.json())
      .then(users => dispatch({type: 'initial', users}))
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="ui segment">
        <p>User list</p>
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
            {Object.values(state.usersObj).map((user) => (
              <tr key={user.id}>
                <td data-label="Id">{user.id}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Username">{user.username}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="City">{user.address.city}</td>
                <td data-label="Edit">
                  <div className="ui yellow button">edit</div>
                </td>
                <td data-label="Delete">
                  <div className="ui red button">delete</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
};
