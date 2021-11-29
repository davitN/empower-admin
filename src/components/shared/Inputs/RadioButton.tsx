import classNames from 'classnames';
import { RadioButton } from 'primereact/radiobutton';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../services/colors.service';
import Label from './Label';

const RadioButtonComponent = ({
  label, checked, onChange, costumeClasses,
}: { label: string, checked: boolean, onChange: Function, costumeClasses?: string }) => {
  const classes = useStyles();

  return (
    <div className={classNames('p-field-radiobutton', classes.root, costumeClasses)}>
      <RadioButton id={label} onChange={(e) => onChange(e)} checked={checked} />
      <Label htmlFor={label} label={label} />
    </div>
  );
};

export default RadioButtonComponent;

const useStyles = createUseStyles({
  root: {
    '& > div > .p-radiobutton-box': {
      border: `1px solid ${COLORS.blueWood} !important`,
    },
    '& > div > .p-radiobutton-box:focus': {
      boxShadow: 'none !important',
    },
    '& > div > .p-focus': {
      boxShadow: 'none !important',
    },
    '& > div > .p-radiobutton-box.p-highlight': {
      background: `${COLORS.lightBlue} !important`,
    },
  },
  label: {
    color: COLORS.blueWood,
  },
});
