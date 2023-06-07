import { getAllNFTCache, getAllNFTOfCollectionKey } from '@services/queryKeys';
import { nftAPI } from '@services/api';
import useLazyLoad from '@hooks/useLazyLoad';

const useCollection = ({ collectionAddress }) => {
  const { dataList } = useLazyLoad({
    initPagination: { page: 1, limit: 5 },
    queryFn: (pagination) =>
      nftAPI.getByCollection({
        ...pagination,
        collectionAddress,
      }),
    queryKeyFn: getAllNFTOfCollectionKey,
    cachedKeyFn: getAllNFTCache,
  });

  return { dataList };
};

export default useCollection;
