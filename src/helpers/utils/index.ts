// eslint-disable-next-line import/prefer-default-export
export const fileUploadConfig = (uploadWatcher: (val: number) => void) => {
  return {
    onUploadProgress({ loaded, total }: { loaded: number, total: number }) {
      const percentCompleted = Math.round((loaded * 100) / total);
      uploadWatcher(percentCompleted === 100 ? 99 : percentCompleted);
    },
  };
};
