import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { EthPrice, NFTTitle } from '@components/NFT/SubInfo';
import { COLORS, SIZES, FONTS, assets } from '@constants';
import { RectButton } from '@components/common/Button';
import withModal from '@hoc/withModal';
import MintModal from './MintModal';
import AddCollectionModal from '@components/Profile/CollectionSection/AddCollectionModal';

const EditIcon = assets.edit;
const AddIcon = assets.add;

const DescriptionStatistic = ({ title, children, ...props }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.base,
      }}
      {...props}
    >
      <Text>{title}</Text>
      {children}
    </View>
  );
};

const DetailsDesc = ({ data, setModal, isOwn = true, setCollection }) => {
  const [text, setText] = useState(data.description.slice(0, 100));
  const [readMore, setReadMore] = useState(false);
  const isLong = data.description.length > 100;

  const editHandler = () => {
    const initialData = {
      title: data.title,
      rate: data.rate,
      description: data.description,
    };
    const thumbnail = {
      uri: data.thumbnail,
    };
    setModal({
      isOpen: true,
      Type: AddCollectionModal,
      metadata: {
        title: 'Edit collection',
        initialData,
        collectionAddress: data.address,
        setCollection,
        thumbnail,
      },
    });
  };

  const mintHandler = () => {
    setModal({
      isOpen: true,
      Type: MintModal,
      metadata: { collectionAddress: data.address },
    });
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <NFTTitle
          numberOfLines={2}
          style={{ flex: 3 }}
          title={data.title}
          subTitle={data.username}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />
        {isOwn && (
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              gap: SIZES.font,
            }}
          >
            <RectButton
              leftIcon={<EditIcon fill={COLORS.white} />}
              text="Edit"
              marginLeft="auto"
              handlePress={editHandler}
            />
            <RectButton
              leftIcon={<AddIcon fill={COLORS.white} />}
              text="Mint"
              handlePress={mintHandler}
            />
          </View>
        )}
      </View>

      <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
        <Text
          style={{
            fontSize: SIZES.font,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >
          Description
        </Text>
        <View
          style={{
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: SIZES.small,
              fontFamily: FONTS.regular,
              lineHeight: SIZES.large,
            }}
          >
            {text}
            {isLong && !readMore && '...'}
            <Text
              style={{
                color: COLORS.primary,
                fontSize: SIZES.small,
                fontFamily: FONTS.semiBold,
              }}
              onPress={() => {
                if (!isLong) {
                  return;
                }
                if (!readMore) {
                  setText(data.description);
                  setReadMore(true);
                } else {
                  setText(data.description.slice(0, 100));
                  setReadMore(false);
                }
              }}
            >
              {isLong ? (readMore ? ' Show Less' : ' Read More') : ''}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.small,
          }}
        >
          <DescriptionStatistic title="Floor price">
            <EthPrice price={0.32} />
          </DescriptionStatistic>
          <DescriptionStatistic title="Creator earning">
            <Text>{data.rate}%</Text>
          </DescriptionStatistic>
          <DescriptionStatistic title="Total volume">
            <EthPrice price={0.32} />
          </DescriptionStatistic>
        </View>
      </View>
    </>
  );
};

export default withModal(DetailsDesc);
