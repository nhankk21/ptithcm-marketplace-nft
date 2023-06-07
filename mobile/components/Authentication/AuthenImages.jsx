import { View, Image } from 'react-native';
import { assets } from '@constants';

const NFTImage1 = assets.nft03;
const NFTImage2 = assets.nft02;

const AuthenImages = ({ style, ...props }) => {
  return (
    <View {...props} style={style}>
      <Image
        resizeMode="contain"
        // source={{
        //   uri: 'https://s3-alpha-sig.figma.com/img/a5d8/7c2a/4e3e04f47c93d92323f6ce6c03bef16d?Expires=1678060800&Signature=bUKmZEMAw-3Ec6iDGL11DyvbB438wqmPJSrxOGWajET1LiN1nHqIUxyLUSWHO9owBH2Ktlnoc0EP1PgShOYH7K5BYq3r61ER6zoSJOh5WeE~TQbwLDW~X7f42pFkV5CPTnnrric6cWt1wu1FkULLdSE~ixpMtZh8avqWj8qObNigJwgT8f2mYGiBA5XOWybAaW62zT6NiXIPlCtAn9fIqToCKjCTzAuWOyfz8s~4TIxmf5ZIFt2yiLKYjIrLsm8ClBeABUUnxplpETTz0acJKHB8E79T1jzhuocwqZo-JNF5-YMSBFBhmvfoQkaGP93JEc0sKt~afjzUtFjSGick1g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        // }}
        source={NFTImage1}
        style={{
          width: 200,
          height: 150,
          borderRadius: style.borderRadius,
          position: 'absolute',
          top: -150,
          left: 30,
          zIndex: 1,
          transform: [{ rotate: '-20deg' }],
        }}
      />
      <Image
        resizeMode="contain"
        source={NFTImage2}
        // source={{
        //   uri: 'https://s3-alpha-sig.figma.com/img/cb54/9cdf/de077bd71ec6ec2b9a45b37ee7390fe7?Expires=1678060800&Signature=NGDg8vVNa-jN2vLRvA4HEmnDfrGXqQL8rCV9BJP-wWYcwrUvZY~KAZBwz6L85ZV0ed4VgMOOV2u9qVOAvDf3pWb9k33R8SB2eH6mthT641ghiMoGYFNgHwMkuVew0Cy3CvYofkxwL3yPe-8sKce1Gp3mOhhDFImoS-r8txgoiIkNvKIXT4h43GFkjWR6dPqaP0rqdK~NFBa2TWQblEsJUu4W9tW0VG8-dPE2E0gfXtfXvtXZzuvW3HEeZiivz4UFgZYCVY4gD058-EtFrP~CR~kVcXxsB46icB58M6p4-phGcoCEb50p55F11T3PfQ7rf1aOLeJHIm8Or1N4mJ295g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        // }}
        style={{
          width: 200,
          height: 150,
          borderRadius: style.borderRadius,
          position: 'absolute',
          top: -50,
          right: 30,
        }}
      />
    </View>
  );
};

export default AuthenImages;
