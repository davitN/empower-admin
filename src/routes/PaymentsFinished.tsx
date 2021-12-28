import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPaymentStatus } from '../store/ducks/paymentsDuck';
import { RootState } from '../store/configureStore';
import { PaymentDataType } from '../types/payments';
import COLORS from '../services/colors.service';

const PaymentsFinished = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const { paymentData }: { paymentData: PaymentDataType | null } = useSelector((state: RootState) => state.paymentsReducer);
  const intervalRef = useRef<any>();
  const clientSecret = searchParams.get('payment_intent_client_secret');

  useEffect(() => {
    if (clientSecret) {
      dispatch(getPaymentStatus({
        clientSecret,
      }, { success: () => setLoading(false), error: () => setLoading(false) }));
    }
  }, [clientSecret]);

  useEffect(() => {
    if (!(paymentData?.status === 'SUCCESS' || paymentData?.status === 'DECLINED') && !loading && clientSecret) {
      intervalRef.current = setInterval(() => {
        dispatch(getPaymentStatus({
          clientSecret,
        }, { success: () => setLoading(false), error: () => setLoading(false) }));
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paymentData, loading, clientSecret]);

  return (
    <div className={classes.root}>
      <div className={classNames(classes.container, 'p-p-4 p-shadow-3 p-w-28')}>
        <h1 className={classNames('p-text-center', classes.title)}>Payment Status</h1>
        {!(paymentData?.status === 'SUCCESS' || paymentData?.status === 'DECLINED') && (
        <div className="p-d-flex p-ai-center p-mt-4">
          <ProgressSpinner />
        </div>
        )}
        {paymentData?.status === 'SUCCESS' && (
        <p className={classes.success}>Payments has been successfully finished</p>
        )}
        {paymentData?.status === 'DECLINED' && (
        <p className={classes.error}>Something went wrong...</p>
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
  success: {
    color: COLORS.lightBlue,
    fontWeight: 600,
    fontSize: '1.2rem',
    margin: 'auto',
    textAlign: 'center',
    marginTop: '1rem',
  },
  error: {
    color: COLORS.red,
    fontWeight: 600,
    fontSize: '1.2rem',
    margin: 'auto',
    textAlign: 'center',
    marginTop: '1rem',
  },
});
