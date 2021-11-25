import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../services/colors.service';

interface PropTypes {
  children: ReactNode;
  customClasses?: string;
  handleClick?: () => void;
  loading?: boolean,
}

const ButtonComponent: React.FC<PropTypes> = ({
  children, customClasses, handleClick, loading,
}) => {
  const classes = useStyles();
  return (
    <Button disabled={loading} className={classNames(classes.root, customClasses)} onClick={handleClick}>
      {loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '1.5em' }} /> : children }
    </Button>
  );
};
export default ButtonComponent;

const useStyles = createUseStyles({
  root: {
    color: '#87BCBF',
    backgroundColor: COLORS.white,
    width: '100%',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#87BCBF',
    '&:hover': {
      background: `${COLORS.white} !important`,
      color: '#87BCBF !important',
      borderColor: '#87BCBF !important',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem #04b6bfad !important',
      borderColor: `${COLORS.lightBlue} !important`,
    },
  },
});