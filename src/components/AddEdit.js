import React, {useId} from 'react';
import {Link} from 'react-router-dom';

export const AddEdit = () => {
  const nameId = useId();
  const emailId = useId();
  return (
    <div className="ui segment">
      <h4>Form</h4>
      <div className="ui divider"/>
      <form className="ui form">
        <div className="field">
          <label htmlFor={nameId}>First Name</label>
          <input id={nameId} type="text" name="first-name" placeholder="First name"/>
        </div>
        <div className="field">
          <label htmlFor={emailId}>Email</label>
          <input id={emailId} type="email" name="email" placeholder="email"/>
        </div>
        <Link to="/">
          <button className="ui button" type="button">Cancel</button>
        </Link>
        <button className="ui green button" type="submit">Submit</button>
      </form>
    </div>
  )
};
