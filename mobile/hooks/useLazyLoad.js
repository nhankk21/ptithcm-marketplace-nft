import { useRef, useCallback, useState } from 'react';
import usePagination from './usePagination';
import { useQuery, useQueryClient } from 'react-query';

const useLazyLoad = ({ initPagination, queryKeyFn, queryFn, cachedKeyFn }) => {
  const queryClient = useQueryClient();
  const isEndRef = useRef(false);
  const isFirstLoadingRef = useRef(true);
  const [dataList, setDataList] = useState([]);
  const { pagination, handlePagination } = usePagination(initPagination);
  const { data, refetch, ...useQueryState } = useQuery({
    queryKey: queryKeyFn([pagination]),
    queryFn: () => queryFn(pagination),
    onSuccess: ({ data: { data = [] } } = {}) => {
      if (pagination.page >= 1) {
        isFirstLoadingRef.current = false;
      }
      if (data.length === 0) {
        isEndRef.current = true;
      } else {
        let newData = [...data];
        if (pagination.page !== 1) {
          newData = [...dataList, ...newData];
        }
        setDataList(newData);
        cachedKeyFn && queryClient.setQueryData(cachedKeyFn(), newData);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRefetch = useCallback(() => {
    handlePagination({ page: 1 });
    refetch();
    isEndRef.current = false;
  }, []);

  return {
    dataList,
    isEndRef,
    isFirstLoadingRef,
    useQueryState,
    handleRefetch,
    handlePagination,
    setDataList,
  };
};

export default useLazyLoad;
