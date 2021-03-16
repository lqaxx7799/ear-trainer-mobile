import React from 'react';
import { Layout } from '@ui-kitten/components';

type Props = {
  data: { [key: string]: any }[],
  columns: { [key: string]: any }[],
  key: string,
};

export default function DataTable(props: Props) {
  return (
    <Layout></Layout>
  );
}