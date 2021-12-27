import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { createUseStyles } from 'react-jss';
import { useSearchParams } from 'react-router-dom';

const CheckoutForm = () => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const paidTill = searchParams.get('paidTill') || new Date();
  const clientSecret = new URLSearchParams(window.location.search).get(
    'payment_intent_client_secret',
  );

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // ToDo ახალი გვერდი უნდა
        return_url: `http://localhost:3000/payments/finished?clientSecret=${clientSecret}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message ? error.message : '');
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };
  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      {new Date(paidTill).valueOf() > new Date().valueOf() && (
      <p className={classes.paidTill}>
        Paid until:
        <span className="p-ml-1">
          {dateFormat.format(new Date(new Date(paidTill)))}
        </span>
      </p>
      )}
      <form id="payment-form" onSubmit={handleSubmit} className={classes.form}>
        <PaymentElement id="payment-element" />
        <button type="submit" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner" /> : 'Pay now'}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;

const useStyles = createUseStyles({
  form: {
    width: '30vw',
    minWidth: '500px',
    alignSelf: 'center',
    boxShadow: '0px 0px 0px 0.5px rgba(50, 50, 93, 0.1) 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
    borderRadius: '7px',
    padding: '40px',
  },
  paidTill: {
    fontSize: '1.5rem',
    opacity: 0.7,
    fontWeight: '500',
    letterSpacing: '0.7px',
    marginBottom: '0.5rem',
  },
});

const dateFormat = Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});
