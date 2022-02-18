import classNames from 'classnames';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';

const Dialog = ({
  visible, setVisible, accept, reject, msg,
}: { visible: boolean, setVisible: () => void, msg: string, accept: () => void, reject: () => void }) => {
  const classes = useStyles();
  return (
    <ConfirmDialog
      visible={visible}
      onHide={setVisible}
      message={msg}
      header="Confirmation"
      icon="pi pi-exclamation-triangle"
      accept={accept}
      reject={reject}
      acceptClassName={classNames(classes.btn, classes.bgColor)}
      rejectClassName={classes.btn}
    />
  );
};

export default Dialog;

const useStyles = createUseStyles({
  btn: {
    background: 'transparent !important',
    color: `${COLORS.blueWood} !important`,
    outline: 'none',
    border: 'none',
    '& :hover': {
      background: 'transparent !important',
      outline: 'none',
      border: 'none !important',
      color: 'inherit !important',
    },
    '&:focus': {
      outline: 'none !important',
      boxShadow: 'none !important',
    },
  },
  bgColor: {
    background: `${COLORS.lightBlue} !important`,
  },
});
