import { useParams, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import Title from '../components/shared/Title';
import COLORS from '../services/colors.service';
import TextInput from '../components/shared/Inputs/TextInput';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';
import Label from '../components/shared/Inputs/Label';
import {
  getCompanyDetails, resetCompanyDetailsState, saveCompanyData,
} from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import { CompanyItem } from '../types/companies';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetData';
import readImgAsync from '../helpers/utils/readImgAsync';
import Container from '../components/shared/Container';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import { getLocations, resetLocationsState } from '../store/ducks/locationsDuck';

interface InputsTypes {
  name: string,
  paymentType: string,
  individualLocationPrice: number | null,
  individualLocationPaymentPage: string,
  showTeamSection: boolean,
  code: null | string,
  logo?: any,
  thumbnail?: any
}

interface ImgTypes {
  newImg: any,
  imgPrev: string | null,
  thumbnail?: any
}

const imgInitialState = {
  newImg: null,
  imgPrev: null,
};

const paymentType = {
  all: 'COMPANY_PAYS_FOR_ALL',
  individual: 'INDIVIDUAL_LOCATIONS_PAY',
};

const CompanyDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: companyId } = useParams();
  const { locations } = useSelector((state: RootState) => state.locationsReducer);
  const {
    searchValue: locationsSearchValue, handleSearch: locationsHandleSearch, handlePageChange: locationsHandlePageChange,
  } = useGetData({
    getDataAction: getLocations,
    resetState: resetLocationsState,
    resetOnUnmount: true,
    costumeParams: {
      companyId,
    },
  });
  const { companyDetails } : { companyDetails: CompanyItem } = useSelector((state: RootState) => state.companiesReducer);
  const [img, setImg] = useState<ImgTypes>(imgInitialState);
  const [values, setValues] = useState<InputsTypes>({
    name: '',
    paymentType: paymentType.all,
    individualLocationPrice: null,
    individualLocationPaymentPage: '',
    showTeamSection: true,
    code: null,
  });
  const [saving, setSaving] = useState<boolean>(false);
  const isNewCompany = companyId === 'new';

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
    dispatch(saveCompanyData({
      logo: img.newImg,
      thumbnail: img.thumbnail,
      data: values,
      companyId: isNewCompany ? null : companyId,
    }, {
      success: () => setSaving(false),
      error: () => setSaving(false),
    }));
  };

  useEffect(() => {
    if (companyId !== 'new' && typeof companyId === 'string') {
      dispatch(getCompanyDetails(companyId, { error: () => navigate('/companies/new') }));
    }
  }, [companyId]);

  useEffect(() => {
    if (companyDetails) {
      setValues({
        name: companyDetails.name,
        paymentType: companyDetails.paymentType,
        individualLocationPrice: companyDetails.individualLocationPrice,
        individualLocationPaymentPage: companyDetails.individualLocationPaymentPage,
        showTeamSection: companyDetails.showTeamSection,
        code: companyDetails.code,
      });
      setImg({
        ...img,
        imgPrev: companyDetails.logo.imgURL,
      });
    }
  }, [companyDetails]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => () => dispatch(resetCompanyDetailsState()), []);

  return (
    <Container sectionTitle="VETERINARY GROWTH PARTNERS" idText="Company ID" itemId={companyId}>
      <Title title="COMPANY INFORMATION" costumeStyles="p-pb-4" />
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>
          {!isNewCompany && !companyDetails ? (
            <>
              {new Array(8).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" />)}
            </>
          ) : (
            <>
              <TextInput
                value={values.name}
                handleChange={(name) => setValues({ ...values, name })}
                label="Company Name"
                placeholder="Enter company name..."
                required
              />
              <div className="p-d-flex p-flex-column">
                <Label label="Payment" required costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  <RadioButtonComponent
                    label="Company pay for all"
                    checked={values.paymentType === paymentType.all}
                    onChange={() => setValues({ ...values, paymentType: paymentType.all })}
                    costumeClasses="p-mr-6"
                  />
                  <RadioButtonComponent
                    label="Individual locations pay"
                    checked={values.paymentType === paymentType.individual}
                    onChange={() => setValues({ ...values, paymentType: paymentType.individual })}
                  />
                </div>
              </div>
              <TextInput
                value={values.individualLocationPrice}
                handleChange={(individualLocationPrice) => setValues({ ...values, individualLocationPrice: Number(individualLocationPrice) })}
                label={`${values.paymentType === paymentType.individual ? 'Individual Location' : ''} Price`}
                placeholder="Enter price..."
                desc="Enter the yearly price that each location will need to pay to access the app."
                required
                type="number"
              />
              {!isNewCompany && (
              <TextInput
                value={values.individualLocationPaymentPage}
                label={`${values.paymentType === paymentType.individual ? 'Individual Location' : ''}Payment Page`}
                placeholder="Enter payment page..."
                desc="This is the page where individual locations can go to play for access to the app"
                disabled
              />
              )}
              <div className="p-d-flex p-flex-column">
                <Label label="Team Section" required costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  <RadioButtonComponent
                    label="Show"
                    checked={values.showTeamSection}
                    onChange={() => setValues({ ...values, showTeamSection: true })}
                    costumeClasses="p-mr-6"
                  />
                  <RadioButtonComponent
                    label="Hide"
                    checked={!values.showTeamSection}
                    onChange={() => setValues({ ...values, showTeamSection: false })}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            handleImgUpload={(e) => handleImgUpload(e)}
            loadingImg={!isNewCompany && !companyDetails}
            imgUrl={img.imgPrev}
            handleImgRemove={() => setImg(imgInitialState)}
            isSaving={saving}
            handleSave={handleSave}
            title="Update Company Logo"
            desc="This is the logo that shows on the team screen in the empower app"
          />
        </div>
      </div>
      <Table
        searchValue={locationsSearchValue || ''}
        handleSearch={(val) => locationsHandleSearch(val)}
        data={locations}
        header={locationsHeader}
        tableTitle="LOCATIONS"
        handleEdit={() => navigate('')}
        handlePageChange={(val) => locationsHandlePageChange(val)}
        handleAdd={() => navigate('new')}
        buttonText="+ Add location"
        costumeClasses={classes.tablePadding}
      />
    </Container>
  );
};

export default CompanyDetails;

const useStyles = createUseStyles({
  textColor: {
    color: COLORS.blueWood,
  },
  inputs: {
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gridGap: '1.5rem',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
  },
  justifyEnd: {
    justifySelf: 'end',
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gap: '1rem',
    justifyItems: 'end',
  },
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
  tablePadding: {
    margin: '8rem 0 5rem',
  },
});

const locationsHeader = [
  {
    name: 'LOCATION NAME',
    field: 'name',
  },
  {
    name: 'LOCATION ID',
    field: 'company',
  },
];
