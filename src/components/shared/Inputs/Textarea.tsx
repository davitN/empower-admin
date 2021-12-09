import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { InputTextarea } from 'primereact/inputtextarea';
import COLORS from '../../../services/colors.service';

interface PropsTypes {
  value: string | number | null;
  handleChange?: (val: string) => void;
  label?: string;
  placeholder?: string;
  customClasses?: string;
  icon?: ReactNode
  required?: boolean,
  desc?: string,
  disabled?: boolean
}

const Textarea: FC<PropsTypes> = ({
  value, handleChange, label, placeholder, customClasses, icon, required, desc, disabled,
}) => {
  const classes = useStyles();

  return (
    <span className={classNames(classes.fullWidth, 'p-field p-mb-0', icon && 'p-input-icon-left', customClasses)}>
      {label && (
        <label htmlFor={`textarea-label${label}`} className={classNames('p-mb-3', classes.textColor)}>
          {label}
          {required && <span>*</span>}
          {desc && <p className={classes.desc}>{desc}</p>}
        </label>
      )}
      {icon && icon}
      <InputTextarea
        id={`textarea-label${label}`}
        disabled={disabled}
        value={value || ''}
        placeholder={placeholder}
        onChange={({ target }) => handleChange && handleChange(target.value)}
        className={classes.root}
        rows={4}
      />
    </span>
  );
};

export default Textarea;

const useStyles = createUseStyles({
  fullWidth: {
    width: '100%',
  },
  root: {
    resize: 'none',
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
