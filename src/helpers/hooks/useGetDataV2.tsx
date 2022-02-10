import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { set } from '../../store/ducks/paginationDuck';

interface PropTypes {
  getDataAction: Function | undefined,
  resetState?: Function | undefined,
  LIMIT?: number,
  resetOnUnmount?: boolean,
  initialParams?: {},
  savePagination?: boolean,
  tableId?: string
  fetchOnMount? : boolean
}

const useGetData = ({
  getDataAction, resetState, LIMIT = 10, resetOnUnmount = true, initialParams, savePagination = true, tableId, fetchOnMount = true,
}: PropTypes) => {
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootState) => state.paginationReducer);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const setTimeoutRef = useRef<any>();
  const params = useRef<any>({
    offset: savePagination && tableId && pagination[tableId] > 1 ? (pagination[tableId] - 1) * LIMIT : 0,
    limit: LIMIT,
    filter: null,
    ...(initialParams && { ...initialParams }),
  });

  const handlePageChange = (val: number) => {
    savePagination && tableId && dispatch(set({ [tableId]: val }));
    resetState && dispatch(resetState());
    getDataAction && dispatch(getDataAction({ ...params.current, offset: (val - 1) * LIMIT }));
  };

  const handleParamsChange = (data: any) => {
    params.current = { ...params.current, ...data, offset: 0 };
    resetState && dispatch(resetState());
    if (Object.keys(data)[0] === 'filter') {
      setSearchValue(data.filter);
      if (!data.filter) {
        params.current.filter = null;
        getDataAction && dispatch(getDataAction({ ...params.current }));
      }
    } else {
      getDataAction && dispatch(getDataAction({ ...params.current }));
    }
  };

  useEffect(() => {
    fetchOnMount && getDataAction && dispatch(getDataAction({ ...params.current }));
    return () => resetOnUnmount && resetState && dispatch(resetState());
  }, [getDataAction, fetchOnMount]);

  useEffect(() => {
    if (searchValue) {
      setTimeoutRef.current = setTimeout(() => {
        getDataAction && dispatch(getDataAction({ ...params.current }));
      }, 500);
    }
    return () => clearTimeout(setTimeoutRef.current);
  }, [searchValue]);

  return {
    handlePageChange,
    handleParamsChange,
    params: params.current,
  };
};

export default useGetData;
