import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPaymentStatus } from '../store/ducks/paymentsDuck';
import { RootState } from '../store/configureStore';
import { PaymentDataType } from '../types/payments';

const PaymentsFinished = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { paymentData }: { paymentData: PaymentDataType | null } = useSelector((state: RootState) => state.paymentsReducer);

  useEffect(() => {
    dispatch(getPaymentStatus({
      clientSecret: 'pi_3KAEnQEPVI7wKwnS026x6O0T_secret_B2NFqRUuABgIMAe2erDG66hf7',
    }));
  }, [paymentData]);

  return (
    <div className={classes.root}>
      <div className={classNames(classes.container, 'p-p-4 p-shadow-3 p-w-28')}>
        <h1 className={classNames('p-text-center', classes.title)}>Payment Status</h1>
        {!paymentData?.status && (
        <div className="p-d-flex p-ai-center p-mt-4">
          <ProgressSpinner />
        </div>
        )}
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
