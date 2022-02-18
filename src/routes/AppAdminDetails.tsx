import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation, useNavigate, useParams, useSearchParams,
} from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import Container from '../components/shared/Container';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import Select from '../components/shared/Inputs/Select';
import TextInput from '../components/shared/Inputs/TextInput';
import {
  getAppAdminsRoles, resetAppAdminsState, saveAppAdminDetails, getAppAdminDetails, resetAppAdminDetailsState, removeAppAdmin,
} from '../store/ducks/appAdminsDuck';
import { RootState } from '../store/configureStore';
import { AppAdmin, AppAdminsRoles } from '../types/appAdmin';

interface ValuesTypes {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  role: AppAdminsRoles | null
}

const AppAdminDetails = () => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState<ValuesTypes>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: null,
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const prevLocation = `/${pathname.split('/')[1]}`;
  const { id: adminId, type: adminType } = useParams();
  const { adminsRoles, adminDetails } :
  { adminsRoles: AppAdminsRoles[], adminDetails: AppAdmin } = useSelector((state: RootState) => state.appAdminsReducer);
  const isNewAdmin = adminId === 'new';
  const isInputsValid = !!(values.firstName && values.lastName && values.email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/) && values.role);
  const filteredRoles = adminsRoles && adminsRoles.filter((el) => el.name.toLocaleLowerCase() === adminType?.toLocaleLowerCase());
  const companyName = searchParams.get('companyName')?.replace('_', '  ');
  const companyId = searchParams.get('companyId');
  const locationName = searchParams.get('locationName')?.replace('_', '  ');
  const locationId = searchParams.get('locationId');

  const handleSave = () => {
    setUpdating(true);
    dispatch(saveAppAdminDetails(
      {
        data: {
          ...values,
          role: values.role?.['_id'] || '',
          ...(locationId && { locationId }),
          ...(companyId && { companyId }),

        },
        ...(adminId !== 'new' && { adminId }),
      },
      {
        success: () => setUpdating(false),
        error: () => setUpdating(false),
      },
    ));
  };

  const handleRemove = () => {
    setRemoving(true);
    adminId && dispatch(removeAppAdmin(adminId, {
      success: () => {
        navigate('/app-admins');
      },
      error: () => setRemoving(false),
    }));
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    if (!isNewAdmin) {
      dispatch(getAppAdminDetails(adminId || ''));
    }
    dispatch(getAppAdminsRoles());
    return () => {
      dispatch(resetAppAdminsState());
      dispatch(resetAppAdminDetailsState());
    };
  }, [isNewAdmin]);

  useEffect(() => {
    if (adminDetails) {
      setValues({
        firstName: adminDetails.firstName,
        lastName: adminDetails.lastName,
        phone: adminDetails.phone,
        email: adminDetails.email,
        role: adminDetails.role,
      });
    }
  }, [adminDetails]);

  // set default admin role
  useEffect(() => {
    if (adminsRoles && filteredRoles) {
      setValues({ ...values, role: filteredRoles[0] });
    }
  }, [adminsRoles]);
  return (
    <Container sectionTitle="Add New Admin" goBack={() => navigate(prevLocation)}>
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>
          {!isNewAdmin && !adminDetails ? (
            <>
              {new Array(5).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" />)}
            </>
          ) : (
            <>
              <TextInput label="First Name" value={values.firstName} handleChange={(firstName) => setValues({ ...values, firstName })} required />
              <TextInput label="Last Name" value={values.lastName} handleChange={(lastName) => setValues({ ...values, lastName })} required />
              <TextInput label="Email" value={values.email} handleChange={(email) => setValues({ ...values, email })} required />
              <TextInput label="Phone" value={values.phone} handleChange={(phone) => setValues({ ...values, phone })} />
              {locationName && locationId && <TextInput label="Location" value={locationName} disabled />}
              {companyName && companyId && <TextInput label="Company" value={companyName} disabled />}
              {!adminsRoles ? <Skeleton width="100%" height="3rem" /> : (
                <Select
                  selectedValue={values.role}
                  data={filteredRoles}
                  label="Admin Role"
                  required
                  handleChange={(role) => setValues({ ...values, role })}
                  disabled
                />
              )}
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            save={{
              handler: handleSave,
              disabled: !isInputsValid || updating,
              loading: updating,
            }}
            remove={{
              handler: handleRemove,
              label: 'Remove Admin',
              disabled: updating,
              loading: removing,
              hidden: isNewAdmin || (!isNewAdmin && !adminDetails),
            }}
            isNewItem={isNewAdmin}
          />
        </div>
      </div>
    </Container>
  );
};

export default AppAdminDetails;

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
});
