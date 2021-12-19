import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

interface PropTypes {
  getDataAction?: Function | undefined,
  resetState?: Function | undefined,
  LIMIT?: number,
  resetOnUnmount?: boolean,
  costumeParams?: any,
  fetchOnMount? : boolean
}

const useGetData = ({
  getDataAction, resetState, LIMIT = 10, resetOnUnmount, costumeParams = {}, fetchOnMount = true,
}: PropTypes) => {
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const handleSearch = (val: string) => {
    if (val?.length > 0) {
      setSearchValue(val);
    } else {
      resetState && dispatch(resetState());
      setSearchValue(null);
    }
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

  // watch search keyword and send api req
  useEffect(() => {
    if (getDataAction && !isFirstRender.current) {
      const delayDebounceFn = setTimeout(() => {
        resetState && dispatch(resetState());
        dispatch(getDataAction({
          limit: LIMIT,
          offset: 0,
          searchWord: searchValue || null,
          ...costumeParams,
        }));
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchValue, getDataAction, isFirstRender]);

  useEffect(() => {
    getDataAction && fetchOnMount && dispatch(getDataAction({
      limit: LIMIT,
      offset: 0,
      searchWord: searchValue,
      ...costumeParams,
    }));
    isFirstRender.current = false;
    return resetOnUnmount ? () => resetState && dispatch(resetState()) : undefined;
  }, []);

  return {
    searchValue,
    handleSearch,
    handlePageChange,
  };
};

export default useGetData;
