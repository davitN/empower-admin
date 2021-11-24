import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';

const useStyles = createUseStyles({
  logo: {
    fontSize: '48px',
  },
  title: {
    maxWidth: '50rem',
    textAlign: 'center',
    color: COLORS.blueWood,
    '& h1': {
      letterSpacing: '2px',
      fontWeight: 400,
    },
  },
  container: {
    maxWidth: '70rem',
    width: '100%',
  },
});

const Payments = () => {
  const classes = useStyles();

  return (
    <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
      <div className={classes.logo}>Logo</div>
      <div className={classNames('p-d-flex p-flex-column p-jc-center', classes.title)}>
        <h1>JOIN THE EMPOWER PROGRAM</h1>
        <p className="p-pt-4 p-pb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nam, tempore ex libero doloribus aliquid
          illo blanditiis ea architecto hic, consectetur in eius enim labore quis id. Similique unde voluptatem tempore
          quidem quo repellendus odio magni expedita sit, libero, optio nemo corrupti consequuntur ullam accusantium?
          Aliquid blanditiis aliquam earum quasi corrupti vitae rem voluptatum debitis adipisci. Natus delectus qui
          illo!
        </p>
      </div>
      <div className={classNames(classes.container, 'p-shadow-3 p-d-flex')}>qwdqwd</div>
    </div>
  );
};

export default Payments;
