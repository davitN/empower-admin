import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import { ContentItem, GeneralContentLibraryType } from '../../types/generalContentLibrary';
import Container from '../shared/Container';
import Label from '../shared/Inputs/Label';
import RadioButtonComponent from '../shared/Inputs/RadioButton';
import TextInput from '../shared/Inputs/TextInput';
import Title from '../shared/Title';
import UploadButton from '../shared/UploadButton';
import { handleFileUpload, handleImgUpload } from '../../helpers/utils';
import { Image } from '../../types/main';
import FormsSharedComponent from '../shared/FormsSharedComponent';
import Textarea from '../shared/Inputs/Textarea';
import { getContentItemDetails, saveContentItemDetails } from '../../store/ducks/generalContentLibraryDuck';
import { RootState } from '../../store/configureStore';

const GeneralContentItemDetails = ({ selectedType, isNewItem, setSelectedType }: PropsTypes) => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const { itemDetails } : { itemDetails: ContentItem } = useSelector((state: RootState) => state.generalContentLibraryReducer);
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState<ValuesTypes>({
    contentType: 'VIDEO',
    title: '',
    description: '',
  });
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [uploadedImg, setUploadedImg] = useState<UploadedImgTypes | null>(null);

  const isInputsValid = () => {
    if (!isNewItem) {
      return values.title.length >= 3 && values.description.length >= 3;
    }
    return values.title.length >= 3 && values.description.length >= 3 && uploadedFile && uploadedImg;
  };
  const handleSave = () => {
    setSaving(true);
    const filesData = {
      ...(uploadedImg && { imageWidth: uploadedImg.imgDimension.width, imageHeight: uploadedImg.imgDimension.height }),
      ...(uploadedFile && { contentDuration: uploadedFile.duration, contentWidth: 1, contentHeight: 1 }),
      ...(uploadedFile && values.contentType === 'VIDEO' && { contentWidth: uploadedFile.width, contentHeight: uploadedFile.height }),
    };
    dispatch(saveContentItemDetails({
      data: {
        ...values,
        type: selectedType,
        ...filesData,
      },
      contentId: id,
      content: uploadedFile?.file,
      image: uploadedImg?.newImg,
      imageThumbnail: uploadedImg?.thumbnail,
    }, {
      error: () => setSaving(false),
      success: () => {
        setSaving(false);
        navigate('/general-content-library');
      },
    }));
  };

  useEffect(() => {
    if (!isNewItem && id) {
      dispatch(getContentItemDetails(id));
    }
  }, [isNewItem, id]);

  useEffect(() => {
    if (!isNewItem && itemDetails) {
      setValues({
        contentType: itemDetails.contentType,
        title: itemDetails.title,
        description: itemDetails.description,
        ...(itemDetails.image && { image: itemDetails.image }),
        ...(itemDetails.content && { content: itemDetails.content }),
      });
      setSelectedType(itemDetails.type);
    }
  }, [isNewItem, itemDetails]);

  return (
    <Container sectionTitle={`${isNewItem ? 'ADD' : 'EDIT'} ${selectedType.replace('_', ' ')} CONTENT`}>
      <div className={classes.root}>
        <div className={classes.gridWrapper}>
          {!isNewItem && !itemDetails ? (
            <div>
              {new Array(6).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" className="p-my-3" />)}
            </div>
          ) : (
            <>
              <div className="p-d-flex p-flex-column">
                <Label label="Content Type" costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  <RadioButtonComponent
                    label="Video"
                    value="VIDEO"
                    checked={values.contentType === 'VIDEO'}
                    onChange={() => {
                      setUploadedImg(null);
                      setUploadedFile(null);
                      setValues({ ...values, contentType: 'VIDEO' });
                    }}
                    costumeClasses="p-mr-3"
                    disabled={!isNewItem}
                  />
                  <RadioButtonComponent
                    label="Audio"
                    value="AUDIO"
                    checked={values.contentType === 'AUDIO'}
                    onChange={() => {
                      setUploadedImg(null);
                      setUploadedFile(null);
                      setValues({ ...values, contentType: 'AUDIO' });
                    }}
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
                    preview={values?.content?.URL || uploadedFile?.preview}
                    handleUpload={async (val: any) => {
                      handleFileUpload(val, setUploadedFile);
                    }}
                  />
                </div>
                <div className="p-d-flex p-flex-column">
                  <Label label="Thumbnail image file upload" required costumeStyles="p-mb-2" />
                  <UploadButton
                    name="image"
                    desc={`Update an image that will be used as a thumbnail for the ${values.contentType === 'VIDEO' ? 'video' : 'audio'} .jpg files only`}
                    fileType="image/jpg"
                    uploadedFile={uploadedImg}
                    preview={values?.image?.URL || uploadedImg?.imgPrev || null}
                    handleUpload={(val: any) => {
                      handleImgUpload(val, setUploadedImg);
                    }}
                  />
                </div>
                <Textarea label="Description" required value={values.description} handleChange={(description) => setValues({ ...values, description })} />
              </div>
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            isNewItem={isNewItem}
            save={{
              label: isNewItem ? 'Add content' : 'Save Content',
              loading: saving,
              handler: handleSave,
              disabled: !isInputsValid() || (!isNewItem && !itemDetails),
            }}
            remove={{
              handler: () => console.log('remove item'),
              label: 'Remove content',
              disabled: false,
              hidden: !isNewItem && !itemDetails,
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
  isNewItem: boolean,
  setSelectedType: Function
}

interface UploadedImgTypes {
  newImg: any,
  imgPrev: string | null,
  thumbnail?: any,
  imgDimension: any
}

interface ValuesTypes {
  contentType: 'AUDIO' | 'VIDEO',
  title: string,
  description: string,
  image?: Image,
  content?: {
    URL: string,
  }
}
