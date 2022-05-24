import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/shared/Container';
import Button from '../components/shared/Inputs/Button';
import COLORS from '../services/colors.service';
import { resetAppUserDetails } from '../store/ducks/appUsersDuck';
import { RootState } from '../store/configureStore';
import { getCompanies, resetCompaniesState } from '../store/ducks/companiesDuck';
import { resetLocationsState, getLocations } from '../store/ducks/locationsDuck';
import { CompanyItem, CompaniesTypes } from '../types/companies';
import { GetLocationsData, LocationItem } from '../types/locations';
import Autocomplete from '../components/shared/Inputs/Autocomplete';
import useGetData from '../helpers/hooks/useGetDataV2';
import axiosInstance from '../services/interceptor.service';

const BulkUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState<null | string>(null);
  const [selectedLocation, setSelectedLocation] = useState<null | string>(null);
  const { companies }: { companies: CompaniesTypes | null } = useSelector((state: RootState) => state.companiesReducer);
  const { locations }: { locations: GetLocationsData | null } = useSelector(
    (state: RootState) => state.locationsReducer,
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const prevLocation = `/${pathname.split('/')[1]}`;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies(
      {
        offset: 0,
        limit: 20000,
      },
    ));
  }, []);

  const { handleParamsChange: companiesHandleSearch } = useGetData({
    LIMIT: 20,
    resetOnUnmount: true,
    getDataAction: getCompanies,
    resetState: resetCompaniesState,
  });

  const { handleParamsChange: handleLocationsParamsChange } = useGetData({
    LIMIT: 20,
    resetOnUnmount: true,
    getDataAction: getLocations,
    resetState: resetLocationsState,
    fetchOnMount: false,
  });

  const handleSave = () => {
    setLoading(true);
    const formData = new FormData();
    if (selectedFile && selectedLocation) {
      formData.append('file', selectedFile);
      axiosInstance.post(`/app_user/bulk_registration/${selectedLocation}`, formData);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => () => dispatch(resetAppUserDetails()), []);

  return (
    <Container sectionTitle="Bulk Upload" goBack={() => navigate(prevLocation)}>
      <div className={classes.wrapper}>
        <div className={classNames(classes.inputs)}>

          <input accept=".csv" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" />

          <Autocomplete
            data={companies?.data}
            placeholder="Select company"
            getOptionLabel={(option: CompanyItem) => option.name}
            getOptionValue={(option: CompanyItem) => option.name}
            selectedValue={
                  (Array.isArray(companies?.data) && companies?.data?.find((el) => el['_id'] === selectedCompany))
                  || null
                }
            setSelectedValue={(item: CompanyItem) => {
              setSelectedCompany(item['_id']);
            }}
            handleSearch={(val) => companiesHandleSearch({ filter: val })}
          />

          <Autocomplete
            data={locations?.data}
            placeholder="Select location"
            getOptionLabel={(option: CompanyItem) => option.name}
            getOptionValue={(option: CompanyItem) => option.name}
            selectedValue={
                  (Array.isArray(locations?.data) && locations?.data?.find((el) => el['_id'] === selectedLocation))
                  || null
                }
            setSelectedValue={(item: LocationItem) => {
              setSelectedLocation(item['_id']);
            }}
            handleSearch={(val) => handleLocationsParamsChange({ filter: val })}
            disabled={!selectedCompany}
          />

        </div>
        <div className={classes.justifyEnd}>
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-py-2 p-px-4')}
            handleClick={handleSave}
            loading={loading}
          >
            Upload users (csv)
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default BulkUpload;

const useStyles = createUseStyles({
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
    width: '100%',
    '&:disabled': {
      cursor: 'not-allowed !important',
      pointerEvents: 'inherit',
    },
  },
});
