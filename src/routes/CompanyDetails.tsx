import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import COLORS from '../services/colors.service';
import TextInput from '../components/shared/Inputs/TextInput';
import RadioButtonComponent from '../components/shared/Inputs/RadioButton';
import Label from '../components/shared/Inputs/Label';
import {
  getCompanyAdmins,
  getCompanyDetails,
  removeCompanyData,
  resetCompanyAdminsState,
  resetCompanyDetailsState,
  saveCompanyData,
} from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import { CompanyItem } from '../types/companies';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetData';
import readImgAsync from '../helpers/utils/readImgAsync';
import Container from '../components/shared/Container';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import { getLocations, resetLocationsState } from '../store/ducks/locationsDuck';
import notificationService from '../services/notification.service';
import { AppAdminsData } from '../types/appAdmin';
import Dialog from '../components/shared/Dialog';

interface InputsTypes {
  name: string;
  paymentType: string;
  price: number | null;
  showCommunitySection: boolean;
  code: null | string;
  width?: number;
  height?: number;
}

interface ImgTypes {
  newImg: any;
  imgPrev: string | null;
  thumbnail?: any;
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
  const { companyId } = useParams();
  const [dialogStep, setDialogStep] = useState(0);
  const [removing, setRemoving] = useState<boolean>(false);
  const isNewCompany = companyId === 'new';
  const { pathname } = useLocation();
  const prevLocation = `/${pathname.split('/')[1]}`;
  const { locations } = useSelector((state: RootState) => state.locationsReducer);
  const [showFilteredAdmins, setShowFilteredAdmins] = useState(false);
  const {
    searchValue: locationsSearchValue,
    handleSearch: locationsHandleSearch,
    handlePageChange: locationsHandlePageChange,
  } = useGetData({
    getDataAction: isNewCompany ? undefined : getLocations,
    resetState: isNewCompany ? undefined : resetLocationsState,
    resetOnUnmount: true,
    queryParams: {
      companyId,
    },
  });

  const {
    searchValue: adminsSearchValue,
    handleSearch: adminsHandleSearch,
    handlePageChange: adminsHandlePageChange,
  } = useGetData({
    getDataAction: isNewCompany ? undefined : getCompanyAdmins,
    resetState: isNewCompany ? undefined : resetCompanyAdminsState,
    resetOnUnmount: true,
    fetchOnMount: false,
    queryParams: {
      companyId,
    },
  });
  const { companyDetails, admins }: { companyDetails: CompanyItem; admins: AppAdminsData } = useSelector(
    (state: RootState) => state.companiesReducer
  );
  const [img, setImg] = useState<ImgTypes>(imgInitialState);
  const [values, setValues] = useState<InputsTypes>({
    name: '',
    paymentType: paymentType.all,
    price: null,
    showCommunitySection: true,
    code: null,
    width: 0,
    height: 0,
  });
  const [saving, setSaving] = useState<boolean>(false);
  const paidTill = companyDetails && companyDetails?.paidTill;
  const handleImgUpload = async (e: any) => {
    const { img: newImg, imgPrev, imgDimension, thumbnail } = await readImgAsync(e);

    setImg({
      newImg,
      imgPrev,
      thumbnail,
    });

    setValues({ ...values, width: imgDimension.width, height: imgDimension.height });
  };

  const handleSave = () => {
    setSaving(true);
    dispatch(
      saveCompanyData(
        {
          logo: img.newImg,
          thumbnail: img.thumbnail,
          data: values,
          companyId: isNewCompany ? null : companyId,
        },
        {
          success: () => {
            setSaving(false);
            navigate('/companies/');
          },
          error: () => setSaving(false),
        }
      )
    );
  };

  const validateInputs = (): boolean =>
    values.name.length < 1 || (values.paymentType === paymentType.all && !values.price) || !img.imgPrev;

  const domainName = window.location.href.replace(window.location.pathname, '');
  const paymentURL = `${domainName}/payments/?companyId=${companyId}&companyName=${values.name}&paidTill=${paidTill}`;

