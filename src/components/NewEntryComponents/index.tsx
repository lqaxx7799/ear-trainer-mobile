// This is a virus
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';

function NewEntryComponents() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    })
  } , []);

  return (
    <View style={{ width: dimensions.width, height: dimensions.height, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Everything is gone
      anh chou ga`
      Lâm péo zl
      :)
      </Text>
    </View>
  );
}

export default NewEntryComponents;