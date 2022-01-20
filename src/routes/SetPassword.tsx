import { createUseStyles } from 'react-jss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import classNames from 'classnames';
import TextInput from '../components/shared/Inputs/TextInput';
import ButtonComponent from '../components/shared/Inputs/Button';
import COLORS from '../services/colors.service';
import { setPassword } from '../store/ducks/setPasswordDuck';

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const classes = useStyles();
  const [showError, setShowError] = useState<string>('');
  const [succeed, setSucceed] = useState(false);
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState<{ password: string, repeatPassword: string }>({
    password: '',
    repeatPassword: '',
  });
  const token = searchParams.get('token') || '';
  const type = searchParams.get('type') || '';

  const handleSend = () => {
    setSending(true);
    dispatch(setPassword({ password: values.password, token, type }, {
      error: (message: string) => {
        setSending(false);
        setShowError(message);
      },
      success: () => {
        setSending(false);
        setSucceed(true);
      },
    }));
  };
  return (
    <div className={classNames('p-d-flex p-flex-column p-shadow-1 p-p-4 sm:p-p-6', classes.root)}>
      {!showError && !succeed && (
        <>
          <TextInput
            type="password"
            label="Password"
            value={values.password}
            handleChange={(password) => setValues({ ...values, password })}
            customClasses="p-mb-4"
          />
          <TextInput
            type="password"
            label="Repeat Password"
            value={values.repeatPassword}
            handleChange={(repeatPassword) => setValues({ ...values, repeatPassword })}
            customClasses="p-mb-4"
          />
          <ButtonComponent
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            handleClick={handleSend}
            disabled={!token || values.password.length < 6 || (values.password !== values.repeatPassword)}
            loading={sending}
          >
            Submit
          </ButtonComponent>
        </>
      )}
      {succeed && (
      <p className={classes.blue}>
        {pathname === '/set_password'
          ? 'You&apos;ve successfully registered, please use your email and password to sign in the app.' : 'Password was changed successfully'}
      </p>
      )}
      {showError && <p className={classes.red}>{showError}</p>}
    </div>
  );
};

export default SetPassword;

const useStyles = createUseStyles({
  root: {
    maxWidth: '40rem',
    width: '100%',
    placeSelf: 'center',
    margin: '0 2rem !important',
  },
  blue: {
    color: COLORS.lightBlue,
    fontWeight: 600,
    textAlign: 'center',
  },
  red: {
    color: COLORS.red,
    fontWeight: 600,
    textAlign: 'center',
  },
});
