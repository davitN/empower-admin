import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../../services/colors.service';

interface PropsTypes {
  value: string;
  handleChange: (val: any) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  costumClasses?: string;
}

const useStyles = createUseStyles({
  root: {
    width: '100%',
    backgroundColor: COLORS.white,
    '&:hover': {
      borderColor: `${COLORS.lightBlue} !important`,
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem #04b6bfad !important',
      borderColor: `${COLORS.lightBlue} !important`,
    },
  },
});

const TextInput = ({
  value,
  handleChange,
  label,
  placeholder,
  type = 'text',
  costumClasses,
}: PropsTypes) => {
  const classes = useStyles();

  return (
    <span className={classNames('p-float-label', costumClasses)}>
      {label && <label htmlFor="username">Username</label>}
      <InputText
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => handleChange(target.value)}
        type={type}
        className={classes.root}
      />
    </span>
  );
};

export default TextInput;
