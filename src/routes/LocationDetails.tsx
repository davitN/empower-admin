import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import TextInput from '../components/shared/Inputs/TextInput';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import readImgAsync from '../helpers/utils/readImgAsync';
import { saveLocation } from '../store/ducks/locationsDuck';

interface ValuesTypes {
  name: string,
  company: string,
  companyId?: string,
  logo?: {
    width: number,
    height: number,
    imgUrl: string
  },
  thumbnail?: {
    width: number,
    height: number,
    imgUrl: string
  }
}

interface ImgTypes {
  newImg: any,
  imgPrev: string | null,
  thumbnail?: any
}

const initialState = {
  name: '',
  company: '',
  companyId: '',
};

const imgInitialStateImg = {
  newImg: null,
  imgPrev: null,
};

const LocationDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id: locationId } = useParams();
  const location = useLocation();
  const [saving, setSaving] = useState<boolean>(false);
  const navigate = useNavigate();
  const [values, setValues] = useState<ValuesTypes>(initialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [img, setImg] = useState<ImgTypes>(imgInitialStateImg);

  const isNewLocation = locationId === 'new';

  const handleImgUpload = async (e: any) => {
    const {
      img: newImg,
      imgPrev,
      imgDimension,
      thumbnail,
      thumbnailDimension,
    } = await readImgAsync(e);

    setImg({
      newImg,
      imgPrev,
      thumbnail,
    });

    setValues({ ...values, logo: { ...imgDimension }, thumbnail: { ...thumbnailDimension } });
  };
  const handleSave = () => {
    dispatch(saveLocation({
      logo: img.newImg,
      thumbnail: img.thumbnail,
      data: {
        companyId: values?.companyId,
        name: values.name,
      },
      locationId: isNewLocation ? null : locationId,
    }, {
      success: () => setSaving(false),
      error: () => setSaving(false),
    }));
  };

  useEffect(() => {
    if (isNewLocation) {
      // if new location, check if exist company name in router state and set company name otherwise redirect to companies page
      if (!location.state) {
        navigate('/companies');
      } else {
        setValues({ ...values, company: location.state?.companyName, companyId: location.state?.companyId });
      }
    }
  }, [location, isNewLocation]);

  return (
    <Container itemId={locationId} idText="Location ID" sectionTitle="STAR OF TEXAS VETERINARY HOSPITAL">
      <Title title="LOCATION INFORMATION" costumeStyles="p-pb-4" />
      <div className={classes.wrapper}>
        <div className={classes.inputs}>
          <TextInput
            value={values.name}
            handleChange={(name) => setValues({ ...values, name })}
            label="Location Name"
            placeholder="Enter location name..."
            required
          />
          <TextInput
            value={values.company}
            label="Company"
            placeholder="Enter company name..."
            disabled
          />
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            handleImgUpload={(e) => handleImgUpload(e)}
            loadingImg={false}
            imgUrl={img.imgPrev}
            handleImgRemove={() => console.log('rm img')}
            isSaving={saving}
            handleSave={handleSave}
            title="Update Location Logo"
            desc="This logo will replace the company logo in the empower app."
          />
        </div>
      </div>
    </Container>
  );
};

export default LocationDetails;

const useStyles = createUseStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
  },
  inputs: {
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gridGap: '1.5rem',
  },
  justifyEnd: {
    justifySelf: 'end',
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gap: '1rem',
    justifyItems: 'end',
  },
});
