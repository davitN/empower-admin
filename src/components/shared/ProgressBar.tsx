import { ProgressBar } from 'primereact/progressbar';
import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';

const ProgressBarComponent = ({
  firstTitle, secondTitle, value, customStyles,
}: { firstTitle: string, secondTitle:string, value: string, customStyles?: any }) => {
  const classes = useStyles();
  return (
    <div className={customStyles}>
      <p className={classes.title}>
        {firstTitle}
        <span>{secondTitle}</span>
      </p>
      <ProgressBar value={value} showValue={false} className={classes.root} />
    </div>
  );
};

export default ProgressBarComponent;

const useStyles = createUseStyles({
  root: {
    height: '0.8rem',
    backgroundColor: 'transparent !important',
    '& > div': {
      background: `${COLORS.orange} !important`,
    },
  },
  title: {
    color: COLORS.blueWood,
    fontWeight: 600,
    marginBottom: '0.5rem',
    '& > span': {
      color: COLORS.orange,
    },
  },
});
