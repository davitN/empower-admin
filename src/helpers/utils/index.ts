import readImgAsync from './readImgAsync';
// eslint-disable-next-line import/prefer-default-export
export const fileUploadConfig = (uploadWatcher: (val: number) => void) => {
  return {
    onUploadProgress({ loaded, total }: { loaded: number, total: number }) {
      const percentCompleted = Math.round((loaded * 100) / total);
      uploadWatcher(percentCompleted === 100 ? 99 : percentCompleted);
    },
  };
};

export const handleImgUpload = async (e: any, setUploadedImg:Function, setValues: Function, values: any) => {
  const {
    img: newImg,
    imgPrev,
    imgDimension,
    thumbnail,
    thumbnailDimension,
  } = await readImgAsync(e);

  setUploadedImg({
    newImg,
    imgPrev,
    thumbnail,
  });

  setValues({ ...values, image: { ...imgDimension }, thumbnail: { ...thumbnailDimension } });
};

export
function setFileDuration(file: any, setValues: Function, values: any) {
  const video = document.createElement(file.type.includes('video') ? 'video' : 'audio');
  video.preload = 'metadata';
  video.onloadedmetadata = () => {
    window.URL.revokeObjectURL(video.src);
    const { duration } = video;
    setValues({ ...values, duration: Math.floor(duration) });
  };
  video.src = URL.createObjectURL(file);
}
