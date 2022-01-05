import { AutoComplete } from 'primereact/autocomplete';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import Container from '../components/shared/Container';
import { getAllCompanies, resetAllCompaniesState } from '../store/ducks/companiesDuck';
import { AllCompaniesItem } from '../types/companies';
import { RootState } from '../store/configureStore';
import Title from '../components/shared/Title';
import { getReportsCompany } from '../store/ducks/reportsDuck';

const Reports = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const timerRef: any = useRef();
  const { allCompanies } : { allCompanies: AllCompaniesItem[] } = useSelector((state: RootState) => state.companiesReducer);
  const [filteredList, setFilteredList] = useState<null | AllCompaniesItem[]>(null);
  const [selectedCompany, setSelectedCompany] = useState<AllCompaniesItem | null>(null);

  const searchCompany = (event: { query: string }) => {
    timerRef.current = setTimeout(() => {
      let filteredCountries = [];
      if (!event.query.trim().length) {
        filteredCountries = [...allCompanies];
      } else {
        filteredCountries = allCompanies.filter((country) => {
          return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredList(filteredCountries);
    }, 250);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    dispatch(getAllCompanies());
    return () => {
      dispatch(resetAllCompaniesState());
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (allCompanies) {
      setFilteredList(allCompanies);
      setSelectedCompany(allCompanies[0]);
    }
  }, [allCompanies]);

  useEffect(() => {
    selectedCompany && dispatch(getReportsCompany({
      companyId: selectedCompany['_id'],
    }));
  }, [selectedCompany]);

  return (
    <Container sectionTitle="Reports ">
      <AutoComplete
        value={selectedCompany}
        suggestions={filteredList || []}
        completeMethod={searchCompany}
        field="name"
        dropdown
        forceSelection
        itemTemplate={itemTemplate}
        onChange={(e) => setSelectedCompany(e.value)}
      />
      {allCompanies && allCompanies.length === 0 && <Title title="There are no companies..." costumeStyles={classes.noData} />}
    </Container>
  );
};

export default Reports;

const useStyles = createUseStyles({
  noData: {
    marginTop: '5rem',
    textAlign: 'center',
  },
});

const itemTemplate = ({ name, logo }: { name: string, logo: { imgURL: string } }) => {
  return (
    <div className="country-item p-d-flex">
      <img alt={name} src={logo.imgURL} style={{ width: '3rem', height: '1.5rem', marginRight: '1rem' }} />
      <div>{name}</div>
    </div>
  );
};
