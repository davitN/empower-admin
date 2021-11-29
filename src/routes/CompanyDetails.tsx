import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import Title from '../components/shared/Title';
import COLORS from '../services/colors.service';
import TextInput from '../components/shared/Inputs/TextInput';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';
import Label from '../components/shared/Inputs/Label';
import { getCompanyDetails } from '../store/ducks/companyDetailsDuck';
import { RootState } from '../store/configureStore';

interface InputsTypes {
  name: string,
  paymentType: string,
  individualLocationPrice: number | null,
  individualLocationPaymentPage: string,
  showTeamSection: boolean
}

const CompanyDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id: companyId } = useParams();
  const { company } = useSelector((state: RootState) => state.companyDetailsReducer);
  const [values, setValues] = useState<InputsTypes>({
    name: '',
    paymentType: '',
    individualLocationPrice: null,
    individualLocationPaymentPage: '',
    showTeamSection: true,
  });
  const isNewCompany = companyId === 'new';

  useEffect(() => {
    if (companyId !== 'new' && typeof companyId === 'string') {
      dispatch(getCompanyDetails(companyId));
    }
  }, [companyId]);

  useEffect(() => {
    if (company) {
      setValues({
        name: company.name,
        paymentType: company.paymentType,
        individualLocationPrice: company.individualLocationPrice,
        individualLocationPaymentPage: company.individualLocationPaymentPage,
        showTeamSection: company.showTeamSection,
      });
    }
  }, [company]);

  return (
    <div className={classNames('p-p-6', classes.root)}>
      <div className="p-d-flex p-jc-between p-ai-center">
        <Title title="VETERINARY GROWTH PARTNERS" fontSize="text-4xl" costumeStyles="p-mr-6" />
        {!isNewCompany && (
          <p className={classNames('p-d-flex p-ai-center p-flex-column text-lg p-text-bold', classes.textColor)}>
            Company ID
            <span className="p-text-normal">{companyId}</span>
          </p>
        )}
      </div>
      <Title title="COMPANY INFORMATION" costumeStyles="p-pt-6 p-pb-4" />
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>
          {!isNewCompany && !company ? (
            <>
              {new Array(8).fill(0).map(() => <Skeleton width="100%" height="2rem" />)}
            </>
          ) : (
            <>
              <TextInput
                value={values.name}
                handleChange={(name) => setValues({ ...values, name })}
                label="Company Name"
                placeholder="Enter company name..."
                required
              />
              <div className="p-d-flex p-flex-column">
                <Label label="Payment" required costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  <RadioButtonComponent
                    label="Company pay for all"
                    checked={values.paymentType === 'COMPANY_PAY_FOR_ALL'}
                    onChange={() => setValues({ ...values, paymentType: 'COMPANY_PAY_FOR_ALL' })}
                    costumeClasses="p-mr-6"
                  />
                  <RadioButtonComponent
                    label="Individual locations pay"
                    checked={values.paymentType === 'INDIVIDUAL_LOCATIONS_PAY'}
                    onChange={() => setValues({ ...values, paymentType: 'INDIVIDUAL_LOCATIONS_PAY' })}
                  />
                </div>
              </div>
              <TextInput
                value={values.individualLocationPrice}
                handleChange={(individualLocationPrice) => setValues({ ...values, individualLocationPrice: Number(individualLocationPrice) })}
                label="Individual Location Price"
                placeholder="Enter price..."
                desc="Enter the yearly price that each location will need to pay to access the app."
                required
                type="number"
              />
              <TextInput
                value={values.individualLocationPaymentPage}
                handleChange={(individualLocationPaymentPage) => setValues({ ...values, individualLocationPaymentPage })}
                label="Individual Location Payment Page"
                placeholder="Enter payment page..."
                desc="This is the page where individual locations can go to play for access to the app"
              />
              <div className="p-d-flex p-flex-column">
                <Label label="Team Section" required costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  <RadioButtonComponent
                    label="Show"
                    checked={values.showTeamSection}
                    onChange={() => setValues({ ...values, showTeamSection: true })}
                    costumeClasses="p-mr-6"
                  />
                  <RadioButtonComponent
                    label="Hide"
                    checked={!values.showTeamSection}
                    onChange={() => setValues({ ...values, showTeamSection: false })}
                  />
                </div>
              </div>
            </>
          )}

        </div>
        <div className={classes.justifyEnd}>left</div>
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
    gridGap: '1.5rem',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
  },
  justifyEnd: {
    justifySelf: 'end',
  },
});
