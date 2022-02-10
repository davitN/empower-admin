import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { set } from '../../store/ducks/filtersDuck';

interface PropTypes {
  getDataAction: Function | undefined,
  resetState?: Function | undefined,
  LIMIT?: number,
  resetOnUnmount?: boolean,
  initialParams?: {},
  saveFIlters?: boolean,
  tableId?: string
  fetchOnMount? : boolean
}

const useGetData = ({
  getDataAction, resetState, LIMIT = 10, resetOnUnmount = true, initialParams, saveFIlters = true, tableId, fetchOnMount = true,
}: PropTypes) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filtersReducer);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const setTimeoutRef = useRef<any>();
  const params = useRef<any>({
    offset: 0,
    limit: LIMIT,
    filter: null,
    ...(initialParams && { ...initialParams }),
    ...(saveFIlters && tableId && filters[tableId] && { ...filters[tableId] }),
  });

  const handlePageChange = (val: number) => {
    saveFIlters && tableId && dispatch(set({ [tableId]: { ...filters[tableId], offset: (val - 1) * LIMIT } }));
    resetState && dispatch(resetState());
    getDataAction && dispatch(getDataAction({ ...params.current, offset: (val - 1) * LIMIT }));
  };

  const handleParamsChange = (data: any) => {
    params.current = { ...params.current, ...data, offset: 0 };
    Object.keys(data)[0] !== 'filter' && saveFIlters && tableId && dispatch(set({ [tableId]: { ...filters[tableId], offset: 0, ...data } }));
    resetState && dispatch(resetState());
    if (Object.keys(data)[0] === 'filter') {
      setSearchValue(data.filter);
      if (!data.filter) {
        params.current.filter = null;
        saveFIlters && tableId && dispatch(set({ [tableId]: { ...filters[tableId], filter: null, offset: 0 } }));
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
        saveFIlters && tableId && dispatch(set({ [tableId]: { ...filters[tableId], offset: 0, filter: params.current.filter } }));
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
