import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import COLORS from '../../services/colors.service';
import TextInput from '../shared/Inputs/TextInput';
import Button from '../shared/Inputs/Button';
import { signInActionSG } from '../../store/ducks/authDuck';

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuth = () => {
    setLoading(true);
    dispatch(signInActionSG(values, () => setLoading(false)));
  };

  const disableSubmit = () => {
    return !values.email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/) || !values.password;
  };

  return (
    <div className={classes.root}>
      <h1 className="text-3xl p-flex-initial flex-column p-mb-2">LOG IN</h1>
      <p className={classNames('text-sm p-mb-4 p-mt-0', classes.forgotPassword)}>
        Forget your pasword? Click
        <Link to="/">here.</Link>
      </p>
      <div className="p-d-flex p-flex-column">
        <TextInput
          value={values.email}
          handleChange={(val) => setValues({ ...values, email: val })}
          placeholder="Email"
          onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
        />
        <TextInput
          value={values.password}
          handleChange={(val) => setValues({ ...values, password: val })}
          placeholder="Password"
          type="password"
          customClasses="p-mt-4"
          onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
        />
        <Button customClasses="p-mt-4" handleClick={handleAuth} loading={loading} disabled={disableSubmit()}>Log In </Button>
      </div>
    </div>
  );
};

export default Auth;

const useStyles = createUseStyles({
  root: {
    color: COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '80%',
  },
  forgotPassword: {
    display: 'flex',
    '& > a': {
      textDecoration: 'none',
      color: COLORS.orange,
      paddingLeft: '5px',
    },
  },
});
