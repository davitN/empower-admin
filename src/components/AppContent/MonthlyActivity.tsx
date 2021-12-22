import { createUseStyles } from 'react-jss';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import Title from '../shared/Title';
import Label from '../shared/Inputs/Label';
import RadioButtonComponent from '../shared/Inputs/RadioButton';
import UploadButton from '../shared/UploadButton';
import TextInput from '../shared/Inputs/TextInput';
import Textarea from '../shared/Inputs/Textarea';
import { getAppContentItemInfo } from '../../store/ducks/appContentDuck';
import { RootState } from '../../store/configureStore';
import { GetAppContentItemInfo } from '../../types/appContent';

interface PropTypes {
  values: any,
  setValues: Function,
  types: { value: string, label: string }[],
  uploadedFile: EventTarget,
  setUploadedFIle: Function,
  contentType: { value: string, label: string }[],
  uploadedFileProgress: number | null
}

const MonthlyActivity = ({
  values, setValues, types, uploadedFile, setUploadedFIle, contentType, uploadedFileProgress,
}: PropTypes) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id: companyId, mode } = useParams();
  const [searchParams] = useSearchParams();
  const fieldName = searchParams.get('fieldName');
  const type = fieldName && fieldName.split(/(?=[A-Z])/).map((el) => el.toUpperCase()).join('_');
  const isEditing = mode === 'edit' && companyId;
  const { appContentItemInfo } : { appContentItemInfo :GetAppContentItemInfo } = useSelector((state: RootState) => state.appContentReducer);

  useEffect(() => {
    if (!isEditing) {
      setValues({ ...values, companyId });
    }
    if (isEditing) {
      setValues({ ...values, type });
    }
  }, [mode]);

  useEffect(() => {
    if (isEditing && companyId && fieldName) {
      dispatch(getAppContentItemInfo({
        companyId,
        fieldName,
      }));
    }
  }, [companyId, mode, searchParams]);

  useEffect(() => {
    if (appContentItemInfo) {
      setValues({
        ...values,
        type,
        contentType: appContentItemInfo.type,
        title: appContentItemInfo.title,
        subTitle: appContentItemInfo.subTitle,
        description: appContentItemInfo?.description || '',
        companyId,
      });
    }
  }, [appContentItemInfo]);

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
                  {types.map(({ label, value }) => (
                    <RadioButtonComponent
                      label={label}
                      value={value}
                      checked={values.type === value}
                      onChange={() => setValues({ ...values, type: value, contentType: value === 'KICK_OFF' ? 'AUDIO' : values.contentType })}
                      costumeClasses="p-mr-3"
                      key={label}
                      disabled={!!isEditing}
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
                      disabled={!!isEditing}
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
                  handleUpload={(val: any) => setUploadedFIle(val)}
                  uploadedFileProgress={uploadedFileProgress}
                />
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
};

export default MonthlyActivity;

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
