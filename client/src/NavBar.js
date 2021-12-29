import React from 'react';

export const NavBar = ({ onLogout }) => (
  <nav>
    <div className="navbar-end">
      <button
        className="button navbar-item"
        onClick={onLogout}
      >Logout</button>
    </div>
  </nav>
);
