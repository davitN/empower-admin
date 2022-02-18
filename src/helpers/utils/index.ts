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

export const handleImgUpload = async (e: any, setUploadedImg:Function) => {
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
    imgDimension,
    thumbnailDimension,
  });
};

export const setFileDuration = async (file: any, setValues: Function, values: any, key?: string) => {
  const video = document.createElement(file.type.includes('video') ? 'video' : 'audio');
  video.preload = 'metadata';
  video.onloadedmetadata = () => {
    window.URL.revokeObjectURL(video.src);
    const { duration } = video as any;
    setValues({ ...values, [key || 'duration']: Math.floor(duration) });
  };
  video.src = URL.createObjectURL(file);
};

export const setVideoDimension = async (file: any, setValues: Function, values: any, widthKey: string, heightKey: string) => {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.onloadedmetadata = () => {
    window.URL.revokeObjectURL(video.src);
    const { videoHeight, videoWidth } = video as any;
    setValues({ ...values, [widthKey]: videoWidth, [heightKey]: videoHeight });
  };
  video.src = URL.createObjectURL(file);
};

export const handleFileUpload = (file: File, setUploadedFile: Function, keys?: { duration?: string, width?: string, height?: string }) => {
  if (file.type.includes('video')) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const { duration, videoWidth, videoHeight } = video as any;
      setUploadedFile({
        file, [keys?.duration || 'duration']: duration, [keys?.width || 'width']: videoWidth, [keys?.height || 'height']: videoHeight, preview: URL.createObjectURL(file),
      });
    };
    video.src = URL.createObjectURL(file);
  }
  if (file.type.includes('audio')) {
    const video = document.createElement('audio');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const { duration } = video as any;
      setUploadedFile({
        file,
        [keys?.duration || 'duration']: duration,
        preview: URL.createObjectURL(file),
      });
    };
    video.src = URL.createObjectURL(file);
  }
};

export const urlValidator = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  const expression = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);
  return !!str.match(regex);
};

export const secondsToHms = (minute: number) => {
  const h = Math.floor(minute / 3600);
  const m = Math.floor((minute % 3600) / 60);
  const s = Math.floor((minute % 3600) % 60);

  const hDisplay = h > 0 ? h : '00';
  const mDisplay = m > 0 ? m : '00';
  const sDisplay = s > 0 ? s : '00';
  return `${hDisplay}:${mDisplay}:${sDisplay}`;
};
