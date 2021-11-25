import React from 'react';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../../services/colors.service';

interface PropsTypes {
  value: string | number | null;
  handleChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  customClasses?: string;
}

const TextInput: React.FC<PropsTypes> = ({
  value, handleChange, label, placeholder, type = 'text', customClasses,
}) => {
  const classes = useStyles();

  return (
    <span className={classNames('p-field p-mb-0', customClasses)}>
      {label && (
        <label htmlFor="label" className="p-pl-1">
          {label}
        </label>
      )}
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
      boxShadow: '0 0 0 0.2rem #04b6bfad !important',
      borderColor: `${COLORS.lightBlue} !important`,
    },
  },
});
