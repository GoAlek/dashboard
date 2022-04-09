import React, {useCallback, useContext, useId, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {UsersContext} from '../hooks/useUsers';

export const AddEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UsersContext);
  
  const allIds = Object.keys(state.usersObj).map(k => Number.parseInt(k, 10));
  const nextId = useCallback(() => {
    const maxId = Math.max(...allIds);
    return  maxId + 1;
  }, [allIds]);

  const id = userId ? Number.parseInt(userId, 10) : nextId();
  let editedUser;
  if (userId) {
    editedUser = state.usersObj[id];
  }
  const initialName = editedUser ? editedUser.name : '';
  const initialEmail = editedUser ? editedUser.email : '';
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const requestUrl = userId ?
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${userId}`
      : 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';
    await fetch(requestUrl, {
      method: userId ? 'PUT' : 'POST',
      body: JSON.stringify({
        id,
        name,
        email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((user) => dispatch({type: userId ? 'edit' : 'add', user}))
      .finally(() => navigate('/'));
  }, [dispatch, email, id, name, navigate, userId]);

  const nameId = useId();
  const emailId = useId();
  return (
    <div className="ui segment">
      <h4>Form</h4>
      <div className="ui divider"/>
      <form className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor={nameId}>Name</label>
          <input
            id={nameId}
            type="text"
            name="name"
            placeholder="name"
            onChange={(event) => setName(event.target.value)}
            required
            value={name}
          />
        </div>
        <div className="field">
          <label htmlFor={emailId}>Email</label>
          <input
            id={emailId}
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            required
            value={email}
          />
        </div>
        <Link to="/">
          <button className="ui button" type="button">Cancel</button>
        </Link>
        <button className="ui green button" type="submit">Submit</button>
      </form>
    </div>
  )
};
