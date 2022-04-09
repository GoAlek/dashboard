import React from 'react';
import {Link} from 'react-router-dom';

export const Header = () => (
  <Link to="/" className="item">
    <h1 className="ui header">Dashboard</h1>
  </Link>
);
