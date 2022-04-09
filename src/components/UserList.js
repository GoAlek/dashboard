import React, {useCallback, useEffect, useState} from 'react';

export const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    await fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
      .then((response) => response.json())
      .then(users => setUsers(users))
  }, []);

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
            {users.map((user) => (
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
