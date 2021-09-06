import React from 'react';
import classes from '../styles/Layout.module.scss';

const TypographyMain: React.FC = ({ children }) => {
  return <main className={classes['typography-main']}>{children}</main>;
};

export default TypographyMain;
