import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const LIMIT = 10;
const INITIAL_PAGE = 1;

interface PropTypes {
  getDataAction: Function,
  resetState: Function
}

const useGetData = ({ getDataAction, resetState }: PropTypes) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const handleSearch = (val: string) => {
    if (val) {
      setSearchValue(val);
    } else {
      dispatch(resetState());
      setSearchValue(null);
    }
    dispatch(getDataAction({
      limit: LIMIT,
      offset: (INITIAL_PAGE - 1) * LIMIT,
      searchWord: searchValue,
    }));
  };

  useEffect(() => {
    dispatch(getDataAction({
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      searchWord: searchValue,
    }));
  }, [page]);

  return {
    searchValue,
    page,
    setPage,
    handleSearch,
  };
};

export default useGetData;
