import { createUseStyles } from 'react-jss';
import { useSearchParams } from 'react-router-dom';
import TextInput from '../components/shared/Inputs/TextInput';
import ButtonComponent from '../components/shared/Inputs/Button';
import COLORS from '../services/colors.service';

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const classes = useStyles();
  console.log(searchParams.get('token'));
  return (
    <div className="p-d-flex p-flex-column p-shadow-1 p-p-6">
      <TextInput type="password" label="Password" value="" handleChange={(val) => console.log(val)} customClasses="p-mb-4" />
      <TextInput type="password" label="Repeat Password" value="" handleChange={(val) => console.log(val)} customClasses="p-mb-4" />
      <ButtonComponent bgColor={COLORS.lightBlue} textColor={COLORS.white}>Submit </ButtonComponent>
      {/* <p className={classes.textColor}>You've successfully registered, please use your email and password to sign in the app.</p> */}
    </div>
  );
};

export default SetPassword;

const useStyles = createUseStyles({
  textColor: {
    color: COLORS.lightBlue,
    fontWeight: 600,
  },
});
