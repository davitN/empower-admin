import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

interface PropTypes {
  getDataAction?: Function | undefined,
  resetState?: Function | undefined,
  LIMIT?: number,
  resetOnUnmount?: boolean,
  queryParams?: any,
  fetchOnMount? : boolean
}

const useGetData = ({
  getDataAction, resetState, LIMIT = 10, resetOnUnmount, queryParams = {}, fetchOnMount = true,
}: PropTypes) => {
  const isFirstRender = useRef(true);
  const setTimeoutRef = useRef<any>();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [dynamicParams, setDynamicParams] = useState({});
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
      ...queryParams,
    }));
  };

  // watch search keyword and send api req
  useEffect(() => {
    if (getDataAction && !isFirstRender.current) {
      setTimeoutRef.current = setTimeout(() => {
        resetState && dispatch(resetState());
        dispatch(getDataAction({
          limit: LIMIT,
          offset: 0,
          searchWord: searchValue || null,
          ...queryParams,
          ...dynamicParams,
        }));
      }, 500);
      return () => clearTimeout(setTimeoutRef.current);
    }
  }, [searchValue, getDataAction, isFirstRender, dynamicParams]);

  useEffect(() => {
    getDataAction && fetchOnMount && dispatch(getDataAction({
      limit: LIMIT,
      offset: 0,
      searchWord: searchValue,
      ...queryParams,
    }));
    isFirstRender.current = false;
    return resetOnUnmount ? () => resetState && dispatch(resetState()) : undefined;
  }, []);

  return {
    searchValue,
    handleSearch,
    handlePageChange,
    setDynamicParams,
  };
};

export default useGetData;
