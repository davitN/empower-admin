import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';

const AnalyticBox = ({ title, value, desc }: { title: string, value: string | number, desc: string }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classNames(classes.wrapper, 'p-p-4')}>
        <p className={classes.title}>{title}</p>
        <p className={classes.value}>{value}</p>
      </div>
      <p className={classes.description}>{desc}</p>
    </div>
  );
};

export default AnalyticBox;

const useStyles = createUseStyles({
  wrapper: {
    color: COLORS.white,
    height: '8rem',
    width: '100%',
    background: 'linear-gradient(180deg, rgba(255,207,153,1) 47%, rgba(255,186,109,1) 100%)',
  },
  title: {
    marginBottom: '0.1rem',
    fontSize: '1.3rem',
    fontWeight: 500,
  },
  value: {
    fontWeight: 600,
    fontSize: '2rem',
  },
  description: {
    opacity: 0.7,
    color: COLORS.blueWood,
    fontSize: '0.7rem',
    marginTop: '0.5rem',
  },
});
