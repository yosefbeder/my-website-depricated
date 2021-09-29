import React from 'react';
import classes from '../styles/Layout.module.scss';
import { UserDataType } from '../types';
import Sidebar from './Sidebar';

interface LayoutProps {
  userData: UserDataType;
}

const Layout: React.FC<LayoutProps> = ({ children, userData }) => {
  return (
    <div className={classes.container}>
      <Sidebar {...userData} />
      {children}
    </div>
  );
};

export default Layout;
