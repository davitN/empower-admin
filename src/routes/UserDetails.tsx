import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import Container from '../components/shared/Container';
import TextInput from '../components/shared/Inputs/TextInput';
import Button from '../components/shared/Inputs/Button';
import COLORS from '../services/colors.service';
import { getAppUserDetails, resetAppUserDetails } from '../store/ducks/appUsersDuck';
import { RootState } from '../store/configureStore';
import { GetAppUserDetailsData } from '../types/appUsers';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

interface ValuesTypes {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
}

const UserDetails = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userDetails }: { userDetails: GetAppUserDetailsData | null } = useSelector((state: RootState) => state.appUsersReducer);
  const [values, setValues] = useState<ValuesTypes>(initialState);
  const isNewUser = userId === 'new';

  const validateInputs = () => (values.firstName.length < 1 || values.lastName.length < 1
    || values.phone.length < 1 || !values.email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/));

  useEffect(() => {
    if (userDetails) {
      setValues({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.phone,
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (!isNewUser) {
      userId && dispatch(getAppUserDetails(userId, { error: () => navigate('companies') }));
    }
  }, [isNewUser, userId]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => () => dispatch(resetAppUserDetails()), []);

  return (
    <Container sectionTitle="New User" idText="User ID" itemId={userId}>
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>
          {!isNewUser && !userDetails ? (
            <>
              {new Array(5).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" />)}
            </>
          ) : (
            <>
              <div className="p-d-flex">
                <TextInput
                  value={values.firstName}
                  label="First Name"
                  placeholder="Enter first name..."
                  required
                  customClasses="p-mr-3"
                  handleChange={(firstName) => setValues({ ...values, firstName })}
                />
                <TextInput
                  value={values.lastName}
                  label="Last Name"
                  placeholder="Enter last name..."
                  handleChange={(lastName) => setValues({ ...values, lastName })}
                  required
                />
              </div>
              <TextInput
                value={values.email}
                label="Email"
                handleChange={(email) => setValues({ ...values, email })}
                placeholder="Enter email..."
                required
              />
              <TextInput
                value={values.phone}
                label="Phone"
                required
                handleChange={(phone) => setValues({ ...values, phone })}
                placeholder="Enter phone..."
              />
              <TextInput
                value={userDetails?.companyId?.name || ''}
                label="Company"
                disabled
              />
              <TextInput
                value={userDetails?.location?.name || ''}
                label="Location"
                disabled
              />
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
          >
            Send reset password link
          </Button>
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
            disabled={validateInputs()}
          >
            Save user information
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default UserDetails;

const useStyles = createUseStyles({
  inputs: {
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gridGap: '1.5rem',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
  },
  justifyEnd: {
    justifySelf: 'end',
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gap: '1rem',
    justifyItems: 'end',
  },
  button: {
    width: 'max-content',
    '&:disabled': {
      cursor: 'not-allowed !important',
      pointerEvents: 'inherit',
    },
  },
});