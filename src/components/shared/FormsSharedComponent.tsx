import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Skeleton } from 'primereact/skeleton';
import COLORS from '../../services/colors.service';
import Label from './Inputs/Label';
import Button from './Inputs/Button';
import ImgPreview from '../ImgPreview/ImgPreview';

interface PropsTypes {
  handleImgUpload: (e: any) => void,
  loadingImg: boolean,
  handleImgRemove: () => void,
  handleSave: () => void,
  isSaving: boolean,
  imgUrl: string | null,
  title?: string,
  desc?:string,
  requiredLogo?: boolean
}

const FormsSharedComponent = ({
  handleImgUpload, loadingImg, handleImgRemove, handleSave, isSaving, imgUrl, title, desc, requiredLogo,
}: PropsTypes) => {
  const classes = useStyles();
  return (
    <>
      <Label label={title || ''} costumeStyles="text-3xl" required={requiredLogo} />
      <div className={classes.uploadButton}>
        <label htmlFor="file-input">
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
          >
            + Choose
          </Button>
        </label>
        <input
          id="file-input"
          type="file"
          onChange={handleImgUpload}
        />
      </div>
      {loadingImg ? <Skeleton className={classes.uploadImg} />
        : (
          <ImgPreview
            url={imgUrl}
            handleRemove={handleImgRemove}
            costumeClasses={classes.uploadImg}
          />
        ) }
      <p className={classes.infoText}>{desc}</p>
      <Button
        bgColor={COLORS.lightBlue}
        textColor={COLORS.white}
        customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
        handleClick={handleSave}
        loading={isSaving}
      >
        Save
      </Button>
    </>
  );
};

export default FormsSharedComponent;

const useStyles = createUseStyles({
  button: {
    width: 'max-content',
  },
  infoText: {
    fontSize: '0.73rem',
    maxWidth: '12rem',
    color: COLORS.blueWood,
  },
  uploadImg: {
    width: '10rem !important',
    height: '8rem !important',
  },
  uploadButton: {
    position: 'relative',
    cursor: 'pointer',
    '& > input': {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    },
  },
});
