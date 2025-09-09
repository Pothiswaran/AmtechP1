// src/components/RichText.tsx
import { RichText as JssRichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type Props = {
  fields: {
    Text: Field<string>;
  };
};

const RichText = ({ fields }: Props) => {
  return <JssRichText field={fields.Text} />;
};

export default RichText;
