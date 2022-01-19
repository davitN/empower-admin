import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';
import { CheckIn, Goals } from '../../types/appUsers';

const CheckInTemplate = ({ data, type }: { data : any, type: string }) => {
  const classes = useStyles();
  const returnBooleanVal = (val: boolean) => (val ? 'YES' : 'NO');
  switch (type) {
    case 'CHECKIN':
      return (
        <div className="p-shadow-3 p-p-3">
          <h2 className="p-text-center p-py-3">{data.note}</h2>
          {data && checkInKeys.map(({ key, label }) => (
            <div className={classes.listItem}>
              {label}
              :
              <span>{data[key]}</span>
            </div>
          ))}
        </div>
      );
    case 'GOALS':
      return (
        <div className="p-shadow-3 p-p-3">
          <h2 className="p-text-center p-py-3">{data.note}</h2>
          {data && goalsKeys.map(({ key, label }) => (
            <div className={classes.listItem}>
              {label}
              :
              <span className="p-ml-2">{key === 'isCompleted' ? returnBooleanVal(data[key]) : data[key]}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default CheckInTemplate;

const checkInKeys: { key: keyof CheckIn, label: string }[] = [
  {
    key: 'physical',
    label: 'PHYSICAL',
  },
  {
    key: 'mental',
    label: 'MENTAL',
  },
  {
    key: 'social',
    label: 'SOCIAL',
  },
  {
    key: 'occupational',
    label: 'OCCUPATIONAL',
  },
  {
    key: 'environmental',
    label: 'ENVIRONMENTAL',
  },
  {
    key: 'emotional',
    label: 'EMOTIONAL',
  },
  {
    key: 'spiritual',
    label: 'SPIRITUAL',
  },
];

const goalsKeys: { key: keyof Goals, label: string }[] = [
  {
    key: 'isCompleted',
    label: 'COMPLETED',
  },
  {
    key: 'text',
    label: 'TEXT',
  },
];

const useStyles = createUseStyles({
  listItem: {
    padding: '0.5rem',
    cursor: 'pointer',
    color: COLORS.blueWood,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '&:hover': {
      background: 'rgba(119, 200, 204, 0.3)',
    },
    borderBottom: '1px solid rgba(119, 200, 204, 0.5)',
  },
});
