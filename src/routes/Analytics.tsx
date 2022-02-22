import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import COLORS from '../services/colors.service';
import Title from '../components/shared/Title';
import AnalyticBox from '../components/shared/AnalyticsBox';
import ProgressBar from '../components/shared/ProgressBar';
import { getAnalytics } from '../store/ducks/analyticsDuck';
import { RootState } from '../store/configureStore';
import { secondsToHms } from '../helpers/utils';

const Analytics = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { analytics } = useSelector((state: RootState) => state.analyticsReducer);
  const analyticsArr: { title: string, val: number | string, desc: string }[] = analytics ? [
    {
      title: 'Total Users',
      val: analytics.totalUsers,
      desc: 'The total number of App Users that have been added via the admin panel.',
    },
    {
      title: 'Daily Active Users',
      val: analytics.dailyActiveUsers,
      desc: 'The number of users who have opened the app in the last 24 hours.',
    },
    {
      title: 'Monthly Active Users',
      val: analytics.monthlyActiveUsers,
      desc: 'The number of monthly users who opened the app in the last 30 days.',
    },
    {
      title: ' Monthly Inactive Users',
      val: analytics.monthlyInactiveUsers,
      desc: 'The number of users who do not open the app in the last 30 days.',
    },
    {
      title: 'Monthly Retention Rate',
      val: analytics.monthlyRetentionRate,
      desc: 'Percentage of users who open the app at least one time in the last 30 days.',
    },
    {
      title: 'Average session length',
      val: secondsToHms(analytics.averageSessionLength),
      desc: 'The average amount of time the users spend on the app in a single session.',
    },
    {
      title: 'Stickiness ratio',
      val: analytics.stickinessRatio,
      desc: 'The ratio of the number of users who have returned to the app more than one time in the last 30 days.',
    },
    {
      title: 'Power•Up content viewed',
      val: analytics.powerUpContentViewCount,
      desc: 'The number of times a piece of Power•Up content from the General Library part of the mobile app was viewed by users.',
    },
    {
      title: 'Power•Down content viewed',
      val: analytics.powerDownContentViewCount,
      desc: 'The number of times a piece of Power•Down content from the General Library part of the mobile app was viewed by users.',
    },
    {
      title: 'Wellness content viewed',
      val: analytics.wellnessContentViewCount,
      desc: 'The number of times a piece of Wellness content from the General Library part of the mobile app was viewed by users.',
    },
    {
      title: 'Goals set',
      val: analytics.setGoals,
      desc: 'The number of Goals set/created by all app users.',
    },
    {
      title: 'Goals completed',
      val: analytics.completedGoals,
      desc: 'The number of Goals that have been marked as complete by all app users.',
    },
    {
      title: 'Daily Check-Ins Completed',
      val: analytics.checkInCount,
      desc: 'The number of Daily Check-Ins that have been completed by all App Users.',
    },

  ] : [];
  const companyAnalytics: { title: string, val: number | string, desc: string }[] | [] = analytics?.companyName ? [
    {
      title: 'Team - Kickoff Content Completed',
      val: analytics.teamKickOffContentViewCount || 0,
      desc: 'The number of times the Team Kickoff Content (which can be viewed in the app on both the "For You"/Home screen and the Team screen) is tapped and viewed by a user from this company only.',
    },
    {
      title: 'Team - Ethos Content Completed',
      val: analytics.teamEthosContentViewCount || 0,
      desc: 'The number of times the Team Ethos How To Content (which can be viewed in the app on both the "For You"/Home screen and the Team screen) is tapped and viewed by a user from this company only',
    },
    {
      title: 'Team - Wellness Content Completed',
      val: analytics.teamWellnessContentViewCount || 0,
      desc: 'The number of times the Team Wellness Content (which can be viewed in the app on both the "For You"/Home screen and the Team screen) is tapped and viewed by a user from this company only.',
    },
    {
      title: 'Team - Power•Up Content Completed',
      val: analytics.teamPowerUpContentViewCount || 0,
      desc: 'The number of times the Team Power•Up Content (which can be viewed in the app on both the "For You"/Home screen and the Team screen) is tapped and viewed by a user from this company only.',
    },
    {
      title: 'Team - Power•Down Content Completed',
      val: analytics.teamPowerDownContentViewCount || 0,
      desc: 'he number of times the Team Power•Down Content (which can be viewed in the app on both the "For You"/Home screen and the Team screen) is tapped and viewed by a user from this company only.',
    },
  ] : [];
  const topEthosByDimension: { title: string, val: string | number }[] = analytics ? [
    {
      title: analytics.topEthosByEmotional.title,
      val: analytics.topEthosByEmotional.count,
    },
    {
      title: analytics.topEthosByEnvironmental.title,
      val: analytics.topEthosByEnvironmental.count,
    },
    {
      title: analytics.topEthosByMental.title,
      val: analytics.topEthosByMental.count,
    },
    {
      title: analytics.topEthosByOccupational.title,
      val: analytics.topEthosByOccupational.count,
    },
    {
      title: analytics.topEthosByPhysical.title,
      val: analytics.topEthosByPhysical.count,
    },
    {
      title: analytics.topEthosBySocial.title,
      val: analytics.topEthosBySocial.count,
    },
    {
      title: analytics.topEthosBySpiritual.title,
      val: analytics.topEthosBySpiritual.count,
    },
  ] : [];
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnalytics(companyId || '', { error: () => navigate('/analytics') }));
  }, [companyId]);

  return (
    <Container>
      <h1 className={classNames(classes.text, 'text-5xl')}>
        THE POWER OF
        <span>US</span>
        BEGINS WITH
        <span>YOU</span>
      </h1>
      <Title title={`${analytics?.companyName || ''} ANALYTICS`} fontSize="text-2xl" costumeStyles="p-mt-6" />
      <div className={classNames(classes.boxes, 'p-pt-5 p-pb-6')}>
        {analytics
          ? [...analyticsArr, ...companyAnalytics].map((el) => <AnalyticBox title={el.title} value={el.val} desc={el.desc} />)
          : new Array(10).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="10rem" />)}
      </div>
      <div className={classes.wrapper}>
        <div>
          <Title title="Top 7 Ethos Cards" costumeStyles="p-mb-5" />
          {
             analytics?.top7ChoosenEthosCard.map((item) => (
               <ProgressBar
                 firstTitle="PHYSICAL - "
                 secondTitle={`${item.title}-${item.count}`}
                 value={(25 * Math.random()).toString()}
                 customStyles="p-mb-3"
                 key={item.title}
               />
             ))
            || new Array(7).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" className="p-mb-3" />)
          }
        </div>
        <div>
          <Title title="Top Ethos by Dimension" costumeStyles="p-mb-5" />
          {
             topEthosByDimension?.map((item) => (
               <ProgressBar
                 firstTitle={item.title}
                 secondTitle={` - ${item.val}`}
                 value={(25 * Math.random()).toString()}
                 customStyles="p-mb-3"
                 key={item.title}
               />
             ))
           || new Array(7).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" className="p-mb-3" />)
          }
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
