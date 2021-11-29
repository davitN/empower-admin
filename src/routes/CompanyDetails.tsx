import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Title from '../components/shared/Title';
import COLORS from '../services/colors.service';
import TextInput from '../components/shared/Inputs/TextInput';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';
import Label from '../components/shared/Inputs/Label';
import { getCompanyDetails } from '../store/ducks/companyDetailsDuck';

interface InputsTypes {
  companyName: string,
  payment: string
}

const CompanyDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id: companyId } = useParams();
  const [values, setValues] = useState<InputsTypes>({
    companyName: '',
    payment: '',
  });
  // const isCompanyNew = companyId === 'new';

  useEffect(() => {
    if (companyId !== 'new' && typeof companyId === 'string') {
      dispatch(getCompanyDetails(companyId));
    }
  }, [companyId]);

  return (
    <div className={classNames('p-p-6', classes.root)}>
      <div className="p-d-flex p-jc-between p-ai-center">
        <Title title="VETERINARY GROWTH PARTNERS" fontSize="text-4xl" costumeStyles="p-mr-6" />
        <p className={classNames('p-d-flex p-ai-center p-flex-column text-lg p-text-bold', classes.textColor)}>
          Company ID
          <span className="p-text-normal">{companyId}</span>
        </p>
      </div>
      <Title title="COMPANY INFORMATION" costumeStyles="p-pt-6 p-pb-4" />
      <div className={classes.inputs}>
        <TextInput
          value={values.companyName}
          handleChange={(companyName) => setValues({ ...values, companyName })}
          label="Company Name"
          placeholder="Enter company name..."
          required
        />
        <div className="p-d-flex p-flex-column">
          <Label label="Payment" required costumeStyles="p-mb-3" />
          <div className="p-d-flex">
            <RadioButtonComponent
              label="Company pay for all"
              checked={values.payment === 'COMPANY_PAY_FOR_ALL'}
              onChange={() => setValues({ ...values, payment: 'COMPANY_PAY_FOR_ALL' })}
              costumeClasses="p-mr-6"
            />
            <RadioButtonComponent
              label="Individual locations pay"
              checked={values.payment === 'INDIVIDUAL_LOCATIONS_PAY'}
              onChange={() => setValues({ ...values, payment: 'INDIVIDUAL_LOCATIONS_PAY' })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;

const useStyles = createUseStyles({
  root: {
    width: '100%',
  },
  textColor: {
    color: COLORS.blueWood,
  },
  inputs: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: '1rem',
  },
});
