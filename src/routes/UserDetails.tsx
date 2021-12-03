import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../components/shared/Container';
import TextInput from '../components/shared/Inputs/TextInput';
import Button from '../components/shared/Inputs/Button';
import COLORS from '../services/colors.service';
import { getAppUserDetails } from '../store/ducks/appUsersDuck';

const UserDetails = () => {
  const { id: userId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const isNewUser = userId === 'new';

  useEffect(() => {
    if (!isNewUser) {
      userId && dispatch(getAppUserDetails(userId));
    }
  }, [isNewUser, userId]);
  return (
    <Container sectionTitle="New User" idText="User ID" itemId={userId}>
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>
          <div className="p-d-flex">
            <TextInput
              value=""
              label="First Name"
              placeholder="Enter first name..."
              required
              customClasses="p-mr-3"
            />
            <TextInput
              value=""
              label="Last Name"
              placeholder="Enter last name..."
              required
            />
          </div>
          <TextInput
            value=""
            label="Email"
            placeholder="Enter email..."
            required
          />
          <TextInput
            value=""
            label="Phone"
            placeholder="Enter phone..."
          />
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
