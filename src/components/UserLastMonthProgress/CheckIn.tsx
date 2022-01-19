import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';
import { CheckIn } from '../../types/appUsers';

const CheckInTemplate = ({ data }: { data : CheckIn }) => {
  const classes = useStyles();
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

export default CheckInTemplate;

const excludeKeysCheckIn = ['_id', 'userId', 'createdAt', 'updatedAt', '__v', 'note'];

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
  wrapper: {
    display: 'grid',
    gap: '2rem',
    marginBottom: '2rem',
    maxWidth: '40rem',
  },
});
