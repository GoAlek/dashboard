import React, {useCallback, useContext} from 'react';
import ReactDom from 'react-dom';
import {UsersContext} from '../hooks/useUsers';

export const Delete = ({user, onDismiss}) => {
  const {dispatch} = useContext(UsersContext);
  const {id, name} = user;

  const onConfirm = useCallback(async () => {
    fetch(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`, {
      method: 'DELETE',
    }).then(() => dispatch({type: 'delete', id}));
  }, [dispatch, id]);

  return ReactDom.createPortal(
    <div className="ui page dimmer visible active" onClick={onDismiss}>
      <div className="ui mini modal active">
        <div className="header">{`Delete ${name}`}</div>
        <div className="content">
          Are you sure you want to delete user?
        </div>
        <div className="actions">
          <button className="ui black button" type="button" onClick={onDismiss}>Cancel</button>
          <button className="ui red button" type="button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal'),
  );
};
