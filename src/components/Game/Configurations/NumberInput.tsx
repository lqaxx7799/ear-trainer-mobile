import React from 'react';
import { Platform } from 'react-native';
import _ from 'lodash';
import { Layout, Input } from '@ui-kitten/components';

type Props = {
  value: string,
  onChange: (newValue: string) => void,
}

export default function NumberInput({ value, onChange }: Props) {
  const updateValue = (value: string) => {
    onChange(value);
  }

  return (
    <Layout>
      <Input
        placeholder='Place your Text'
        keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
        value={value}
        onChangeText={nextValue => updateValue(nextValue)}
      />
    </Layout>
  );

}
