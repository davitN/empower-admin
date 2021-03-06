import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';
import { CheckIn, Goals } from '../../types/appUsers';

const CheckInTemplate = ({ data, type }: { data : any, type: string }) => {
  const classes = useStyles();
  switch (type) {
    case 'CHECKIN':
      return (
        <div className="p-shadow-3 p-p-3">
          {data?.note && <h2 className="p-text-center p-py-3">{data.note}</h2>}
          <table className={classes.table}>
            <tbody>
              {data && checkInKeys.map(({ key, label }) => (
                <tr key={key}>
                  <th className="p-p-2" align="left">
                    {label}
                  </th>
                  <th align="left" className={classes.truncate}>{data[key]}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'GOALS':
      return (
        <div className="p-shadow-3 p-p-3">
          <h2 className="p-text-center p-py-3">{data.title}</h2>
          <table className={classes.table}>
            <tbody>
              {data && goalsKeys.map(({ key, label }) => (
                <tr key={key}>
                  <th className="p-p-2">
                    {label}
                    :
                  </th>
                  <th align="left" className={classes.truncate}>{data[key]}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
};

export default CheckInTemplate;

export const checkInKeys: { key: keyof CheckIn, label: string }[] = [
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
    key: 'text',
    label: 'TEXT',
  },
];

const useStyles = createUseStyles({
  listItem: {
    padding: '0.5rem',
    cursor: 'pointer',
    color: COLORS.blueWood,
    '&:hover': {
      background: 'rgba(119, 200, 204, 0.3)',
    },
    borderBottom: '1px solid rgba(119, 200, 204, 0.5)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    '& tr': {
      cursor: 'pointer',
      '&:hover': {
        background: 'rgba(119, 200, 204, 0.3)',
      },
    },
    '& th': {
      fontWeight: 500,
    },
  },
  truncate: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '10rem',
  },
});
