import classNames from 'classnames';
import { Button } from 'primereact/button';
import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../../services/colors.service';

interface PropTypes {
  children: ReactNode;
  costumClasses?: any;
  handleClick?: () => void;
}

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

const ButtonComponent = ({
  children,
  costumClasses,
  handleClick,
}: PropTypes) => {
  const classes = useStyles();
  return (
    <Button
      className={classNames(classes.root, costumClasses)}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
export default ButtonComponent;
