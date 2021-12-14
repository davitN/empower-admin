import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Title from '../shared/Title';
import Label from '../shared/Inputs/Label';
import RadioButtonComponent from '../shared/Inputs/RadioButton';
import UploadButton from '../shared/UploadButton';
import Textarea from '../shared/Inputs/Textarea';
import TextInput from '../shared/Inputs/TextInput';
import Select from '../shared/Inputs/Select';
import { RootState } from '../../store/configureStore';
import { AppContentCategory, GetCommunityDataItem } from '../../types/appContent';
import { getCommunityDataItem, resetCommunityDataItem } from '../../store/ducks/appContentDuck';

interface PropTypes {
  values: any,
  setValues: Function,
  contentType: { value: string, label: string }[],
  setUploadedFIle: Function,
  uploadedFile: EventTarget
}

interface ReducerTypes {
  categories: AppContentCategory[],
  communityDataItem: GetCommunityDataItem
}

const CommunityArticle = ({
  values, setValues, contentType, uploadedFile, setUploadedFIle,
}: PropTypes) => {
  const dispatch = useDispatch();
  const { id, mode } = useParams();
  const classes = useStyles();
  const isEditing = mode === 'edit' && id;
  const { categories, communityDataItem } : ReducerTypes = useSelector((state: RootState) => state.appContentReducer);
  const modifiedCategories = categories && categories.map(({ _id, name }) => ({ _id, name }));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    if (isEditing) {
      dispatch(getCommunityDataItem(id));
    }
    return () => dispatch(resetCommunityDataItem());
  }, [id, mode]);

  useEffect(() => {
    if (communityDataItem) {
      if (communityDataItem.type === 'WRITTEN') {
        setValues({
          ...values,
          type: communityDataItem.type,
          isFeatured: communityDataItem.isFeatured,
          ...communityDataItem.type === 'WRITTEN' ? {
            written: {
              ...values.written,
              title: communityDataItem.title,
              subTitle: communityDataItem.subTitle,
              category: communityDataItem.category,
              text: communityDataItem.text,
            },
          } : {
            ...values.external,
            title: communityDataItem.title,
            category: communityDataItem.category,
            description: communityDataItem.description,
            URL: communityDataItem.description,
          },
        });
      }
    }
  }, [id, communityDataItem]);
  return (
    <div className={classes.gridWrapper}>
      {isEditing && !communityDataItem ? (
        <div className={classes.gridInputsWrapper}>
          {new Array(10).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" />)}
        </div>
      ) : (
        <>
          <div>
            <Title title="Community Article Details" fontSize="text-2xl" costumeStyles="p-mb-4" />
            <div className={classes.gridInputsWrapper}>
              <div className="p-d-flex p-flex-column">
                <Label label="Content Type" costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  {contentType.map(({ label, value }) => (
                    <RadioButtonComponent
                      label={label}
                      value={value}
                      checked={values.type === value}
                      onChange={() => setValues({ ...values, type: value })}
                      costumeClasses="p-mr-3"
                      key={label}
                      disabled={Boolean(isEditing)}
                    />
                  ))}
                </div>
              </div>
              <div className="p-d-flex p-flex-column">
                <Label label="Is Featured?" costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  <RadioButtonComponent
                    label="YES"
                    value="yes"
                    checked={values.isFeatured}
                    onChange={() => setValues({ ...values, isFeatured: true })}
                    costumeClasses="p-mr-3"
                  />
                  <RadioButtonComponent
                    label="NO"
                    value="no"
                    checked={!values.isFeatured}
                    onChange={() => setValues({ ...values, isFeatured: false })}
                    costumeClasses="p-mr-3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.gridInputsWrapper}>
            {values.type === 'WRITTEN' ? (
              <>
                <Title title="Written Content Details" fontSize="text-2xl" costumeStyles="p-mb-0" />
                <TextInput
                  label="Title"
                  required
                  placeholder="How to empower yourself to improve your well-being."
                  value={values.written.title}
                  handleChange={(title) => setValues({ ...values, written: { ...values.written, title } })}
                />
                <TextInput
                  label="Subtitle"
                  required
                  placeholder="How to empower yourself to improve your well-being."
                  value={values.written.subTitle}
                  handleChange={(subTitle) => setValues({ ...values, written: { ...values.written, subTitle } })}
                />
                <div>
                  <Title title="Featured Image" fontSize="text-base" costumeStyles="p-mb-2" />
                  <UploadButton
                    uploadedFile={uploadedFile}
                    handleUpload={(val: any) => setUploadedFIle(val)}
                    fileType="image/png, image/gif, image/jpeg"
                    disabled={Boolean(isEditing)}
                  />
                </div>
                {categories ? (
                  <Select
                    placeholder="Select Category"
                    data={modifiedCategories}
                    selectedValue={values.written.category}
                    label="Category"
                    required
                    handleChange={(category) => setValues({ ...values, written: { ...values.written, category } })}
                  />
                ) : <Skeleton height="40px" />}
                <Textarea
                  value={values.written.text}
                  label="Article Content"
                  required
                  handleChange={(text) => setValues({ ...values, written: { ...values.written, text } })}
                />
              </>
            ) : (
              <>
                <Title title="External Content Details" fontSize="text-2xl" costumeStyles="p-mb-0" />
                <TextInput
                  label="Title"
                  required
                  placeholder="How to empower yourself to improve your well-being."
                  value={values.external.title}
                  handleChange={(title) => setValues({ ...values, external: { ...values.external, title } })}
                />
                <TextInput
                  label="URL"
                  required
                  placeholder="URL"
                  value={values.external.URL}
                  handleChange={(URL) => setValues({ ...values, external: { ...values.external, URL } })}
                />
                {categories ? (
                  <Select
                    placeholder="Select Category"
                    data={modifiedCategories}
                    selectedValue={values.external.category}
                    label="Category"
                    required
                    handleChange={(category) => setValues({ ...values, external: { ...values.external, category } })}
                  />
                ) : <Skeleton height="40px" />}
                <Textarea
                  label="Description"
                  required
                  value={values.external.description}
                  handleChange={(description) => setValues({ ...values, external: { ...values.external, description } })}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityArticle;

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
