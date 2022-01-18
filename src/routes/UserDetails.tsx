import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import {
  useParams, useNavigate, useSearchParams, useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import Container from '../components/shared/Container';
import TextInput from '../components/shared/Inputs/TextInput';
import Button from '../components/shared/Inputs/Button';
import COLORS from '../services/colors.service';
import {
  getAppUserDetails, resetAppUserDetails, saveAppUserDetails, sendResetPassword,
} from '../store/ducks/appUsersDuck';
import { RootState } from '../store/configureStore';
import { GetAppUserDetailsData } from '../types/appUsers';
import Select from '../components/shared/Inputs/Select';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  locationId: null,
};

interface ValuesTypes {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  locationId?: string | null,
  _id?: string
}

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const prevLocation = `/${pathname.split('/')[1]}`;
  const [searchParams] = useSearchParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const { userDetails }: { userDetails: GetAppUserDetailsData | null } = useSelector((state: RootState) => state.appUsersReducer);
  const [values, setValues] = useState<ValuesTypes>(initialState);
  const isNewUser = userId === 'new';
  const newUserCompanyName = searchParams.get('companyName')?.replace('_', ' ');
  const newUserCompanyId = searchParams.get('companyId');
  const newUserLocationName = searchParams.get('locationName')?.replace('_', ' ');
  const newUserLocationId = searchParams.get('locationId');

  const validateInputs = () => (values.firstName.length < 1 || values.lastName.length < 1
    || values.phone.length < 1 || !values.email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/));

  const handleReset = () => {
    setSending(true);
    dispatch(sendResetPassword(userId, { error: () => setSending(false), success: () => setSending(false) }));
  };

  const handleSave = () => {
    setLoading(true);
    dispatch(saveAppUserDetails(
      {
        data: values,
        ...!isNewUser && ({ userId }),
      },
      {
        error: () => setLoading(false),
        success: () => {
          setLoading(false);
          isNewUser && navigate(`/locations/${newUserLocationId}`);
        },
      },
    ));
  };

  const selectedCompany = {
    name: isNewUser ? newUserCompanyName || '' : userDetails?.companyId?.name,
    label: isNewUser ? newUserCompanyName || '' : userDetails?.companyId?.name,
  };

  const selectedLocation = {
    name: isNewUser ? newUserLocationName || '' : userDetails?.location?.name,
    label: isNewUser ? newUserLocationName || '' : userDetails?.location?.name,
  };

  useEffect(() => {
    if (userDetails) {
      setValues({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.phone,
        locationId: userDetails.location['_id'],
        _id: userDetails['_id'],
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (!isNewUser) {
      userId && dispatch(getAppUserDetails(userId, { error: () => navigate('/users') }));
    }
  }, [isNewUser, userId]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => () => dispatch(resetAppUserDetails()), []);

  // if user is new check, location and company details exist in query params
  useEffect(() => {
    if ((!newUserCompanyName || !newUserCompanyId || !newUserLocationName || !newUserLocationId) && isNewUser) {
      navigate('/companies');
    } else {
      setValues({ ...values, locationId: newUserLocationId });
    }
  }, [searchParams]);

  return (
    <Container sectionTitle={isNewUser ? 'New User' : 'Edit User'} idText="User ID" itemId={userId} goBack={() => navigate(prevLocation)}>
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>
          {!isNewUser && !userDetails ? (
            <>
              {new Array(5).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="3rem" />)}
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
              <Select
                selectedValue={selectedCompany}
                data={null}
                label="Company Name"
                disabled
              />
              <Select
                selectedValue={selectedLocation}
                data={null}
                label="Location Name"
                disabled
              />
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          {!isNewUser && (
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
            handleClick={handleReset}
            loading={sending}
            disabled={sending}
          >
            Send reset password link
          </Button>
          )}
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
            disabled={validateInputs()}
            handleClick={handleSave}
            loading={loading}
          >
            {isNewUser ? 'Add User' : ' Save user information'}
          </Button>
          <Button
            bgColor={COLORS.red}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
            // handleClick={handleSave}
            loading={loading}
          >
            Delete user
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
    width: '100%',
    '&:disabled': {
      cursor: 'not-allowed !important',
      pointerEvents: 'inherit',
    },
  },
});
