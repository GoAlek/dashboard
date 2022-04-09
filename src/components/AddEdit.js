import React, {useCallback, useContext, useId, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {UsersContext} from '../hooks/useUsers';

export const AddEdit = () => {
  const { userId } = useParams();
  const {state, dispatch} = useContext(UsersContext);
  let editedUser;
  if (userId) {
    const id = Number.parseInt(userId, 10);
    editedUser = state.usersObj[id];
  }
  const [name, setName] = useState(editedUser?.name);
  const [email, setEmail] = useState(editedUser?.email);
  const navigate = useNavigate();

  const allIds = Object.keys(state.usersObj).map(k => Number.parseInt(k, 10));
  const nextId = useCallback(() => {
    const maxId = Math.max(...allIds);
    return  maxId + 1;
  }, [allIds]);

  const createUser = useCallback(async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
      method: 'POST',
      body: JSON.stringify({
        id: nextId(),
        name,
        email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((user) => dispatch({type: 'add', user}))
      .finally(() => navigate('/'));
  }, [dispatch, email, name, navigate, nextId]);

  const nameId = useId();
  const emailId = useId();
  return (
    <div className="ui segment">
      <h4>Form</h4>
      <div className="ui divider"/>
      <form className="ui form" onSubmit={createUser}>
        <div className="field">
          <label htmlFor={nameId}>Name</label>
          <input
            id={nameId}
            type="text"
            name="name"
            placeholder="name"
            onChange={(event) => setName(event.target.value)}
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
