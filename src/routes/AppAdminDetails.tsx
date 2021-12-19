import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import Container from '../components/shared/Container';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import Select from '../components/shared/Inputs/Select';
import TextInput from '../components/shared/Inputs/TextInput';
import {
  getAppAdminsRoles, resetAppAdminsState, saveAppAdminDetails, getAppAdminDetails, resetAppAdminDetailsState,
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
  const [isSaving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const { adminsRoles, adminDetails } :
  { adminsRoles: AppAdminsRoles[], adminDetails: AppAdmin } = useSelector((state: RootState) => state.appAdminsReducer);

  const [values, setValues] = useState<ValuesTypes>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: null,
  });
  const { id: adminId } = useParams();
  const isNewAdmin = adminId === 'new';
  const isInputsValid = !!(values.firstName && values.lastName && values.email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/) && values.phone && values.role);

  const handleSave = () => {
    setSaving(true);
    dispatch(saveAppAdminDetails(
      {
        data: { ...values, role: values.role?.['_id'] || '' },
        adminId,
      },
      {
        success: () => setSaving(false),
        error: () => setSaving(false),
      },
    ));
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

  return (
    <Container sectionTitle="Add New Admin">
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
              <TextInput label="Phone" value={values.phone} handleChange={(phone) => setValues({ ...values, phone })} required />
              {!adminsRoles ? <Skeleton width="100%" height="3rem" /> : (
                <Select
                  selectedValue={values.role}
                  data={adminsRoles}
                  label="Admin Role"
                  required
                  handleChange={(role) => setValues({ ...values, role })}
                />
              )}
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            save={{
              handler: handleSave,
              disabled: !isInputsValid || isSaving,
              loading: isSaving,
            }}
            remove={{
              handler: () => console.log('save'),
              label: 'Remove Admin',
              disabled: isSaving,
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
