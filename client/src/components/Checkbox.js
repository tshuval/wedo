// @flow
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

type Props = {|
  message: string
|};

export const Checkbox = ({message}: Props) => (
  <Col>
    <Form.Check type="checkbox"
      defaultChecked={false}
      id="required-to-make-the-label-clickable"
      name="open_now"
      label={message}
    />
  </Col>
);
