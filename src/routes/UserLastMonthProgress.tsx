import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Carousel from 'react-multi-carousel';
import { Skeleton } from 'primereact/skeleton';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Container from '../components/shared/Container';
import { getAppUserLastMonthProgress, getAppUserDetails } from '../store/ducks/appUsersDuck';
import { RootState } from '../store/configureStore';
import {
  GetAppUserDetailsData, LastMonthProgressItems,
} from '../types/appUsers';
import Title from '../components/shared/Title';
import TextInput from '../components/shared/Inputs/TextInput';
import 'react-multi-carousel/lib/styles.css';
import Items, { checkInKeys } from '../components/UserLastMonthProgress/Items';

const UserLastMonthProgress = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { lastMonthProgress }: { lastMonthProgress: LastMonthProgressItems | null } = useSelector((state: RootState) => state.appUsersReducer);
  const { userDetails }: { userDetails: GetAppUserDetailsData | null } = useSelector((state: RootState) => state.appUsersReducer);

  const averageCheckInPerKeys = () => {
    const total = lastMonthProgress?.checkIns && lastMonthProgress.checkIns.reduce((totalSum: any, curCheckIn) => {
      const data = checkInKeys.reduce((acc, { key }) => ({
        ...acc,
        [key]: totalSum[key] ? totalSum[key] + curCheckIn[key] : curCheckIn[key],
      }), {});
      return data;
    }, {});
    const average = total && Object.keys(total).reduce((acc, cur) => ({
      ...acc,
      [cur]: Math.trunc(total[cur] / (lastMonthProgress?.checkIns.length || 1)),
    }), {});
    return average;
  };

  console.log(averageCheckInPerKeys());

  useEffect(() => {
    if (userId) {
      dispatch(getAppUserLastMonthProgress(userId));
      dispatch(getAppUserDetails(userId));
    }
  }, [userId]);
  return (
    <Container sectionTitle="Last Month Progress">
      <div className={classes.wrapper}>
        <div className={classes.inputsWrapper}>
          {userDetails ? (
            <>
              <TextInput
                value={userDetails?.firstName || ''}
                label="First Name"
                required
                customClasses="p-mr-3"
                disabled
              />
              <TextInput
                value={userDetails?.lastName || ''}
                label="Last Name"
                required
                customClasses="p-mr-3"
                disabled
              />
              <TextInput
                value={userDetails?.email || ''}
                label="Email"
                required
                customClasses="p-mr-3"
                disabled
              />
            </>
          ) : new Array(3).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="3rem" />)}
        </div>
        <div className="p-mt-0">
          {averageCheckInPerKeys() ? <Items type="CHECKIN" data={{ ...averageCheckInPerKeys(), note: 'Average CheckIn' }} /> : <Skeleton height="250px" />}
        </div>
      </div>
      <Splitter>
        <SplitterPanel className="p-px-4 p-py-3 p-d-flex p-ai-center">
          Check in:
          <strong className="p-ml-2">{ lastMonthProgress?.checkIns ? lastMonthProgress?.checkIns.length : <Skeleton width="3rem" height="1.3rem" />}</strong>
        </SplitterPanel>
        <SplitterPanel className="p-px-4 p-py-3 p-d-flex p-ai-center">
          Completed goals :
          <strong className="p-ml-2">{ lastMonthProgress?.completedGoals ? lastMonthProgress?.completedGoals.length : <Skeleton width="3rem" height="1.3rem" />}</strong>
        </SplitterPanel>
        <SplitterPanel className="p-px-4 p-py-3 p-d-flex p-ai-center">
          Uncompleted goals:
          <strong className="p-ml-2">{ lastMonthProgress?.unCompletedGoals ? lastMonthProgress?.unCompletedGoals.length : <Skeleton width="3rem" height="1.3rem" />}</strong>
        </SplitterPanel>
      </Splitter>
      <div className="p-mt-6">
        <Title title="Checkins" costumeStyles="p-mb-2" />
        <Carousel responsive={responsive} className={classes.carousel}>
          { lastMonthProgress?.checkIns ? lastMonthProgress.checkIns.map((el) => <Items type="CHECKIN" data={el} key={el['_id']} />) : new Array(10).fill(0).map(() => <Skeleton height="250px" key={Math.random()} />) }
        </Carousel>
      </div>
      <div className="p-mt-6">
        <Title title="Completed Goals" costumeStyles="p-mb-2" />
        <Carousel responsive={responsive} className={classes.carousel}>
          { lastMonthProgress?.completedGoals ? lastMonthProgress.completedGoals.map((el) => <Items type="GOALS" data={el} key={el['createdAt']} />) : new Array(10).fill(0).map(() => <Skeleton height="250px" key={Math.random()} />) }
        </Carousel>
      </div>
      <div className="p-mt-6">
        <Title title="Unfinished Goals" costumeStyles="p-mb-2" />
        <Carousel responsive={responsive} className={classes.carousel}>
          { lastMonthProgress?.unCompletedGoals ? lastMonthProgress.unCompletedGoals.map((el) => <Items type="GOALS" data={el} key={el['createdAt']} />) : new Array(10).fill(0).map(() => <Skeleton height="250px" key={Math.random()} />) }
        </Carousel>
      </div>
    </Container>
  );
};

export default UserLastMonthProgress;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const useStyles = createUseStyles({
  carousel: {
    '& .react-multiple-carousel__arrow': {
      width: 'max-content',
    },
    '& li': {
      margin: '10px',
    },
  },
  inputsWrapper: {
    display: 'grid',
    gap: '2rem',
    maxWidth: '30rem',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    marginBottom: '4rem',
  },
});
