import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../components/shared/Container';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import Label from '../components/shared/Inputs/Label';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';
import Title from '../components/shared/Title';
import UploadButton from '../components/shared/UploadButton';
import { handleFileUpload } from '../helpers/utils';
import { saveForYou } from '../store/ducks/forYouDucks';
import { ForYouTypes } from '../types/forYou';

const ForYouDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState<{ type: ForYouTypes }>({
    type: 'KICK_OFF',
  });
  const [uploadedFile, setUploadedFIle] = useState<any>(null);

  const handleSave = () => {
    if (uploadedFile) {
      setSaving(true);
      dispatch(saveForYou({
        data: {
          type: values.type,
          width: uploadedFile.width,
          height: uploadedFile.height,
          duration: uploadedFile.duration,
        },
        file: uploadedFile.file,
      }, {
        success: () => {
          setSaving(false);
          navigate('/app-library');
        },
        error: () => setSaving(false),
      }));
    }
  };

  return (
    <Container sectionTitle="ADD NEW ITEM">
      <div className={classes.wrapper}>
        <div>
          <div className="p-d-flex p-flex-column">
            <Label label="Select Type" costumeStyles="p-mb-3" />
            <div className="p-d-flex p-flex-row ">
              {forYouTypes.map((el) => (
                <RadioButtonComponent
                  label={el.label}
                  value={el.value}
                  checked={values.type === el.value}
                  onChange={() => {
                    setValues({ ...values, type: el.value });
                  }}
                  costumeClasses="p-mr-3"
                />
              ))}
            </div>
          </div>
          <div className="p-mt-5">
            <Title title="Upload video/audio file" costumeStyles="p-mr-4 p-mb-2" fontSize="text-xl" />
            <UploadButton
              uploadedFile={uploadedFile?.file}
              handleUpload={(val: any) => handleFileUpload(val, setUploadedFIle)}
              fileType=".mp3, .mp4"
            />
          </div>
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            save={{
              handler: handleSave,
              disabled: (!uploadedFile) || saving,
              loading: saving,
            }}
            isNewItem
          />
        </div>
      </div>
    </Container>
  );
};

export default ForYouDetails;

const useStyles = createUseStyles({
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

const forYouTypes: { label: string, value: ForYouTypes }[] = [
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
    label: 'Power down',
    value: 'POWER_DOWN',
  },
  {
    label: 'Wellness',
    value: 'WELNESS',
  },
  {
    label: 'Accountability',
    value: 'ACCOUNTABILITY',
  },
];
