import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { ProgressSpinner } from 'primereact/progressspinner';

const PaymentsFinished = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classNames(classes.container, 'p-p-4 p-shadow-3 p-w-28')}>
        <h1 className={classNames('p-text-center', classes.title)}>Payment Status</h1>
        <div className="p-d-flex p-ai-center p-mt-4">
          <ProgressSpinner />
        </div>
      </div>
    </div>
  );
};

export default PaymentsFinished;

const useStyles = createUseStyles({
  root: {
    width: '100vw',
    padding: '0 2rem',
  },
  container: {
    maxWidth: '70rem',
    width: '100%',
    margin: 'auto',
  },
  title: {
    opacity: 0.7,
  },
});
