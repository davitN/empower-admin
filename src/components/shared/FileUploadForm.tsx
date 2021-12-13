import { createUseStyles } from 'react-jss';
import ButtonComponent from './Inputs/Button';
import COLORS from '../../services/colors.service';
import Label from './Inputs/Label';

interface PropsTypes {
  uploadedFile: any,
  handleUpload: (val: any) => void,
  fileType: string
}

const FIleUploadForm = ({
  uploadedFile, handleUpload, fileType,
} : PropsTypes) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.inputsWrapper}>
        <div className="p-d-flex p-ai-center">
          <div>
            <input type="file" id="upload" accept={fileType} hidden onChange={(e) => handleUpload(e.target.files && e.target.files[0])} />
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
