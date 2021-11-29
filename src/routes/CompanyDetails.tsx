import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useState } from 'react';
import Title from '../components/shared/Title';
import COLORS from '../services/colors.service';
import TextInput from '../components/shared/Inputs/TextInput';

interface InputsTypes {
  companyName: string,
  payment: string
}

const CompanyDetails = () => {
  const classes = useStyles();
  const { id: companyId } = useParams();
  const [values, setValues] = useState<InputsTypes>({
    companyName: '',
    payment: 'all',
  });
  // const isCompanyNew = companyId === 'new';

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
