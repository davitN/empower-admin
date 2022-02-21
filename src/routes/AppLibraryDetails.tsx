import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import TextInput from '../components/shared/Inputs/TextInput';
import Title from '../components/shared/Title';
import UploadButton from '../components/shared/UploadButton';
import { handleFileUpload } from '../helpers/utils';
import { saveAppLibrary } from '../store/ducks/appLibraryDucks';
import { UploadedFile } from '../types/main';

const AppLibraryDetails = () => {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id, mode } = useParams();
  const isNewItem = mode === 'new';
  const classes = useStyles();
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFIle] = useState<UploadedFile | null>(null);
  const [values, setValues] = useState<{ title: string }>({
    title: '',
  });

  const handleSave = () => {
    if (uploadedFile) {
      setSaving(true);
      dispatch(saveAppLibrary({
        data: {
          title: values.title,
          width: uploadedFile.width,
          height: uploadedFile.height,
          duration: uploadedFile.duration,
        },
        file: uploadedFile.file,
        ...(!isNewItem && { id }),
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
    <Container sectionTitle={`${isNewItem ? 'Add' : 'Edit'} App Library`}>
      <div className={classes.wrapper}>
        <div className={classes.inputs}>
          <TextInput placeholder="Title" value={values.title} handleChange={(title) => setValues({ ...values, title })} />
          <div className="">
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
              disabled: (!values.title || !uploadedFile) || saving,
              loading: saving,
            }}
            isNewItem={isNewItem}
          />
        </div>
      </div>
    </Container>
  );
};

export default AppLibraryDetails;

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
