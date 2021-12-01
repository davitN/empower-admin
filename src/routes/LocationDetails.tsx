import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import TextInput from '../components/shared/Inputs/TextInput';

interface ValuesTypes {
  name: string,
  company: string
}

const initialState = {
  name: '',
  company: '',
};

const LocationDetails = () => {
  const classes = useStyles();
  const { id: locationId } = useParams();
  const [values, setValues] = useState<ValuesTypes>(initialState);
  //   const isNewLocation = locationId === 'new';

  return (
    <Container itemId={locationId} idText="Location ID" sectionTitle="STAR OF TEXAS VETERINARY HOSPITAL">
      <Title title="LOCATION INFORMATION" costumeStyles="p-pb-4" />
      <div className={classes.wrapper}>
        <div className={classes.inputs}>
          <TextInput
            value={values.name}
            handleChange={(name) => setValues({ ...values, name })}
            label="Location Name"
            placeholder="Enter location name..."
            required
          />
          <TextInput
            value={values.company}
            label="Company"
            placeholder="Enter company name..."
            required
            disabled
          />
        </div>
      </div>
    </Container>
  );
};

export default LocationDetails;

const useStyles = createUseStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
  },
  inputs: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: '1.5rem',
  },
});
