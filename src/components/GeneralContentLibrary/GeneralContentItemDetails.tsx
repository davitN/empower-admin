import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { GeneralContentLibraryType } from '../../types/generalContentLibrary';
import Container from '../shared/Container';
import Label from '../shared/Inputs/Label';
import RadioButtonComponent from '../shared/Inputs/RadioButton';
import TextInput from '../shared/Inputs/TextInput';
import Title from '../shared/Title';
import UploadButton from '../shared/UploadButton';
import { setFileDuration, handleImgUpload } from '../../helpers/utils';
import { Image } from '../../types/main';
import FormsSharedComponent from '../shared/FormsSharedComponent';
import Textarea from '../shared/Inputs/Textarea';

const GeneralContentItemDetails = ({ selectedType, isNewItem }: PropsTypes) => {
  const classes = useStyles();
  const [values, setValues] = useState<ValuesTypes>({
    contentType: 'VIDEO',
    title: '',
    description: '',
  });
  const [uploadedFile, setUploadedFile] = useState<EventTarget | null>(null);
  const [uploadedImg, setUploadedImg] = useState<UploadedImgTypes | null>(null);

  return (
    <Container sectionTitle={`${isNewItem ? 'ADD' : 'EDIT'} ${selectedType.replace('_', ' ')} CONTENT`}>
      <div className={classes.root}>
        <div className={classes.gridWrapper}>
          <div className="p-d-flex p-flex-column">
            <Label label="Content Type" costumeStyles="p-mb-3" />
            <div className="p-d-flex">
              <RadioButtonComponent
                label="Video"
                value="VIDEO"
                checked={values.contentType === 'VIDEO'}
                onChange={() => setValues({ ...values, contentType: 'VIDEO' })}
                costumeClasses="p-mr-3"
                disabled={!isNewItem}
              />
              <RadioButtonComponent
                label="Audio"
                value="AUDIO"
                checked={values.contentType === 'AUDIO'}
                onChange={() => setValues({ ...values, contentType: 'AUDIO' })}
                costumeClasses="p-mr-3"
                disabled={!isNewItem}
              />
            </div>
          </div>
          <div className={classes.gridInputsWrapper}>
            <Title title={values.contentType === 'VIDEO' ? 'Video Details' : 'Audio Details'} fontSize="text-2xl" />
            <TextInput value={values.title} handleChange={(title) => setValues({ ...values, title })} label="Title" required placeholder="Enter title..." />
            <div className="p-d-flex p-flex-column">
              <Label label={`${values.contentType === 'VIDEO' ? 'Video' : 'Audio'} file upload`} required costumeStyles="p-mb-2" />
              <UploadButton
                desc={`${values.contentType === 'VIDEO' ? '.mp4' : '.mp3'} files only `}
                fileType={values.contentType === 'VIDEO' ? '.mp4' : '.mp3'}
                uploadedFile={uploadedFile}
                  // preview={(!isNewItem && !uploadedAudio) ? values.audio?.URL : null}
                handleUpload={(val: any) => {
                  setUploadedFile(val);
                  setFileDuration(val, setValues, values);
                }}
              />
            </div>
            <div className="p-d-flex p-flex-column">
              <Label label="Thumbnail image file upload" required costumeStyles="p-mb-2" />
              <UploadButton
                name="image"
                desc={`Update an image that will be used as a thumbnail for the ${values.contentType === 'VIDEO' ? 'video' : 'audio'} .jpg files only`}
                fileType="image/jpg, image/jpeg"
                uploadedFile={uploadedImg}
                preview={values?.image?.URL || uploadedImg?.imgPrev || null}
                handleUpload={(val: any) => {
                  handleImgUpload(val, setUploadedImg, setValues, values);
                }}
              />
            </div>
            <Textarea label="Description" required value={values.description} handleChange={(description) => setValues({ ...values, description })} />
          </div>
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            isNewItem={isNewItem}
            save={{
              label: isNewItem ? 'Add content' : 'Save Content',
              // loading: saving,
              // handler: handleSave,
              // disabled: !isInputsValid,
            }}
            remove={{
              handler: () => console.log('remove item'),
              label: 'Remove content',
              disabled: false,
              // hidden: !isNewItem && !ethosCardDetails,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default GeneralContentItemDetails;

const useStyles = createUseStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
    width: '100%',
  },
  gridWrapper: {
    display: 'grid',
    gridRowGap: '3rem',
  },
  justifyEnd: {
    justifySelf: 'end',
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gap: '1rem',
    justifyItems: 'end',
  },
  gridInputsWrapper: {
    display: 'grid',
    gridRowGap: '1.5rem',
  },
});

interface PropsTypes {
  selectedType: GeneralContentLibraryType,
  isNewItem: boolean
}

interface UploadedImgTypes {
  newImg: any,
  imgPrev: string | null,
  thumbnail?: any
}

interface ValuesTypes {
  contentType: 'AUDIO' | 'VIDEO',
  title: string,
  description: string,
  image?: Image
}
