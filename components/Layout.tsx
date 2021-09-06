import React from 'react';
import classes from '../styles/Layout.module.scss';
import Sidebar from './Sidebar';

const Layout: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
