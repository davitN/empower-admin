import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import { ContentItem, GeneralContentLibraryType } from '../types/generalContentLibrary';
import Container from '../components/shared/Container';
import Label from '../components/shared/Inputs/Label';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';
import TextInput from '../components/shared/Inputs/TextInput';
import Title from '../components/shared/Title';
import UploadButton from '../components/shared/UploadButton';
import { handleFileUpload, handleImgUpload } from '../helpers/utils';
import { Image } from '../types/main';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import Textarea from '../components/shared/Inputs/Textarea';
import { getContentItemDetails, removeContentItem, saveContentItemDetails } from '../store/ducks/generalContentLibraryDuck';
import { RootState } from '../store/configureStore';
import ConfirmDialog from '../components/shared/ConfirmDialog';

const GeneralContentLibraryDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const isNewItem = params?.mode === 'new';
  const isEthosContent = searchParams.get('type') === 'ETHOS';
  const [selectedType, setSelectedType] = useState<GeneralContentLibraryType>((searchParams.get('type') as GeneralContentLibraryType) || 'POWER_UP');
  const { itemDetails } : { itemDetails: ContentItem } = useSelector((state: RootState) => state.generalContentLibraryReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<ValuesTypes>({
    contentType: 'AUDIO',
    title: '',
    description: '',
  });
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [uploadedImg, setUploadedImg] = useState<UploadedImgTypes | null>(null);
  const [visible, setVisible] = useState(false);

  const isInputsValid = () => {
    if (!isNewItem) {
      return values.title.length >= 3 && values.description.length >= 3;
    }
    return values.title.length >= 3 && values.description.length >= 3 && uploadedFile && uploadedImg;
  };
  const handleSave = () => {
    setLoading(true);
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
      error: () => setLoading(false),
      success: () => {
        setLoading(false);
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
      <ConfirmDialog
        visible={visible}
        handleClose={() => setVisible(false)}
        title="Remove content"
        description="Do you really want to remove content?"
        handleSuccess={() => {
          setLoading(true);
          id && dispatch(removeContentItem(
            id,
            {
              success: () => { setLoading(false); navigate('/general-content-library'); },
              error: () => setLoading(false),
            },
          ));
        }}
        loading={loading}
      />
      <div className={classes.root}>
        <div className={classes.gridWrapper}>
          {!isNewItem && !itemDetails ? (
            <div>
              {new Array(6).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" className="p-my-3" />)}
            </div>
          ) : (
            <>
              {!isEthosContent && (
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
              )}
              <div className={classes.gridInputsWrapper}>
                <Title title={values.contentType === 'VIDEO' ? 'Video Details' : 'Audio Details'} fontSize="text-2xl" />
                <TextInput value={values.title} handleChange={(title) => setValues({ ...values, title })} label={isEthosContent ? 'Ethos' : 'Title'} required placeholder="Enter title..." />
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
                <Textarea label={isEthosContent ? 'Ethos Definition' : 'Description'} required value={values.description} handleChange={(description) => setValues({ ...values, description })} />
              </div>
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            isNewItem={isNewItem}
            save={{
              label: isNewItem ? 'Add content' : 'Save Content',
              loading,
              handler: handleSave,
              disabled: !isInputsValid() || (!isNewItem && !itemDetails),
            }}
            remove={{
              handler: () => setVisible(true),
              label: 'Remove content',
              disabled: false,
              hidden: isNewItem,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default GeneralContentLibraryDetails;

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
