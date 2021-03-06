import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Skeleton } from 'primereact/skeleton';
import COLORS from '../../services/colors.service';
import Label from './Inputs/Label';
import Button from './Inputs/Button';
import ImgPreview from './ImgPreview';
import UploadButton from './UploadButton';

interface PropsTypes {
  title?: string,
  isNewItem?: boolean,
  customButtons?: {
    label: string,
    handler: () => void,
    disabled?: boolean,
    loading?: boolean,
    styles?: any,
    hidden?: boolean
  }[],
  image?: {
    url: string | null,
    handleRemove?: () => void,
    handleUpload?: (e : EventTarget) => void,
    description?: string,
    loading?: boolean,
    requiredImg?: boolean,
    disableUpload?: boolean,
    hideUpload?:boolean,
    hidden?: boolean
  },
  save: {
    label?: string,
    disabled?: boolean,
    handler?: () => void,
    loading?: boolean,
  },
  remove?: {
    label?: string,
    disabled?: boolean,
    handler?: () => void,
    loading?: boolean,
    hidden?: boolean
  },
}

const FormsSharedComponent = ({
  title,
  isNewItem,
  customButtons,
  /// /////////////
  image,
  save,
  remove,
}: PropsTypes) => {
  const classes = useStyles();

  const saveButtonLabel = isNewItem ? 'Save' : 'Update';
  return (
    <>
      {title && <Label label={title} costumeStyles="text-3xl" required={image?.requiredImg} />}
      {image && (
        !image.hidden && (
        <div className="p-d-flex p-ai-end p-flex-column">
          {!image?.hideUpload && <UploadButton disabled={image?.disableUpload} handleUpload={image?.handleUpload} fileType="image/png, image/gif, image/jpeg" />}
          { image?.loading ? <Skeleton className={classes.uploadImg} />
            : (
              <ImgPreview
                url={image.url}
                handleRemove={image?.handleRemove || undefined}
                costumeClasses={classes.uploadImg}
              />
            )}
          {image?.description && <p className={classes.infoText}>{image.description}</p>}
        </div>
        )
      )}

      {save && (
      <Button
        bgColor={COLORS.lightBlue}
        textColor={COLORS.white}
        customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
        handleClick={save?.handler ? save.handler : undefined}
        loading={save?.loading}
        disabled={save?.disabled}
      >
        {save?.label ? save.label : saveButtonLabel}
      </Button>
      )}
      {customButtons && customButtons.map(({
        label, handler, disabled, loading, styles, hidden,
      }) => !hidden && (
        <Button
          key={label}
          bgColor={COLORS.lightBlue}
          textColor={COLORS.white}
          customClasses={classNames(classes.button, 'p-py-2 p-px-4', styles)}
          handleClick={() => handler()}
          disabled={disabled}
          loading={loading}
        >
          {label}
        </Button>
      ))}
      {remove && (
        remove?.hidden ? null : (
          <Button
            bgColor={COLORS.red}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
            handleClick={remove?.handler ? remove.handler : undefined}
            loading={remove?.loading}
            disabled={remove?.disabled}
          >
            {remove.label}
          </Button>
        )
      )}
    </>
  );
};

export default FormsSharedComponent;

const useStyles = createUseStyles({
  button: {
    width: 'max-content',
    '&:disabled': {
      cursor: 'not-allowed !important',
      pointerEvents: 'inherit',
    },
  },
  infoText: {
    fontSize: '0.73rem',
    maxWidth: '12rem',
    color: COLORS.blueWood,
  },
  uploadImg: {
    width: '10rem !important',
    height: '8rem !important',
    margin: '1rem 0',
  },
  label: {
    width: 'max-content',
    cursor: 'pointer',
  },
});
