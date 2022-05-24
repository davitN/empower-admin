import { FC, ReactNode } from 'react';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../services/colors.service';

interface PropsTypes {
  value: string | number | null;
  handleChange?: (val: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  customClasses?: string;
  icon?: ReactNode;
  accept?: string;
  required?: boolean,
  desc?: string,
  disabled?: boolean,
  handleClick?: (e : any) => void,
  readOnly?: boolean,
  onKeyPress?: (e?: any) => void
}

const TextInput: FC<PropsTypes> = ({
  value, handleChange, label, placeholder, type = 'text', accept, customClasses, icon, required, desc, disabled, handleClick, readOnly, onKeyPress,
}) => {
  const classes = useStyles();

  return (
    <span className={classNames(classes.fullWidth, 'p-field p-mb-0', icon && 'p-input-icon-left', customClasses)}>
      {label && (
        <label htmlFor="label" className={classNames('p-mb-3', classes.textColor)}>
          {label}
          {required && <span>*</span>}
          {desc && <p className={classes.desc}>{desc}</p>}
        </label>
      )}
      {icon && icon}
      <InputText
        id="label"
        accept={accept}
        disabled={disabled}
        readOnly={readOnly}
        value={value || ''}
        placeholder={placeholder}
        onChange={({ target }) => handleChange && handleChange(target.value)}
        type={type}
        className={classes.root}
        onClick={handleClick || undefined}
        onKeyPress={onKeyPress}
      />
    </span>
  );
};

export default TextInput;

const useStyles = createUseStyles({
  fullWidth: {
    width: '100%',
  },
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
    '&:disabled': {
      cursor: 'not-allowed !important',
      pointerEvents: 'all',
    },
  },
  textColor: {
    color: COLORS.blueWood,
    '& > span': {
      color: COLORS.lightBlue,
    },
  },
  desc: {
    color: COLORS.blueWood,
    fontSize: '0.65rem',
    opacity: 0.8,
    marginTop: '0.3rem',
  },
});
