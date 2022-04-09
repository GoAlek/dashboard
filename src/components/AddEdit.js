import React, {useCallback, useId, useState} from 'react';
import {Link} from 'react-router-dom';

export const AddEdit = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const createUser = useCallback(async () => {
    await fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((json) => console.log(json));
  }, [email, name]);

  const nameId = useId();
  const emailId = useId();
  return (
    <div className="ui segment">
      <h4>Form</h4>
      <div className="ui divider"/>
      <form className="ui form">
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
        <button className="ui green button" type="submit" onSubmit={createUser}>Submit</button>
      </form>
    </div>
  )
};
