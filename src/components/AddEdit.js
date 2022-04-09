import React, {useCallback, useContext, useId} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
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
  const onSubmit = useCallback(async (data) => {
    const {name, email} = data;
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
  }, [dispatch, id, navigate, userId]);

  const nameId = useId();
  const emailId = useId();
  let editedUser;
  if (userId) {
    editedUser = state.usersObj[id];
  }
  const initialName = editedUser ? editedUser.name : '';
  const initialEmail = editedUser ? editedUser.email : '';
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {name: initialName, email: initialEmail}
  });

  return (
    <div className="ui segment">
      <h4>Form</h4>
      <div className="ui divider"/>
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <div className={`field ${errors.name ? 'error' : undefined}`}>
          <label htmlFor={nameId}>Name</label>
          <input
            id={nameId}
            placeholder="Name"
            {...register('name', {required: true, minLength: 3})}
          />
          {errors.name?.type === 'required' && "Name is required"}
        </div>
        <div className={`field ${errors.email ? 'error' : undefined}`}>
          <label htmlFor={emailId}>Email</label>
          <input
            id={emailId}
            placeholder="Email"
            {...register('email', {required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
          />
          {errors.email?.type === 'required' && "Email is required"}
          {errors.email?.type === 'pattern' && "Email is not valid"}
        </div>
        <Link to="/">
          <button className="ui button" type="button">Cancel</button>
        </Link>
        <button className="ui green button" type="submit">Submit</button>
      </form>
    </div>
  )
};
