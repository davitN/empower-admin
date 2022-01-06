import { createUseStyles } from 'react-jss';
import ButtonComponent from './Inputs/Button';
import COLORS from '../../services/colors.service';
import Label from './Inputs/Label';

interface PropsTypes {
  uploadedFile?: any,
  handleUpload?: (val: any) => void,
  fileType?: string,
  disabled?: boolean,
  uploadedFileProgress?: number | null,
  desc?: string,
  name? : string
}

const UploadButton = ({
  uploadedFile, handleUpload, fileType, disabled, uploadedFileProgress, desc, name,
} : PropsTypes) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.inputsWrapper}>
        <div className="p-d-flex p-ai-center">
          <div>
            <input
              type="file"
              id={`upload${name}`}
              accept={fileType}
              hidden
              onChange={(e) => {
                handleUpload && handleUpload(e.target.files && e.target.files[0]);
                e.target.value = '';
              }}
            />
            <label htmlFor={`upload${name}`} className={classes.label}>
              <ButtonComponent
                customClasses={classes.uploadBtn}
                bgColor={COLORS.lightBlue}
                textColor={COLORS.white}
                disabled={disabled}
              >
                + Choose
              </ButtonComponent>
            </label>
          </div>
          {uploadedFile && <Label label={uploadedFile.name} costumeStyles="p-ml-3" />}
          {uploadedFile && uploadedFileProgress && (
          <Label label={`(${uploadedFileProgress}%)`} costumeStyles="p-ml-10 text-sm" />
          )}
        </div>
      </div>
      {desc && <p className={classes.desc}>{desc}</p>}
    </div>
  );
};

export default UploadButton;

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
  desc: {
    fontSize: '0.8rem',
    opacity: 0.6,
    marginTop: '0.5rem',
  },
});
