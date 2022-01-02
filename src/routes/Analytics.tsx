import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import Container from '../components/shared/Container';
import COLORS from '../services/colors.service';
import Title from '../components/shared/Title';
import AnalyticBox from '../components/shared/AnalyticsBox';
import ProgressBar from '../components/shared/ProgressBar';

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
      <div className={classNames(classes.boxes, 'p-pt-5 p-pb-6')}>
        {new Array(14).fill(1).map(() => <AnalyticBox title="Daily Check-Ins Completed" value="2,500" desc="The total number of users created through the admin panel" />)}
      </div>
      <div className={classes.wrapper}>
        <div>
          <Title title="Top 7 dimensions" costumeStyles="p-mb-5" />
          {new Array(8).fill(1).map(() => <ProgressBar firstTitle="PHYSICAL - " secondTitle="ACCOUNTABILITY - 12" value={(25 * Math.random()).toString()} customStyles="p-mb-3" />)}
        </div>
        <div>
          <Title title="Top Ethos cards" costumeStyles="p-mb-5" />
          {new Array(8).fill(1).map(() => <ProgressBar firstTitle="PHYSICAL - " secondTitle="ACCOUNTABILITY - 12" value={(25 * Math.random()).toString()} customStyles="p-mb-3" />)}
        </div>
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
  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '5rem',
  },
});
