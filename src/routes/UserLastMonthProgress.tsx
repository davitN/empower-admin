/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import { createUseStyles } from 'react-jss';
import Container from '../components/shared/Container';
import { getAppUserLastMonthProgress } from '../store/ducks/appUsersDuck';
import { RootState } from '../store/configureStore';
import {
  CheckIn, Goals, LastMonthProgressItems,
} from '../types/appUsers';
import Title from '../components/shared/Title';
import COLORS from '../services/colors.service';

const UserLastMonthProgress = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { lastMonthProgress }: { lastMonthProgress: LastMonthProgressItems | null } = useSelector((state: RootState) => state.appUsersReducer);

  useEffect(() => {
    if (userId) {
      dispatch(getAppUserLastMonthProgress(userId));
    }
  }, [userId]);
  return (
    <Container sectionTitle="Last Month Progress">
      <Carousel
        contentClassName={classes.item}
        value={lastMonthProgress?.checkIns}
        numVisible={4}
        numScroll={4}
        itemTemplate={(data) => CheckInTemplate(data, classes)}
        header={<Title title="Checkins" fontSize="text-2xl" costumeStyles="p-mb-4" />}
        className="p-mb-6"
      />
      <Carousel
        contentClassName={classes.item}
        value={lastMonthProgress?.completedGoals}
        numVisible={4}
        numScroll={4}
        itemTemplate={(data) => GoalsTemplate(data, classes)}
        header={<Title title="Completed Goals" fontSize="text-2xl" costumeStyles="p-mb-4" />}
        className="p-mb-6"
      />
      <Carousel
        contentClassName={classes.item}
        value={lastMonthProgress?.unCompletedGoals}
        numVisible={4}
        numScroll={4}
        itemTemplate={(data) => GoalsTemplate(data, classes)}
        header={<Title title="Unfinished Goals" fontSize="text-2xl" costumeStyles="p-mb-4" />}
      />
    </Container>
  );
};

export default UserLastMonthProgress;

const useStyles = createUseStyles({
  item: {
    '& .p-carousel-items-container > div ': {
      padding: '5px',
    },
    '& .p-carousel-indicators': {
      display: 'none',
    },
  },
  listItem: {
    marginBottom: '0.5rem',
    cursor: 'pointer',
    listStyleType: 'none',
    color: COLORS.blueWood,
    '& :hover': {
      background: 'rgba(119, 200, 204, 0.3)',
    },
    borderBottom: '1px solid rgba(119, 200, 204, 0.5)',
  },
  listItemWrapper: {
    display: 'flex',
    padding: '0.5rem',
    '& p:nth-child(2)': {
    },
    '& :hover': {
      background: 'none',
    },
  },
});

const CheckInTemplate = (data : CheckIn, classes: any) => {
  const values = Object.keys(data).filter((el) => !excludeKeysCheckIn.includes(el))
    .map((el: string) => ({ label: el.toUpperCase(), value: data[el as keyof CheckIn] }));
  return (
    <div className="p-shadow-3 p-p-4">
      <h3 className="p-text-center p-mb-3">{data.note}</h3>
      <ul className="p-p-0">
        {values.map((el) => (
          <li className={classes.listItem}>
            <div className={classes.listItemWrapper}>
              <p>
                {el.label}
                :
              </p>
              <p className="p-pl-1">{el.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const GoalsTemplate = (data : Goals, classes: any) => {
  const values = Object.keys(data).filter((el) => !excludeKeysGoals.includes(el))
    .map((el: string) => ({ label: el.toUpperCase(), value: data[el as keyof Goals] }));
  const booleanValue = (val: boolean) => (val ? 'YES' : 'NO');
  return (
    <div className="p-shadow-3 p-p-4">
      <h3 className="p-text-center p-mb-3">{data.title}</h3>
      <ul className="p-p-0">
        {values.map((el) => (
          <li className={classes.listItem}>
            <div className={classes.listItemWrapper}>
              <p>
                {el.label}
                :
              </p>
              <p className="p-pl-1">{el.label === 'ISCOMPLETED' ? booleanValue(Boolean(el.value)) : el.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const excludeKeysCheckIn = ['_id', 'userId', 'createdAt', 'updatedAt', '__v', 'note'];

const excludeKeysGoals = ['_id', 'userId', 'createdAt', 'updatedAt', '__v', 'title'];
