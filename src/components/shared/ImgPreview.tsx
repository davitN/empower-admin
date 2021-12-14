import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

interface PropTypes {
  url: string | null,
  handleRemove?: () => void,
  costumeClasses?: string
}

const ImgPreview = ({ url, handleRemove, costumeClasses }: PropTypes) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.previewImg, costumeClasses)}>
      {url ? (
        <>
          <img src={url} alt="" className={classes.img} />
          {handleRemove && <i className={classNames('pi pi-times', classes.removeIcon)} onClick={handleRemove} />}
        </>
      ) : (
        <i className={classNames('pi pi-image', classes.uploadImg)} />
      )}
    </div>
  );
};

export default ImgPreview;

const useStyles = createUseStyles({
  uploadImg: {
    fontSize: '5em',
    borderRadius: '10%',
    color: 'var(--surface-d)',
    width: '100%',
    height: '100%',
    transform: 'translateX(15%)',
    padding: '0 !important',
  },
  previewImg: {
    backgroundColor: 'var(--surface-b)',
    padding: '1.5rem',
    borderRadius: '10%',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(-40%,50%)',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '10%',
  },
});
