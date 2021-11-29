import { FC, ReactNode } from 'react';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../services/colors.service';

interface PropsTypes {
  value: string | number | null;
  handleChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  customClasses?: string;
  icon?: ReactNode
  required?: boolean
}

const TextInput: FC<PropsTypes> = ({
  value, handleChange, label, placeholder, type = 'text', customClasses, icon, required,
}) => {
  const classes = useStyles();

  return (
    <span className={classNames('p-field p-mb-0', icon && 'p-input-icon-left', customClasses)}>
      {label && (
        <label htmlFor="label" className={classNames('p-pl-0', classes.textColor)}>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      {icon && icon}
      <InputText
        id="label"
        value={value || ''}
        placeholder={placeholder}
        onChange={({ target }) => handleChange(target.value)}
        type={type}
        className={classes.root}
      />
    </span>
  );
};

export default TextInput;

const useStyles = createUseStyles({
  root: {
    width: '100%',
    backgroundColor: COLORS.white,
    '&:hover': {
      borderColor: `${COLORS.lightBlue} !important`,
    },
    '&:focus': {
      boxShadow: 'none !important',
      borderColor: `${COLORS.lightBlue} !important`,
    },
  },
  textColor: {
    color: COLORS.blueWood,
    '& > span': {
      color: COLORS.lightBlue,
    },
  },
});
