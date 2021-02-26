import React from 'react';
import _ from 'lodash';
import { Layout, CheckBox } from '@ui-kitten/components';

type Props = {
  options?: any[],
  values: any[],
  onChange: (newValues: any[]) => void,
}

export default function Combobox({ options, values, onChange }: Props) {
  const updateValue = (checked: boolean, option: string) => {
    if (checked) {
      onChange([...values, option]);
    } else {
      onChange(_.filter(values, value => value !== option));
    }
  }

  if (!options) {
    return null;
  }

  return (
    <Layout>
      {options.map((item: any) => (
        <CheckBox
          style={{
            marginBottom: 5,
          }}
          onChange={(checked) => updateValue(checked, item.value)}
          key={item.value}
          checked={!!_.find(values, value => value === item.value)}
        >
          {item.title}
        </CheckBox>
      ))}
    </Layout>
  );

}
