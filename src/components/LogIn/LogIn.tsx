import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import COLORS from '../../services/colors.service';
import TextInput from '../shared/Inputs/TextInput';
import Button from '../shared/Inputs/Button';

const Auth = () => {
  const classes = useStyles();
  const [values, setValues] = useState<{ userName: string; password: string }>({
    userName: '',
    password: '',
  });
  return (
    <div className={classes.root}>
      <h1 className="text-3xl p-flex-initial flex-column p-mb-2">LOG IN</h1>
      <p className={classNames('text-sm p-mb-4 p-mt-0', classes.forgotPassword)}>
        Forget your pasword? Click
        {' '}
        <Link to="/">here.</Link>
      </p>
      <div className="p-d-flex p-flex-column">
        <TextInput
          value={values.userName}
          handleChange={(val) => setValues({ ...values, userName: val })}
          placeholder="Username"
        />
        <TextInput
          value={values.password}
          handleChange={(val) => setValues({ ...values, password: val })}
          placeholder="Password"
          type="password"
          customClasses="p-mt-4"
        />
        <Button customClasses="p-mt-4">Log In </Button>
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
