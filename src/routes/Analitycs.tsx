import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import Container from '../components/shared/Container';
import COLORS from '../services/colors.service';
import Title from '../components/shared/Title';
import AnalyticBox from '../components/shared/AnalyticsBox';

const Analytics = () => {
  const classes = useStyles();
  return (
    <Container>
      <h1 className={classNames(classes.text, 'text-5xl')}>
        THE POWER OF
        <span>US</span>
        BEGINS WITH
        <span>YOU</span>
      </h1>
      <Title title="ANALYTICS" fontSize="text-2xl" costumeStyles="p-mt-6" />
      <div className={classes.boxes}>
        {new Array(14).fill(1).map(() => <AnalyticBox title="Daily Check-Ins Completed" value="2,500" desc="The total number of users created through the admin panel" />)}
      </div>
    </Container>
  );
};

export default Analytics;

const useStyles = createUseStyles({
  text: {
    margin: 'auto',
    fontWeight: 400,
    color: COLORS.blueWood,
    '& > span': {
      color: COLORS.orange,
      padding: '0 10px',
    },
  },
  boxes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(18rem,1fr))',
    gridGap: '3rem',
  },
});
