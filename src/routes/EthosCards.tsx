import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../components/shared/Container';
import useGetData from '../helpers/hooks/useGetDataV2';
import { RootState } from '../store/configureStore';
import Table from '../components/shared/Table';
import { getEthosCards, resetEthosCardsState } from '../store/ducks/ethosCardsDuck';
import { EthosCardsData } from '../types/ethosCards';

const EthosCards = () => {
  const navigate = useNavigate();
  const { ethosCards }: { ethosCards: EthosCardsData } = useSelector((state: RootState) => state.ethosCardsReducer);
  const {
    params, handleParamsChange, handlePageChange,
  } = useGetData({
    getDataAction: getEthosCards,
    resetState: resetEthosCardsState,
    resetOnUnmount: true,
    tableId: 'ethosCards',
  });

  return (
    <Container sectionTitle="ETHOS CARDS">
      <Table
        tableId="ethosCards"
        saveFilters
        searchValue={params?.filter || ''}
        handleSearch={(val) => handleParamsChange({ filter: val })}
        data={ethosCards}
        header={tableHeaders}
        tableTitle="ETHOS CARDS"
        handleEdit={({ _id }) => navigate(`edit/${_id}`)}
        handlePageChange={(val) => handlePageChange(val)}
        handleAdd={() => navigate('new')}
        buttonText="+ Add ethos card"
      />
    </Container>
  );
};

export default EthosCards;

const tableHeaders = [
  {
    name: 'ETHOS CARD',
    field: 'title',
  },
  {
    name: 'CREATED AT',
    field: 'createdAt',
    body: ({ createdAt }: { createdAt: Date }) => createdAt && dateFormatter.format(new Date(createdAt)),
  },
];

const dateFormatter = Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});
