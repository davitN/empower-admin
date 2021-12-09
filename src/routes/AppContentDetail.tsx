import { createUseStyles } from 'react-jss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import Label from '../components/shared/Inputs/Label';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';
import { Types, ContentType } from '../types/appContent';
import FileUploadForm from '../components/shared/FileUploadForm';

interface ValueTypes {
  activityType: Types,
  type: ContentType,
  title: string,
  subTitle: string,
  description: string,
  companyId?: string | null
}

const activityType: { label: string, value: Types }[] = [
  {
    label: 'KickOff',
    value: 'KICK_OFF',
  },
  {
    label: 'Ethos',
    value: 'ETHOS',
  },
  {
    label: 'Power up',
    value: 'POWER_UP',
  },
  {
    label: 'Gratitude',
    value: 'GRATITUDE',
  },
  {
    label: 'Power down',
    value: 'POWER_DOWN',
  },
];

const contentType : { label: string, value: ContentType }[] = [
  {
    label: 'Audio',
    value: 'AUDIO',
  },
  {
    label: 'Video',
    value: 'VIDEO',
  },
];

const AppContentDetail = () => {
  const [searchParams] = useSearchParams();
  const classes = useStyles();
  const [values, setValues] = useState<ValueTypes>({
    activityType: 'KICK_OFF',
    type: 'VIDEO',
    title: '',
    subTitle: '',
    description: '',
    companyId: '',
  });
  const [uploadedFile, setUploadedFIle] = useState<any>(null);

  useEffect(() => {
    if (searchParams.get('companyId') && searchParams.get('companyName')) {
      setValues({ ...values, companyId: searchParams.get('companyId') });
    }
  }, [searchParams]);

  return (
    <Container sectionTitle="EDIT CONTENT">
      <div>
        <div className={classes.gridWrapper}>
          <div>
            <Title title="Monthly Team Activity Details" fontSize="text-2xl" costumeStyles="p-mb-5" />
            <div className={classes.gridInputsWrapper}>
              <div className="p-d-flex p-flex-column">
                <Label label="Monthly Team Activity" costumeStyles="p-mb-2" />
                <div className="p-d-flex">
                  {activityType.map(({ label, value }) => (
                    <RadioButtonComponent
                      label={label}
                      value={value}
                      checked={values.activityType === value}
                      onChange={() => setValues({ ...values, activityType: value, type: value === 'KICK_OFF' ? 'AUDIO' : values.type })}
                      costumeClasses="p-mr-3"
                      key={label}
                    />
                  ))}
                </div>
              </div>
              {values.activityType !== 'KICK_OFF' && (
              <div className="p-d-flex p-flex-column">
                <Label label="Content Type" costumeStyles="p-mb-2" />
                <div className="p-d-flex">
                  {contentType.map(({ label, value }) => (
                    <RadioButtonComponent
                      label={label}
                      value={value}
                      checked={values.type === value}
                      onChange={() => setValues({ ...values, type: value })}
                      costumeClasses="p-mr-3"
                      key={label}
                    />
                  ))}
                </div>
              </div>
              )}
            </div>
          </div>
          <FileUploadForm
            type={values.type}
            uploadedFile={uploadedFile}
            handleUpload={(val: any) => setUploadedFIle(val)}
            values={values}
            setValues={setValues}
          />
        </div>
      </div>
    </Container>
  );
};

export default AppContentDetail;

const useStyles = createUseStyles({
  gridWrapper: {
    display: 'grid',
    gridRowGap: '3rem',
  },
  gridInputsWrapper: {
    display: 'grid',
    gridRowGap: '1.5rem',
  },
});
