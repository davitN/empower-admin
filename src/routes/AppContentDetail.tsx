import { createUseStyles } from 'react-jss';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import Label from '../components/shared/Inputs/Label';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';

const contentType = {
  monthly: 'Monthly Team Activity',
  community: 'Community Article',
};

const teamActivity = {
  kickOff: 'KickOff',
  ethos: 'Ethos',
  powerUp: 'Power up',
  gratitude: 'Gratitude',
  powerDown: 'Power down',
};

const AppContentDetail = () => {
  const classes = useStyles();
  return (
    <Container sectionTitle="EDIT CONTENT">
      <div className={classes.root}>
        <div>
          <Title title="Edit Content Details" fontSize="text-2xl" costumeStyles="p-mb-3" />
          <div className="p-d-flex p-flex-column">
            <Label label="Payment" costumeStyles="p-mb-2" />
            <div className="p-d-flex">
              <RadioButtonComponent
                label={contentType.monthly}
                checked
                onChange={() => undefined}
                costumeClasses="p-mr-3"
              />
              <RadioButtonComponent
                label={contentType.community}
                checked={false}
                onChange={() => undefined}
              />
            </div>
          </div>
        </div>
        <div>
          <Title title="Monthly Team Activity Details" fontSize="text-2xl" costumeStyles="p-mb-3" />
          <div className="p-d-flex p-flex-column">
            <Label label="Monthly Team Activity" costumeStyles="p-mb-2" />
            <div className="p-d-flex">
              {Object.values(teamActivity).map((val) => (
                <RadioButtonComponent
                  label={val}
                  checked
                  onChange={() => undefined}
                  costumeClasses="p-mr-3"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AppContentDetail;

const useStyles = createUseStyles({
  root: {
    display: 'grid',
    gridRowGap: '3rem',
  },
});
