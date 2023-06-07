import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const usePickImage = ({ options, initialImage }) => {
  const [image, setImage] = useState(initialImage);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      ...options,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return {
    handlePickImage,
    image,
  };
};

export default usePickImage;
