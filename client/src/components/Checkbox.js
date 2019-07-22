// @flow
import React from 'react';
import Form from 'react-bootstrap/Form';

type Props = {|
  message: string
|};

export const Checkbox = ({message}: Props) => (
  <Form.Check inline type="checkbox"
    defaultChecked={false}
    id="required-to-make-the-label-clickable"
    name="open_now"
    label={message}
  />
);
