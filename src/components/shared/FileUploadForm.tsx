import { createUseStyles } from 'react-jss';
import ButtonComponent from './Inputs/Button';
import Textarea from './Inputs/Textarea';
import TextInput from './Inputs/TextInput';
import Title from './Title';
import COLORS from '../../services/colors.service';
import Label from './Inputs/Label';

interface PropsTypes {
  type: 'VIDEO' | 'AUDIO',
  uploadedFile: any,
  handleUpload: (val: any) => void,
  values: any,
  setValues : Function
}

const FIleUploadForm = ({
  type, uploadedFile, handleUpload, values, setValues,
} : PropsTypes) => {
  const classes = useStyles();
  return (
    <div>
      <Title title={`${type === 'VIDEO' ? 'Video' : 'Audio'} Details`} fontSize="text-2xl" costumeStyles="p-mb-5" />
      <div className={classes.inputsWrapper}>
        <TextInput label="Title" required value={values.title} handleChange={(title) => setValues({ ...values, title })} />
        <TextInput label="Subtitle" required value={values.subTitle} handleChange={(subTitle) => setValues({ ...values, subTitle })} />
        {type === 'VIDEO' && <Textarea label="Description" value={values.description} required handleChange={(description) => setValues({ ...values, description })} />}
        <div className="p-d-flex p-ai-center">
          <div>
            <input type="file" id="upload" hidden onChange={(e) => handleUpload(e.target.files && e.target.files[0])} />
            <label htmlFor="upload" className={classes.label}>
              <ButtonComponent
                customClasses={classes.uploadBtn}
                bgColor={COLORS.lightBlue}
                textColor={COLORS.white}
              >
                + Choose
              </ButtonComponent>
            </label>
          </div>
          {uploadedFile && <Label label={uploadedFile.name} costumeStyles="p-ml-3" />}
        </div>
      </div>
    </div>
  );
};

export default FIleUploadForm;

const useStyles = createUseStyles({
  inputsWrapper: {
    display: 'grid',
    gridRowGap: '1.5rem',
  },
  uploadBtn: {
    pointerEvents: 'none',
    width: 'max-content',
  },
  label: {
    width: 'max-content',
    cursor: 'pointer',
  },
});
