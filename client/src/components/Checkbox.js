// @flow
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

type Props = {
  message: string
};

export const Checkbox = ({message}: Props) =>{
  return (
    <Col>
      <Form.Check type="checkbox"
        defaultChecked={false}
        id="required-to-make-the-label-clickable"
        name="open_now"
        label={message}
      />
    </Col>
  );
}

// export const Checkbox = ({message}: Props) =>{
//   return (
//     <div className="checkbox">
//       <label className="checkbox-label">
//         <input
//           type="checkbox"
//           defaultChecked={false}
//           name="open_now"
//         />
//         {message}
//       </label>
//     </div>
//   );
// }
