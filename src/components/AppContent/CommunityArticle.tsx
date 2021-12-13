import { createUseStyles } from 'react-jss';
import Title from '../shared/Title';
import Label from '../shared/Inputs/Label';
import RadioButtonComponent from '../shared/Inputs/RadioButton';
import FileUploadForm from '../shared/FileUploadForm';
import Textarea from '../shared/Inputs/Textarea';
import TextInput from '../shared/Inputs/TextInput';

interface PropTypes {
  values: any,
  setValues: Function,
  contentType: { value: string, label: string }[],
  setUploadedFIle: Function,
  uploadedFile: EventTarget
}

const CommunityArticle = ({
  values, setValues, contentType, uploadedFile, setUploadedFIle,
}: PropTypes) => {
  const classes = useStyles();

  return (
    <div className={classes.gridWrapper}>
      <div>
        <Title title="Community Article Details" fontSize="text-2xl" costumeStyles="p-mb-4" />
        <div className={classes.gridInputsWrapper}>
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
        </div>
      </div>
      <div className={classes.gridInputsWrapper}>
        {values.contentType === 'WRITTEN' ? (
          <>
            <Title title="Written Content Details" fontSize="text-2xl" costumeStyles="p-mb-0" />
            <TextInput label="Title" required placeholder="How to empower yourself to improve your well-being." value="" />
            <TextInput label="Subtitle" required placeholder="How to empower yourself to improve your well-being." value="" />
            <div>
              <Title title="Featured Image" fontSize="text-base" costumeStyles="p-mb-2" />
              <FileUploadForm
                uploadedFile={uploadedFile}
                handleUpload={(val: any) => setUploadedFIle(val)}
                fileType="image/png, image/gif, image/jpeg"
              />
            </div>
            <Textarea value="" label="Article Content" required />
          </>
        ) : (
          <>
            <Title title="External Content Details" fontSize="text-2xl" costumeStyles="p-mb-0" />
            <TextInput label="Title" required placeholder="How to empower yourself to improve your well-being." value="" />
            <TextInput label="URL" required placeholder="URL" value="" />
            <Textarea value="" label="Description" required />
          </>
        )}
      </div>
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
