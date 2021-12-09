import { createUseStyles } from 'react-jss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import Label from '../components/shared/Inputs/Label';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';
import { Types, ContentType } from '../types/appContent';
import FileUploadForm from '../components/shared/FileUploadForm';
import COLORS from '../services/colors.service';
import Button from '../components/shared/Inputs/Button';
import { addAppContentItem } from '../store/ducks/appContentDuck';

interface ValueTypes {
  type: Types,
  contentType: ContentType,
  title: string,
  subTitle: string,
  description: string,
  companyId?: string | null
}

const type: { label: string, value: Types }[] = [
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
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const classes = useStyles();
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState<ValueTypes>({
    type: 'KICK_OFF',
    contentType: 'AUDIO',
    title: '',
    subTitle: '',
    description: '',
    companyId: '',
  });
  const [uploadedFile, setUploadedFIle] = useState<any>(null);

  const handleSave = () => {
    setSaving(true);
    dispatch(addAppContentItem(
      {
        data: values,
        file: uploadedFile,
      },
      { success: () => setSaving(false), error: () => setSaving(false) },
    ));
  };

  const validateInputs = () => !values.title || !values.subTitle || !values.description || !uploadedFile;

  useEffect(() => {
    if (searchParams.get('companyId') && searchParams.get('companyName')) {
      setValues({ ...values, companyId: searchParams.get('companyId') });
    }
  }, [searchParams]);

  return (
    <Container sectionTitle="EDIT CONTENT">
      <div className={classes.wrapper}>
        <div className={classes.gridWrapper}>
          <div>
            <Title title="Monthly Team Activity Details" fontSize="text-2xl" costumeStyles="p-mb-5" />
            <div className={classes.gridInputsWrapper}>
              <div className="p-d-flex p-flex-column">
                <Label label="Monthly Team Activity" costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  {type.map(({ label, value }) => (
                    <RadioButtonComponent
                      label={label}
                      value={value}
                      checked={values.type === value}
                      onChange={() => setValues({ ...values, type: value, contentType: value === 'KICK_OFF' ? 'AUDIO' : values.contentType })}
                      costumeClasses="p-mr-3"
                      key={label}
                    />
                  ))}
                </div>
              </div>
              {values.type !== 'KICK_OFF' && (
              <div className="p-d-flex p-flex-column">
                <Label label="Content Type" costumeStyles="p-mb-2" />
                <div className="p-d-flex">
                  {contentType.map(({ label, value }) => (
                    <RadioButtonComponent
                      label={label}
                      value={value}
                      checked={values.contentType === value}
                      onChange={() => setValues({ ...values, contentType: value })}
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
            type={values.contentType}
            uploadedFile={uploadedFile}
            handleUpload={(val: any) => setUploadedFIle(val)}
            values={values}
            setValues={setValues}
          />
        </div>
        <div className={classes.justifyEnd}>
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            handleClick={handleSave}
            disabled={validateInputs()}
            loading={saving}
          >
            Save content
          </Button>
          {/* <Button
            bgColor={COLORS.red}
            textColor={COLORS.white}
            handleClick={handleSave}
          >
            Delete content
          </Button> */}
        </div>
      </div>
    </Container>
  );
};

export default AppContentDetail;

const useStyles = createUseStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
  },
  gridWrapper: {
    display: 'grid',
    gridRowGap: '3rem',
  },
  gridInputsWrapper: {
    display: 'grid',
    gridRowGap: '1.5rem',
  },
  justifyEnd: {
    justifySelf: 'end',
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gap: '1rem',
    justifyItems: 'end',
  },
});
