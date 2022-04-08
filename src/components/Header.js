import React from 'react';
import {Link} from 'react-router-dom';

export const Header = () => (
  <div className="ui secondary pointing menu">
    <Link to="/" className="item">
      <h1>Dashboard</h1>
    </Link>
  </div>
);
