import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import Container from '../components/shared/Container';
import COLORS from '../services/colors.service';

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
});
