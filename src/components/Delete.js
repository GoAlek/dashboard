import React, {useCallback, useContext} from 'react';
import ReactDom from 'react-dom';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {UsersContext} from '../hooks/useUsers';

export const Delete = (props) => {
  const { userId } = useParams();
  const id = Number.parseInt(userId, 10);
  const {state, dispatch} = useContext(UsersContext);
  const userToDelete = state.usersObj[id];
  const navigate = useNavigate();

  const onConfirm = useCallback(async () => {
    fetch(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${userId}`, {
      method: 'DELETE',
    }).then(() => dispatch({type: 'delete', id}))
      .finally(() => navigate('/'));
  }, [dispatch, id, navigate, userId]);

  return ReactDom.createPortal(
    <div className="ui page dimmer visible active">
      <div className="ui mini modal active">
        <div className="header">{`Delete ${userToDelete.name}`}</div>
        <div className="content">
          Are you sure you want to delete user?
        </div>
        <div className="actions">
          <Link to="/">
            <button className="ui black button" type="button">Cancel</button>
          </Link>
          <button className="ui red button" type="button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal'),
  );
};
