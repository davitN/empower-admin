// import classNames from 'classnames';
// import { useState } from 'react';
// import { Divider } from 'primereact/divider';
// import { createUseStyles } from 'react-jss';
// import COLORS from '../services/colors.service';
// import TextInput from '../components/shared/Inputs/TextInput';
// import Button from '../components/shared/Inputs/Button';

// interface ValuesTypes {
//   email: string;
//   nameOnCard: string;
//   cardNumber: string;
//   expirationDate: {
//     year: string;
//     month: string;
//   };
//   cvc: string;
// }

// const Payments = () => {
//   const classes = useStyles();
//   const [values, setValues] = useState<ValuesTypes>({
//     email: '',
//     nameOnCard: '',
//     cardNumber: '',
//     expirationDate: {
//       year: '',
//       month: '',
//     },
//     cvc: '',
//   });

//   return (
//     <div className={classNames('p-d-flex p-flex-column p-jc-center p-ai-center p-p-4', classes.root)}>
//       <div className={classes.logo}>Logo</div>
//       <div className={classNames('p-d-flex p-flex-column p-jc-center p-text-center', classes.header)}>
//         <h1 className={classes.title}>JOIN THE EMPOWER PROGRAM</h1>
//         <p className="p-pt-4 p-pb-6">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nam, tempore ex libero doloribus aliquid
//           illo blanditiis ea architecto hic, consectetur in eius enim labore quis id. Similique unde voluptatem tempore
//           quidem quo repellendus odio magni expedita sit, libero, optio nemo corrupti consequuntur ullam accusantium?
//           Aliquid blanditiis aliquam earum quasi corrupti vitae rem voluptatum debitis adipisci. Natus delectus qui
//           illo!
//         </p>
//       </div>
//       <div className={classNames(classes.container, 'p-p-6 p-shadow-3')}>
//         <div className="p-d-flex p-flex-column">
//           <h1 className={classes.title}>BILLING INFORMATION</h1>
//           <TextInput
//             label="Email"
//             placeholder="Email"
//             value={values.email}
//             handleChange={(email) => setValues({ ...values, email })}
//             customClasses={classes.inputClasses}
//           />
//           <TextInput
//             label="Name on Card"
//             placeholder="Name on Card"
//             value={values.nameOnCard}
//             handleChange={(nameOnCard) => setValues({ ...values, nameOnCard })}
//             customClasses={classes.inputClasses}
//           />
//           <TextInput
//             label="Card Number"
//             placeholder="Card Number"
//             value={values.cardNumber}
//             handleChange={(cardNumber) => setValues({ ...values, cardNumber })}
//             customClasses={classes.inputClasses}
//           />
//           <div className="p-d-flex p-flex-row p-ai-center p-pt-4">
//             <TextInput
//               placeholder="mm"
//               value={values.expirationDate.month}
//               handleChange={(month) => setValues({ ...values, expirationDate: { ...values.expirationDate, month } })}
//               customClasses={classNames(classes.inputClasses, 'p-pt-0', classes.expirationDate)}
//             />
//             <h3 className="p-px-2"> / </h3>
//             <TextInput
//               placeholder="yy"
//               value={values.expirationDate.year}
//               handleChange={(year) => setValues({ ...values, expirationDate: { ...values.expirationDate, year } })}
//               customClasses={classNames(classes.inputClasses, 'p-pt-0', classes.expirationDate)}
//             />
//           </div>
//         </div>
//         <Divider layout="vertical" className={classes.divider} />
//         <div>
//           <h1 className={classes.title}>ORDER SUBTOTAL</h1>
//           <p className={classNames('text-3xl p-py-4', classes.subTitle)}>
//             Empower program
//             {' '}
//             <span className="text-2xl">$600/year</span>
//           </p>
//           <Button customClasses={classNames(classes.button, 'p-py-4')}>Complete payment</Button>
//           <p className="p-py-4 p-text-center text-sm" style={{ color: COLORS.blueWood }}>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fuga saepe officia a. Molestias deleniti
//             vitae omnis a ipsa praesentium minima in voluptatum repellendus debitis at nostrum laboriosam, tempora unde!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payments;

// const useStyles = createUseStyles({
//   root: {
//     minWidth: '1300px',
//     overflow: 'auto',
//   },
//   logo: {
//     fontSize: '48px',
//   },
//   header: {
//     maxWidth: '50rem',
//     '& p': {
//       color: COLORS.blueWood,
//     },
//   },
//   title: {
//     color: COLORS.blueWood,
//     letterSpacing: '2px',
//     fontWeight: 400,
//   },
//   container: {
//     maxWidth: '70rem',
//     width: '100%',
//     display: 'grid',
//     gridTemplateColumns: '2fr minmax(0, min-content) 1fr',
//     gap: '1.5rem',
//   },
//   inputClasses: {
//     paddingTop: '1.5rem',
//     '& label': {
//       color: COLORS.blueWood,
//     },
//     '& input': {
//       color: COLORS.blueWood,
//     },
//   },
//   expirationDate: {
//     maxWidth: '3rem',
//     width: '100%',
//   },
//   divider: {
//     '&:before': {
//       borderLeft: '3px solid #dee2e6 !important',
//     },
//   },
//   subTitle: {
//     color: COLORS.blueWood,
//     fontWeight: 600,
//     '& span': {
//       color: COLORS.blueWood,
//       fontWeight: 500,
//     },
//   },
//   button: {
//     backgroundColor: COLORS.lightBlue,
//     color: COLORS.white,
//     '&:hover': {
//       backgroundColor: `${COLORS.lightBlue} !important`,
//       color: `${COLORS.white} !important`,
//     },
//   },
// });

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import CheckoutForm from '../components/Payments/CheckoutForm';
import useQuery from '../helpers/hooks/useQuery';
import { backendUrl } from '../services/credentials.service';
import '../styles/payments.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.

const stripePromise = loadStripe(
  'pk_test_51Hqt0jEPVI7wKwnS67prIlDm75i5woaRf9ER3MKXZz9EjtzjI8ZvzSXewSg5kZZKlri5SLHcmjpTx9PxXPWv0sgY006pMc4Qd8',
);

export default function App() {
  const classes = useStyles();
  const query = useQuery();

  const [clientSecret, setClientSecret] = useState('');
  const redirectStatus = query.get('redirect_status');
  const companyId = query.get('companyId');
  const companyName = query.get('companyName');
  useEffect(() => {
    if (redirectStatus === 'succeeded') {
      setTimeout(() => {
        // navigate('auth', { state: null });
      }, 1000);
    }
  }, [query]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        `${backendUrl}payment/create-payment-intent`,
        { body: JSON.stringify({ items: [{ id: 'xl-tshirt' }], companyName, companyId }) },

        { headers: { 'Content-Type': 'application/json' } },
      );
      setClientSecret(data.clientSecret);
    })();
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className={classNames('p-d-flex p-jc-center p-ai-center', classes.container)}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

const useStyles = createUseStyles({
  container: {
    flex: 1,
  },
});
