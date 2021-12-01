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
import Button from '../components/shared/Inputs/Button';
import { CompanyItem } from '../types/companies';
import ImgPreview from '../components/ImgPreview/ImgPreview';
// import Table from '../components/shared/Table';
// import useGetData from '../helpers/hooks/useGetData';
import readImgAsync from '../helpers/utils/readImgAsync';

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

const CompanyDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {
  //   searchValue: locationsSearchValue, handleSearch: locationsHandleSearch, handlePageChange: locationsHandlePageChange,
  // } = useGetData({
  //   getDataAction: getCompanies,
  //   resetState: getCompanies,
  //   resetOnUnmount: true,
  // });
  const { id: companyId } = useParams();
  const { companyDetails } : { companyDetails: CompanyItem } = useSelector((state: RootState) => state.companiesReducer);
  const [img, setImg] = useState<ImgTypes>(imgInitialState);
  const [values, setValues] = useState<InputsTypes>({
    name: '',
    paymentType: '',
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
    <div className={classNames('p-p-6', classes.root)}>
      <div className="p-d-flex p-jc-between p-ai-center">
        <Title title="VETERINARY GROWTH PARTNERS" fontSize="text-4xl" costumeStyles="p-mr-6" />
        {!isNewCompany && (
          <p className={classNames('p-d-flex p-ai-center p-flex-column text-lg p-text-bold', classes.textColor)}>
            Company ID
            <span className="p-text-normal">{companyId}</span>
          </p>
        )}
      </div>
      <Title title="COMPANY INFORMATION" costumeStyles="p-pt-6 p-pb-4" />
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
                    checked={values.paymentType === 'COMPANY_PAYS_FOR_ALL'}
                    onChange={() => setValues({ ...values, paymentType: 'COMPANY_PAYS_FOR_ALL' })}
                    costumeClasses="p-mr-6"
                  />
                  <RadioButtonComponent
                    label="Individual locations pay"
                    checked={values.paymentType === 'INDIVIDUAL_LOCATIONS_PAY'}
                    onChange={() => setValues({ ...values, paymentType: 'INDIVIDUAL_LOCATIONS_PAY' })}
                  />
                </div>
              </div>
              <TextInput
                value={values.individualLocationPrice}
                handleChange={(individualLocationPrice) => setValues({ ...values, individualLocationPrice: Number(individualLocationPrice) })}
                label="Individual Location Price"
                placeholder="Enter price..."
                desc="Enter the yearly price that each location will need to pay to access the app."
                required
                type="number"
              />
              {!isNewCompany && (
              <TextInput
                value={values.individualLocationPaymentPage}
                label="Individual Location Payment Page"
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
          <Label label="Update Company Logo" costumeStyles="text-3xl" required />
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
          {!isNewCompany && !companyDetails ? <Skeleton className={classes.uploadImg} />
            : (
              <ImgPreview
                url={img.imgPrev}
                handleRemove={() => setImg(imgInitialState)}
                costumeClasses={classes.uploadImg}
              />
            ) }
          <p className={classes.infoText}>This is the logo that shows on the team screen in the empower app</p>
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
            handleClick={handleSave}
            loading={saving}
          >
            Save
          </Button>
        </div>
      </div>
      {/* <Table
        searchValue={locationsSearchValue || ''}
        handleSearch={(val) => locationsHandleSearch(val)}
        data={{ data: [], count: 0 }}
        header={locationsHeader}
        tableTitle="LOCATIONS"
        handleEdit={() => navigate('')}
        handlePageChange={(val) => locationsHandlePageChange(val)}
        handleAdd={() => navigate('new')}
        buttonText="+ Add location"
        costumeClasses={classes.tablePadding}
      /> */}
    </div>
  );
};

export default CompanyDetails;

const useStyles = createUseStyles({
  root: {
    width: '100%',
    minWidth: '950px',
  },
  textColor: {
    color: COLORS.blueWood,
  },
  inputs: {
    display: 'grid',
    gridAutoFlow: 'row',
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

// const locationsHeader = [
//   {
//     name: 'LOCATION NAME',
//     field: 'name',
//   },
//   {
//     name: 'LOCATION ID',
//     field: 'code',
//   },
// ];
