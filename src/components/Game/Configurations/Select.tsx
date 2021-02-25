import React from 'react';
import _ from 'lodash';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';

type Props = {
  options?: any[],
  value: any[],
  onChange: (newValue: string) => void,
}

export default function Combobox({ options, value, onChange }: Props) {
  if (!options) {
    return null;
  }

  const updateValue = (index: IndexPath | IndexPath[]) => {
    if (index instanceof IndexPath) {
      onChange(options[index.row].title);
    }
  }
console.log(1111, options);
  return (
    <Layout>
      <Select
        // selectedIndex={new IndexPath(_.findIndex(options, option => option.value === value))}
        // onSelect={index => updateValue(index)}
      >
        {options.map((option: any) => (
          <SelectItem title={option.title} key={option.value} />
        ))}
      </Select>
    </Layout>
  );

}
