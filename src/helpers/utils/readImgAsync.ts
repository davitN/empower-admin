import imageCompression from 'browser-image-compression';

export default async (e: any) => {
  const img = await e.target.files[0];
  const imgPrev = URL.createObjectURL(img);
  const imgDimension: any = await getImageDimensions(img);
  const thumbnail: any = await imageCompression(img, {
    maxSizeMB: 0.001,
    maxWidthOrHeight: 200,
  });
  const thumbnailDimension: any = await getImageDimensions(thumbnail);
  e.target.value = '';
  return {
    img,
    imgPrev,
    imgDimension,
    thumbnail,
    thumbnailDimension,
  };
};

const getImageDimensions = async (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img: any = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
};
