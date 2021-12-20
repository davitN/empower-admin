import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Skeleton } from 'primereact/skeleton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/shared/Container';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import TextInput from '../components/shared/Inputs/TextInput';
import { RootState } from '../store/configureStore';
import {
  getAppUserAccount, resetAppUserAccountPassword, resetAppUserAccountState, updateAppUserAccount,
} from '../store/ducks/appUserAccount';
import { User } from '../types/appUserAccount';

interface ValuesTypes {
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}

const AppUserAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const [isSending, setSending] = useState(false);
  const { user }: { user: User | null } = useSelector((state: RootState) => state.appUserAccountReducer);

  const [values, setValues] = useState<ValuesTypes>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const isInputsValid = !(values.firstName.length < 1 || values.lastName.length < 1
    || values.phone.length < 1 || !values.email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/));

  useEffect(() => {
    dispatch(getAppUserAccount());
  }, []);

  useEffect(() => {
    if (user) {
      setValues({ ...values, ...user });
    }
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    return () => dispatch(resetAppUserAccountState());
  }, []);

  return (
    <Container sectionTitle="Edit Info">
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>
          {!user ? new Array(5).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="3rem" />) : (
            <>
              <TextInput label="First Name" value={values.firstName} handleChange={(firstName) => setValues({ ...values, firstName })} required />
              <TextInput label="Last Name" value={values.lastName} handleChange={(lastName) => setValues({ ...values, lastName })} required />
              <TextInput label="Email" value={values.email} handleChange={(email) => setValues({ ...values, email })} required />
              <TextInput label="Phone" value={values.phone} handleChange={(phone) => setValues({ ...values, phone })} required />
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            save={{
              handler: () => {
                setSaving(true);
                dispatch(updateAppUserAccount(values, {
                  success: () => setSaving(false),
                  error: () => setSaving(false),
                }));
              },
              disabled: !isInputsValid || saving,
              loading: saving,
            }}
            customButtons={[
              {
                label: 'Reset Password',
                handler: () => {
                  setSending(true);
                  dispatch(resetAppUserAccountPassword({ success: () => setSending(false), error: () => setSending(false) }));
                },
                loading: isSending,
                disabled: isSending,
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
};

export default AppUserAccount;

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
