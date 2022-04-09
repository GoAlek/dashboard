import React from 'react';

export const UserList = () => (
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
      </table>
    </div>
  </>
);
