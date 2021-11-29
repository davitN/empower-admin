import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const INITIAL_PAGE = 1;

interface PropTypes {
  getDataAction: Function,
  resetState: Function,
  LIMIT?: number
}

const useGetData = ({ getDataAction, resetState, LIMIT = 10 }: PropTypes) => {
  const dispatch = useDispatch();
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

  const handlePageChange = (val: number) => {
    dispatch(resetState());
    dispatch(getDataAction({
      limit: LIMIT,
      offset: (val - 1) * LIMIT,
      searchWord: searchValue,
    }));
  };

  useEffect(() => {
    dispatch(getDataAction({
      limit: LIMIT,
      offset: LIMIT,
      searchWord: searchValue,
    }));
  }, []);

  return {
    searchValue,
    handleSearch,
    handlePageChange,
  };
};

export default useGetData;
