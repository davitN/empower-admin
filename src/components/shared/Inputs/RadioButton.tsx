import classNames from 'classnames';
import { RadioButton } from 'primereact/radiobutton';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../services/colors.service';
import Label from './Label';

const RadioButtonComponent = ({
  label, checked, onChange, costumeClasses, value,
}: { label: string, checked: boolean, onChange: Function, costumeClasses?: string, value?: string }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, costumeClasses)}>
      <RadioButton id={label} onChange={(e) => onChange(e)} checked={checked} value={value} />
      <Label htmlFor={label} label={label} costumeStyles="text-sm p-pl-2 p-text-normal" />
    </div>
  );
};

export default RadioButtonComponent;

const useStyles = createUseStyles({
  root: {
    '& > .p-radiobutton': {
      width: '17px',
      height: '16px',
    },
    '& > div > .p-radiobutton-box': {
      border: `1px solid ${COLORS.blueWood} !important`,
      width: '17px',
      height: '16px',
      '& > .p-radiobutton-icon': {
        width: '9px',
        height: '9px',
      },
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
