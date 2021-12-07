import { Dropdown } from 'primereact/dropdown';
import { createUseStyles } from 'react-jss';
import Label from './Label';

interface PropTypes {
  data: any,
  selectedValue: { name?: string, label?: string },
  label: string, disabled?: boolean
}

const Select = ({
  data, selectedValue, label, disabled,
} : PropTypes) => {
  const classes = useStyles();
  return (
    <div className="p-d-flex p-flex-column">
      {label && <Label label={label} costumeStyles="p-mb-3" />}
      <Dropdown
        disabled={disabled}
        className={classes.dropDownTrigger}
        value={selectedValue}
        options={data}
        onChange={(e) => console.log(e.target.value)}
        optionLabel="name"
        placeholder="Select a City"
      />
    </div>
  );
};

export default Select;

const useStyles = createUseStyles({
  alignEnd: {
    alignItems: 'flex-end',
  },
  buttonsWrapper: {
    marginTop: '50px',
  },
  dropDownTrigger: {
    '&:disabled': {
      pointerEvents: 'all !important',
      cursor: 'not-allowed !important',
    },
    '& .p-dropdown-trigger': {
      background: '#87BCBF',
      '& .p-dropdown-trigger-icon': {
        color: 'white',
      },
    },
    '&:not(.p-disabled):hover': {
      borderColor: '#87BCBF',
    },
    '&:not(.p-disabled).p-focus': {
      borderColor: '#87BCBF',
      boxShadow: 'none',
    },
  },
});
