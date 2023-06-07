import {
  ActionsSection,
  CollectionSection,
  FinanceSection,
} from '@components/Profile';
import InformationSection from '@components/Profile/InformationSection';
import useLazyLoad from '@hooks/useLazyLoad';
import useUserInfo from '@hooks/useUserInfo';
import { collectionAPI } from '@services/api';
import { getAllCollectionByUserKey } from '@services/queryKeys';
import { SafeAreaView } from 'react-native';

const Profile = () => {
  const { address } = useUserInfo();
  const {
    useQueryState,
    dataList,
    isEndRef,
    isFirstLoadingRef,
    handlePagination,
  } = useLazyLoad({
    initPagination: { page: 1, limit: 5 },
    queryKeyFn: (pagination) =>
      getAllCollectionByUserKey([pagination, address]),
    queryFn: (pagination) =>
      collectionAPI.getAllByUser({ ...pagination, userAddress: address }),
  });

  const userInfo = useUserInfo();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CollectionSection
        collections={dataList}
        isEnd={isEndRef.current}
        isFirstLoading={isFirstLoadingRef.current}
        handlePagination={handlePagination}
        {...useQueryState}
      >
        <InformationSection />
        <FinanceSection {...userInfo} />
        <ActionsSection {...userInfo} />
      </CollectionSection>
    </SafeAreaView>
  );
};

export default Profile;
