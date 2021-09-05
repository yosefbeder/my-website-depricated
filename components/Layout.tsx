import React from 'react';
import classes from '../styles/Layout.module.scss';
import Sidebar from './Sidebar';

const Layout: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      <Sidebar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Layout;
