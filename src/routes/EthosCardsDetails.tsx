import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import Label from '../components/shared/Inputs/Label';
import TextInput from '../components/shared/Inputs/TextInput';
import UploadButton from '../components/shared/UploadButton';
import { getEthosCardDetails, saveEthosCardDetails } from '../store/ducks/ethosCardsDuck';
import { Audio, Image } from '../types/main';
import Textarea from '../components/shared/Inputs/Textarea';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import { handleImgUpload, setFileDuration } from '../helpers/utils';
import { RootState } from '../store/configureStore';
import { EthosCard } from '../types/ethosCards';

const EthosCardsDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { ethosCardDetails } : { ethosCardDetails: EthosCard } = useSelector((state: RootState) => state.ethosCardsReducer);
  const { mode, id: ethosCardId } = useParams();
  const [values, setValues] = useState<ValuesTypes>(InitialState);
  const [uploadedAudio, setUploadedAudio] = useState<EventTarget>();
  const [saving, setSaving] = useState(false);
  const [uploadedImg, setUploadedImg] = useState<UploadedImgTypes | null>();
  const isNewItem = mode === 'new';
  const isInputsValid = values.title.length > 2 && values.description.length > 3;

  const handleSave = () => {
    setSaving(true);
    dispatch(saveEthosCardDetails({
      data: values,
      audio: uploadedAudio,
      image: uploadedImg?.newImg,
      thumbnail: uploadedImg?.thumbnail,
      ethosCardId,
    }, { success: () => setSaving(false), error: () => setSaving(false) }));
  };

  // get data if ethos card is editing
  useEffect(() => {
    if (!isNewItem && ethosCardId) {
      dispatch(getEthosCardDetails(ethosCardId));
    }
  }, [isNewItem, ethosCardId]);

  useEffect(() => {
    if (!isNewItem && ethosCardDetails) {
      setValues({
        ...values,
        title: ethosCardDetails.title,
        description: ethosCardDetails.description,
      });
    }
  }, [isNewItem, ethosCardDetails]);
  return (
    <Container sectionTitle={isNewItem ? 'ADD ETHOS CARD' : 'EDIT ETHOS CARD'}>
      <div className={classes.wrapper}>
        <div className={classes.inputs}>
          <TextInput label="Ethos" required value={values.title} handleChange={(title) => setValues({ ...values, title })} />
          <div className="p-d-flex p-flex-column">
            <Label label="Audio file upload" costumeStyles="p-mb-3" />
            <UploadButton
              desc=".mp3 files only"
              fileType=".mp3"
              uploadedFile={uploadedAudio}
              handleUpload={(val: any) => {
                setUploadedAudio(val);
                setFileDuration(val, setValues, values);
              }}
            />
          </div>
          <UploadButton
            name="image"
            desc="Update an image that will be used as a thumbnail for the audio .jpg files only"
            fileType="image/png, image/gif, image/jpeg"
            uploadedFile={uploadedImg}
            handleUpload={(val: any) => {
              handleImgUpload(val, setUploadedImg, setValues, values);
            }}
          />
          <Textarea label="Description" required value={values.description} handleChange={(description) => setValues({ ...values, description })} />
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            isNewItem={isNewItem}
            save={{
              label: isNewItem ? 'Add ethos card' : 'Save',
              loading: saving,
              handler: handleSave,
              disabled: !isInputsValid,
            }}
            remove={{
              handler: () => console.log('remove item'),
              label: 'Remove ethos card',
              disabled: false,
              hidden: !isNewItem && !ethosCardDetails,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default EthosCardsDetails;

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

const InitialState = {
  title: '',
  description: '',
  image: null,
  audio: null,
};

interface ValuesTypes {
  title: string,
  description: string,
  image: null | Image,
  audio: null | Audio,
  duration?: number,
  thumbnail?: any
}

interface UploadedImgTypes {
  newImg: any,
  imgPrev: string | null,
  thumbnail?: any
}
