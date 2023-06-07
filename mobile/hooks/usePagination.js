import { useState, useCallback } from 'react';

const usePagination = ({ limit = 10, page = 1 } = {}) => {
  const [pagination, setPagination] = useState({ limit, page });

  const handlePagination = (_pagination = {}) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page + 1,
      ..._pagination,
    }));
  };

  return { pagination, handlePagination };
};

export default usePagination;
