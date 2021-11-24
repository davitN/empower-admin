import classNames from 'classnames';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';
import TextInput from '../shared/Inputs/TextInput';
import { Divider } from 'primereact/divider';
import Button from '../shared/Inputs/Button';

const useStyles = createUseStyles({
  logo: {
    fontSize: '48px',
  },
  header: {
    maxWidth: '50rem',
    '& p': {
      color: COLORS.blueWood,
    },
  },
  title: {
    color: COLORS.blueWood,
    letterSpacing: '2px',
    fontWeight: 400,
  },
  container: {
    maxWidth: '70rem',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '2fr minmax(0, min-content) 1fr',
    gap: '1.5rem',
  },
  inputClasses: {
    paddingTop: '1.5rem',
    '& label': {
      color: COLORS.blueWood,
    },
    '& input': {
      color: COLORS.blueWood,
    },
  },
  expirationDate: {
    maxWidth: '3rem',
    width: '100%',
  },
  divider: {
    '&:before': {
      borderLeft: '3px solid #dee2e6 !important',
    },
  },
  subTitle: {
    color: COLORS.blueWood,
    fontWeight: 600,
    '& span': {
      color: COLORS.blueWood,
      fontWeight: 500,
    },
  },
  button: {
    backgroundColor: COLORS.lightBlue,
    color: COLORS.white,
    '&:hover': {
      backgroundColor: `${COLORS.lightBlue} !important`,
      color: `${COLORS.white} !important`,
    },
  },
});

interface ValuesTypes {
  email: string | null;
  nameOnCard: string | null;
  cardNumber: number | null;
  expirationDate: {
    year: number | null;
    month: number | null;
  };
  cvc: number | null;
}

const Payments = () => {
  const classes = useStyles();
  const [values, setValues] = useState<ValuesTypes>({
    email: null,
    nameOnCard: null,
    cardNumber: null,
    expirationDate: {
      year: null,
      month: null,
    },
    cvc: null,
  });

  return (
    <div className="p-d-flex p-flex-column p-jc-center p-ai-center p-p-4">
      <div className={classes.logo}>Logo</div>
      <div className={classNames('p-d-flex p-flex-column p-jc-center p-text-center', classes.header)}>
        <h1 className={classes.title}>JOIN THE EMPOWER PROGRAM</h1>
        <p className="p-pt-4 p-pb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nam, tempore ex libero doloribus aliquid
          illo blanditiis ea architecto hic, consectetur in eius enim labore quis id. Similique unde voluptatem tempore
          quidem quo repellendus odio magni expedita sit, libero, optio nemo corrupti consequuntur ullam accusantium?
          Aliquid blanditiis aliquam earum quasi corrupti vitae rem voluptatum debitis adipisci. Natus delectus qui
          illo!
        </p>
      </div>
      <div className={classNames(classes.container, 'p-p-6 p-shadow-3')}>
        <div className="p-d-flex p-flex-column">
          <h1 className={classes.title}>BILLING INFORMATION</h1>
          <TextInput
            label="Email"
            placeholder="Email"
            value={values.email}
            handleChange={(email) => setValues({ ...values, email })}
            costumClasses={classes.inputClasses}
          />
          <TextInput
            label="Name on Card"
            placeholder="Name on Card"
            value={values.nameOnCard}
            handleChange={(nameOnCard) => setValues({ ...values, nameOnCard })}
            costumClasses={classes.inputClasses}
          />
          <TextInput
            label="Card Number"
            placeholder="Card Number"
            value={values.cardNumber}
            handleChange={(cardNumber) => setValues({ ...values, cardNumber })}
            costumClasses={classes.inputClasses}
          />
          <div className="p-d-flex p-flex-row p-ai-center p-pt-4">
            <TextInput
              placeholder="mm"
              value={values.expirationDate.month}
              handleChange={(month) => setValues({ ...values, expirationDate: { ...values.expirationDate, month } })}
              costumClasses={classNames(classes.inputClasses, 'p-pt-0', classes.expirationDate)}
            />
            <h3 className="p-px-2"> / </h3>
            <TextInput
              placeholder="yy"
              value={values.expirationDate.year}
              handleChange={(year) => setValues({ ...values, expirationDate: { ...values.expirationDate, year } })}
              costumClasses={classNames(classes.inputClasses, 'p-pt-0', classes.expirationDate)}
            />
          </div>
        </div>
        <Divider layout="vertical" className={classes.divider} />
        <div>
          <h1 className={classes.title}>ORDER SUBTOTAL</h1>
          <p className={classNames('text-3xl p-py-4', classes.subTitle)}>
            Empower program <span className="text-2xl">$600/year</span>
          </p>
          <Button costumClasses={classNames(classes.button, 'p-py-4')}>Complete payment</Button>
          <p className="p-py-4 p-text-center text-sm" style={{ color: COLORS.blueWood }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fuga saepe officia a. Molestias deleniti
            vitae omnis a ipsa praesentium minima in voluptatum repellendus debitis at nostrum laboriosam, tempora unde!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payments;