  const handleRemove = () => {
    setRemoving(true);
    dispatch(
      removeCompanyData(companyId || '', {
        success: () => {
          setRemoving(false);
          navigate('/companies');
        },
        error: () => setRemoving(false),
      })
    );
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
        price: companyDetails.price,
        showCommunitySection: companyDetails.showCommunitySection,
        code: companyDetails.code,
        width: companyDetails?.logo?.width || 0,
        height: companyDetails?.logo?.height || 0,
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
    <Container
      sectionTitle={isNewCompany ? 'NEW COMPANY' : 'COMPANY INFORMATION'}
      idText="Company ID"
      itemId={companyId}
      goBack={() => navigate(prevLocation)}
    >
      <Dialog
        visible={dialogStep === 1}
        setVisible={() => setDialogStep(0)}
        accept={() => setTimeout(() => setDialogStep(2), 300)}
        reject={() => setDialogStep(0)}
        msg="Are you sure you want to delete the company?"
      />
      <Dialog
        visible={dialogStep === 2}
        setVisible={() => setDialogStep(0)}
        accept={() => handleRemove()}
        reject={() => setDialogStep(0)}
        msg="Deleting this, will also delete all associated data, locations and application users."
      />
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>
          {!isNewCompany && !companyDetails ? (
            <>
              {new Array(8).fill(0).map((_, index) => (
                <Skeleton key={`${index + 1}loader`} width="100%" height="2rem" />
              ))}
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
                value={values.price}
                handleChange={(price) => setValues({ ...values, price: Number(price) })}
                label={`${values.paymentType === paymentType.individual ? 'Individual Location' : ''} Price`}
                placeholder="Enter price..."
                desc="Enter the yearly price that each location will need to pay to access the app."
                required
                type="number"
              />
              {!isNewCompany && values.paymentType === paymentType.all && (
                <TextInput
                  value={paymentURL}
                  handleClick={(e) => {
                    notificationService.info('Link Copied', '', 1000);
                    navigator.clipboard.writeText(e.target.value);
                  }}
                  label="Payment Page"
                  placeholder="Enter payment page..."
                  readOnly
                />
              )}
              <div className="p-d-flex p-flex-column">
                <Label label="Community Section" required costumeStyles="p-mb-3" />
                <div className="p-d-flex">
                  <RadioButtonComponent
                    label="Show"
                    checked={values.showCommunitySection}
                    onChange={() => setValues({ ...values, showCommunitySection: true })}
                    costumeClasses="p-mr-6"
                  />
                  <RadioButtonComponent
                    label="Hide"
                    checked={!values.showCommunitySection}
                    onChange={() => setValues({ ...values, showCommunitySection: false })}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            title="Update Company Logo"
            isNewItem={isNewCompany}
            image={{
              url: img.imgPrev,
              handleUpload: (e) => handleImgUpload(e),
              handleRemove: () => setImg(imgInitialState),
              description: 'This is the logo that shows on the team screen in the empower app',
              loading: !isNewCompany && !companyDetails,
              requiredImg: true,
            }}
            save={{
              loading: saving,
              handler: handleSave,
              disabled: validateInputs(),
            }}
            remove={{
              handler: () => setDialogStep(1),
              label: 'Remove Company',
              disabled: false,
              hidden: isNewCompany || (!isNewCompany && !companyDetails),
              loading: removing,
            }}
            customButtons={[
              {
                label: 'Add monthly team activity',
                handler: () => navigate(`/app-content/monthly-team-activity/new/${companyDetails['_id']}`),
                hidden: isNewCompany,
              },
              {
                label: 'Add Community Content',
                handler: () => navigate(`/app-content/community-article/new/${companyDetails['_id']}`),
                hidden: isNewCompany,
              },
            ]}
          />
        </div>
      </div>
      {!isNewCompany && (
        <>
          <Table
            searchValue={locationsSearchValue || ''}
            handleSearch={(val) => locationsHandleSearch(val)}
            data={locations}
            header={locationsHeader(navigate)}
            tableTitle="LOCATIONS"
            handleEdit={({ _id }) => navigate(`/locations/${_id}`)}
            handlePageChange={(val) => locationsHandlePageChange(val)}
            handleAdd={() =>
              navigate(`/locations/new/?companyId=${companyId}&companyName=${companyDetails.name.replace(' ', '_')}`)
            }
            buttonText="+ Add location"
            costumeClasses={classes.tablePadding}
          />
          <Table
            searchValue={adminsSearchValue || ''}
            handleSearch={(val) => {
              adminsHandleSearch(val);
              !showFilteredAdmins && setShowFilteredAdmins(true);
            }}
            data={showFilteredAdmins ? admins : companyDetails?.admins}
            header={adminsHeader}
            tableTitle="Manage Company Admins"
            handleEdit={({ _id, role }) => navigate(`/app-admins/${role.name}/${_id}`)}
            handlePageChange={(val) => {
              adminsHandlePageChange(val);
              !showFilteredAdmins && setShowFilteredAdmins(true);
            }}
            handleAdd={() =>
              navigate(
                `/app-admins/CompanyAdmin/new?companyId=${companyId}&companyName=${companyDetails.name.replace(
                  ' ',
                  '_'
                )}`
              )
            }
            buttonText="+ Add admin"
            costumeClasses={classes.tablePadding}
          />
        </>
      )}
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

const locationsHeader = (navigate: any) => [
  {
    name: 'LOCATION NAME',
    field: 'name',
  },
  {
    name: 'LOCATION ID',
    field: '_id',
  },
  {
    name: 'Analytics',
    body: ({ _id }: { _id: string }) => (
      <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/analytics/by_location/${_id}`)}>
        View analytics
      </div>
    ),
  },
];

const adminsHeader = [
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
  {
    name: 'ROLE',
    field: 'role.name',
  },
];
