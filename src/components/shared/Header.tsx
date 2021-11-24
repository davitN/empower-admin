import React from 'react';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  container: {
    width: '100%',
    height: '80px',
    backgroundColor: 'red',
  },
});
function Header() {
  const classes = useStyles();
  return null;
}

export default Header;
