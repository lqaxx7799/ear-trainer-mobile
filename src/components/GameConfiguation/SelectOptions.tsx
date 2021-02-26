import React from 'react';
import _ from 'lodash';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';

type Props = {
  options?: any[],
  value: any[],
  onChange: (newValue: string) => void,
}

export default function SelectOptions({ options, value, onChange }: Props) {
  if (!options) {
    return null;
  }

  const updateValue = (index: IndexPath | IndexPath[]) => {
    if (index instanceof IndexPath) {
      onChange(options[index.row].value);
    }
  }

  const selectedIndex = _.findIndex(options, option => option.value === value);

  return (
    <Layout>
      <Select
        selectedIndex={selectedIndex !== -1 ? new IndexPath(selectedIndex) : undefined}
        onSelect={index => updateValue(index)}
        value={selectedIndex !== -1 ? options[selectedIndex].title : undefined}
      >
        {options.map((option: any) => (
          <SelectItem title={option.title} key={option.value} />
        ))}
      </Select>
    </Layout>
  );

}
