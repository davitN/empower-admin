import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import TextInput from '../components/shared/Inputs/TextInput';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import readImgAsync from '../helpers/utils/readImgAsync';
import { saveLocation, getLocationDetails } from '../store/ducks/locationsDuck';
import { RootState } from '../store/configureStore';
import { LocationItem } from '../types/locations';
import useGetData from '../helpers/hooks/useGetData';
import Table from '../components/shared/Table';
import { getAppUsers, resetAppUsersState } from '../store/ducks/appUsersDuck';
import { GetAppUsersData } from '../types/appUsers';

interface ValuesTypes {
  name: string,
  company: string,
  companyId: string | null,
  logo?: {
    width: number,
    height: number,
    imgUrl: string
  },
  thumbnail?: {
    width: number,
    height: number,
    imgUrl: string
  },
}

interface ImgTypes {
  newImg: any,
  imgPrev: string | null,
  thumbnail?: any
}

const initialState = {
  name: '',
  company: '',
  companyId: null,
};

const imgInitialStateImg = {
  newImg: null,
  imgPrev: null,
};

const LocationDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { locationDetails }: { locationDetails: LocationItem } = useSelector((state: RootState) => state.locationsReducer);
  const { users }: { users: GetAppUsersData | null } = useSelector((state: RootState) => state.appUsersReducer);
  const { id: locationId } = useParams();
  const { state } = useLocation();
  const isNewLocation = locationId === 'new';
  const {
    searchValue, handleSearch, handlePageChange,
  } = useGetData({
    resetOnUnmount: true,
    getDataAction: isNewLocation ? undefined : getAppUsers,
    resetState: isNewLocation ? undefined : resetAppUsersState,
    costumeParams: {
      companyId: state?.companyId,
      locationId,
    },
  });
  const [saving, setSaving] = useState<boolean>(false);
  const navigate = useNavigate();
  const [values, setValues] = useState<ValuesTypes>(initialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [img, setImg] = useState<ImgTypes>(imgInitialStateImg);

  const validateInputs = () : boolean => values.name.length < 1;

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
    setSaving(true);
    dispatch(saveLocation({
      logo: img.newImg,
      thumbnail: img.thumbnail,
      data: {
        companyId: values.companyId,
        name: values.name,
      },
      locationId: isNewLocation ? undefined : locationId,
    }, {
      success: () => {
        setSaving(false);
        isNewLocation && navigate(`/companies/${state?.companyId}`);
      },
      error: () => {
        setSaving(false);
      },
    }));
  };

  useEffect(() => {
    if (isNewLocation) {
      // if new location, check if exist company name in router state and set company name otherwise redirect to companies page
      if (!state?.companyName && !state?.companyId) {
        navigate('/companies');
      } else {
        setValues({ ...values, company: state?.companyName, companyId: state?.companyId });
      }
    } else {
      locationId && dispatch(getLocationDetails(locationId, { error: () => navigate('/companies') }));
    }
  }, [state, isNewLocation]);

  useEffect(() => {
    if (locationDetails) {
      setValues({
        ...values, name: locationDetails?.name, company: locationDetails?.company.name, companyId: locationDetails.company['_id'],
      });
      setImg({
        ...img,
        imgPrev: locationDetails?.logo?.imgURL || null,
      });
    }
  }, [locationDetails]);

  return (
    <Container itemId={locationId} idText="Location ID" sectionTitle="STAR OF TEXAS VETERINARY HOSPITAL">
      <div className={classes.wrapper}>
        <div className={classes.inputs}>
          <Title title="LOCATION INFORMATION" costumeStyles="p-pb-4" />

          {!isNewLocation && !locationDetails ? (
            <>
              {new Array(2).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" />)}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            title="Update Company Logo"
            isNewItem={isNewLocation}
            image={{
              url: img.imgPrev,
              handleUpload: (e) => handleImgUpload(e),
              handleRemove: () => setImg(imgInitialStateImg),
              description: 'This logo will replace the company logo in the empower app.',
              loading: !isNewLocation && !locationDetails,
            }}
            save={{
              loading: saving,
              handler: handleSave,
              disabled: validateInputs(),
            }}
            remove={{
              handler: () => console.log('remove item'),
              label: 'Remove Location',
              disabled: false,
              hidden: !isNewLocation && !locationDetails,
            }}
          />
        </div>
      </div>
      {!isNewLocation && (
      <Table
        searchValue={searchValue || ''}
        handleSearch={(val) => handleSearch(val)}
        data={users}
        header={tableHeaders}
        tableTitle="LOCATION APP USERS"
        handleEdit={({ _id }) => navigate(`/app-users/${_id}`)}
        handlePageChange={(val) => handlePageChange(val)}
        handleAdd={() => navigate(
          '/app-users/new',
          {
            state: { location: { name: locationDetails.name, _id: locationDetails['_id'] }, company: locationDetails.company },
          },
        )}
        buttonText="+ Add user"
      />
      )}
    </Container>
  );
};

export default LocationDetails;

const useStyles = createUseStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
    marginBottom: '5rem',
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

const tableHeaders = [
  {
    name: 'FIRST NAME',
    field: 'firstName',
  },
  {
    name: 'LAST NAME',
    field: 'lastName',
  },
  {
    name: 'EMAIL',
    field: 'email',
  },
  {
    name: 'PHONE',
    field: 'phone',
  },
];
