import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';

const useStyles = createUseStyles({
  root: {
    color: COLORS.while,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default useStyles;
