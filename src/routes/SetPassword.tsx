import { createUseStyles } from 'react-jss';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import classNames from 'classnames';
import TextInput from '../components/shared/Inputs/TextInput';
import ButtonComponent from '../components/shared/Inputs/Button';
import COLORS from '../services/colors.service';
import { setPassword } from '../store/ducks/setPasswordDuck';

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const apiURL = window.location.href.split('?')[0];
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showError, setShowError] = useState<string>('');
  const [succeed, setSucceed] = useState(false);
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState<{ password: string, repeatPassword: string }>({
    password: '',
    repeatPassword: '',
  });
  const token = searchParams.get('token') || '';

  const handleSend = () => {
    setSending(true);
    dispatch(setPassword({ password: values.password, token, apiURL }, {
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
    <div className={classNames('p-d-flex p-flex-column p-shadow-1 p-p-6', classes.root)}>
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
      {succeed && <p className={classes.blue}>You&apos;ve successfully registered, please use your email and password to sign in the app.</p>}
      {showError && <p className={classes.red}>{showError}</p>}
    </div>
  );
};

export default SetPassword;

const useStyles = createUseStyles({
  root: {
    minWidth: '40rem',
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
