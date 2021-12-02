import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface PropTypes {
  getDataAction?: Function | undefined,
  resetState?: Function | undefined,
  LIMIT?: number,
  resetOnUnmount?: boolean,
  costumeParams?: any
}

const useGetData = ({
  getDataAction, resetState, LIMIT = 10, resetOnUnmount, costumeParams = {},
}: PropTypes) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const handleSearch = (val: string) => {
    if (val?.length > 0) {
      setSearchValue(val);
    } else {
      resetState && dispatch(resetState());
      setSearchValue(null);
    }
    getDataAction && dispatch(getDataAction({
      limit: LIMIT,
      offset: 0,
      searchWord: val || null,
      ...costumeParams,
    }));
  };

  const handlePageChange = (val: number) => {
    resetState && dispatch(resetState());
    getDataAction && dispatch(getDataAction({
      limit: LIMIT,
      offset: (val - 1) * LIMIT,
      searchWord: searchValue,
      ...costumeParams,
    }));
  };

  useEffect(() => {
    getDataAction && dispatch(getDataAction({
      limit: LIMIT,
      offset: 0,
      searchWord: searchValue,
      ...costumeParams,
    }));
    return resetOnUnmount ? () => resetState && dispatch(resetState()) : undefined;
  }, []);

  return {
    searchValue,
    handleSearch,
    handlePageChange,
  };
};

export default useGetData;
