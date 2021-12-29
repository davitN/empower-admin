import { createUseStyles } from 'react-jss';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import Title from '../shared/Title';
import Label from '../shared/Inputs/Label';
import RadioButtonComponent from '../shared/Inputs/RadioButton';
import UploadButton from '../shared/UploadButton';
import TextInput from '../shared/Inputs/TextInput';
import Textarea from '../shared/Inputs/Textarea';
import { getAppContentItemInfo, resetAppContentItemInfo, saveAppContentItem } from '../../store/ducks/appContentDuck';
import { RootState } from '../../store/configureStore';
import { GetAppContentItemInfo, MonthlyActivityContentType, MonthlyActivityTypes } from '../../types/appContent';
import FormSharedComponent from '../shared/FormsSharedComponent';

const MonthlyActivity = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const { id: companyId, mode } = useParams();
  const isEditing = mode === 'edit';
  const [saving, setSaving] = useState(false);
  const [uploadedFile, setUploadedFIle] = useState<any>(null);
  const [uploadedFileProgress, setUploadedFIleProgress] = useState<null | number>(null);
  const [values, setValues] = useState<ValuesTypes>(ValuesInitialState);
  const fieldName: MonthlyActivityTypes = searchParams.get('fieldName') as MonthlyActivityTypes || 'kickOff';
  const { appContentItemInfo } : { appContentItemInfo :GetAppContentItemInfo } = useSelector((state: RootState) => state.appContentReducer);

  const validateInputs = () => (!values.title || !values.subTitle || !values.description || (!isEditing && !uploadedFile));

  const resetUploadedFilesData = () => {
    setUploadedFIle(null);
    setUploadedFIleProgress(null);
  };

  const handleSave = () => {
    setSaving(true);
    dispatch(saveAppContentItem(
      {
        data: values,
        file: uploadedFile,
        ...(isEditing && { companyId }),
      },
      {
        success: () => {
          setSaving(false);
          resetUploadedFilesData();
        },
        error: () => {
          setSaving(false);
          setUploadedFIleProgress(null);
        },
      },
      (val: number) => setUploadedFIleProgress(val),
    ));
  };

  function setFileDuration(file: any) {
    const video = document.createElement(file.type.includes('video') ? 'video' : 'audio');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const { duration } = video;
      setValues({ ...values, duration: Math.floor(duration) });
    };
    video.src = URL.createObjectURL(file);
  }
  // if editing set companyId and type else set type
  useEffect(() => {
    if (!isEditing) {
      setValues({ ...values, companyId, type: fieldName });
    }
    if (isEditing) {
      setValues({ ...values, type: fieldName });
    }
  }, [mode, fieldName]);

  // if editing get item data
  useEffect(() => {
    if (isEditing && companyId && fieldName) {
      dispatch(getAppContentItemInfo({
        companyId,
        fieldName,
      }));
    }
  }, [companyId, mode, searchParams]);

  // if item data fetched, set values
  useEffect(() => {
    if (appContentItemInfo) {
      setValues({
        ...values,
        type: fieldName,
        contentType: appContentItemInfo.type,
        title: appContentItemInfo.title,
        subTitle: appContentItemInfo.subTitle,
        description: appContentItemInfo?.description || '',
        companyId,
      });
    }
  }, [appContentItemInfo]);

  // reset values on unmount
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    return () => dispatch(resetAppContentItemInfo());
  }, []);

  return (
    <div className={classes.gridWrapper}>
      <div>
        <Title title="Monthly Team Activity Details" fontSize="text-2xl" costumeStyles="p-mb-5" />
        <div className={classes.gridInputsWrapper}>
          {isEditing && !appContentItemInfo ? new Array(10).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" />) : (
            <>
              <div className="p-d-flex p-flex-column">
                <Label label="Monthly Team Activity" costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  {activityTypes.map(({ label, value }) => (
                    <RadioButtonComponent
                      label={label}
                      value={value}
                      checked={values.type === value}
                      onChange={() => {
                        setValues({ ...values, type: value, contentType: value === 'kickOff' ? 'AUDIO' : values.contentType });
                      }}
                      costumeClasses="p-mr-3"
                      key={label}
                      disabled={!!isEditing}
                    />
                  ))}
                </div>
              </div>
              {values.type !== 'kickOff' && (
              <div className="p-d-flex p-flex-column">
                <Label label="Content Type" costumeStyles="p-mb-2" />
                <div className="p-d-flex">
                  {contentTypes.map(({ label, value }) => (
                    <RadioButtonComponent
                      label={label}
                      value={value}
                      checked={values.contentType === value}
                      onChange={() => {
                        setValues({ ...values, contentType: value });
                      }}
                      costumeClasses="p-mr-3"
                      key={label}
                    />
                  ))}
                </div>
              </div>
              )}
              <div className={classes.gridInputsWrapper}>
                <Title title={`${values.contentType === 'VIDEO' ? 'Video' : 'Audio'} Details`} fontSize="text-2xl" costumeStyles="p-mb-0" />
                <TextInput label="Title" required value={values.title} handleChange={(title) => setValues({ ...values, title })} />
                <TextInput label="Subtitle" required value={values.subTitle} handleChange={(subTitle) => setValues({ ...values, subTitle })} />
                <Textarea label="Description" value={values.description} required handleChange={(description) => setValues({ ...values, description })} />
                <UploadButton
                  fileType={values.contentType === 'VIDEO' ? '.mp4' : '.mp3'}
                  uploadedFile={uploadedFile}
                  handleUpload={(val: any) => {
                    setUploadedFIle(val);
                    setFileDuration(val);
                  }}
                  uploadedFileProgress={uploadedFileProgress}
                />
              </div>
            </>
          )}
        </div>

      </div>
      <div className={classes.justifyEnd}>
        <FormSharedComponent
          save={{
            handler: handleSave,
            label: isEditing ? 'Save Content' : 'Add Content',
            disabled: validateInputs(),
            loading: saving,
          }}
          remove={{
            handler: undefined,
            label: 'Delete Content',
            hidden: !isEditing,
            disabled: saving,
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyActivity;

const useStyles = createUseStyles({
  gridWrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
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

const activityTypes: { label: string, value: MonthlyActivityTypes }[] = [
  {
    label: 'KickOff',
    value: 'kickOff',
  },
  {
    label: 'Ethos',
    value: 'ethos',
  },
  {
    label: 'Power up',
    value: 'powerUp',
  },
  {
    label: 'Gratitude',
    value: 'gratitude',
  },
  {
    label: 'Power down',
    value: 'powerDown',
  },
];

const contentTypes : { label: string, value: MonthlyActivityContentType }[] = [
  {
    label: 'Audio',
    value: 'AUDIO',
  },
  {
    label: 'Video',
    value: 'VIDEO',
  },
];

const ValuesInitialState: ValuesTypes = {
  type: 'kickOff',
  contentType: 'AUDIO',
  title: '',
  subTitle: '',
  description: '',
  companyId: '',
  duration: 0,
};

interface ValuesTypes {
  type: MonthlyActivityTypes,
  contentType: MonthlyActivityContentType,
  title: string,
  subTitle: string,
  description: string,
  companyId?: string | null,
  duration: number
}
