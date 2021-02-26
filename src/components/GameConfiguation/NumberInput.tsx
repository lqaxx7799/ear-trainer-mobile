import React from 'react';
import { Platform } from 'react-native';
import _ from 'lodash';
import { Layout, Input } from '@ui-kitten/components';

type Props = {
  value: string,
  placeholder?: string,
  onChange: (newValue: string) => void,
}

export default function NumberInput({ value, placeholder, onChange }: Props) {
  const updateValue = (value: string) => {
    onChange(value);
  }

  return (
    <Layout>
      <Input
        placeholder={placeholder || 'Place your Text'}
        keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
        value={value}
        onChangeText={nextValue => updateValue(nextValue)}
      />
    </Layout>
  );

}
