// @flow
import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';

import { toggleOpenNow, doFetchPlaces } from '../actions';


type Props = {|
  message: string,
  toggleOpenNow: () => void,
  doFetchPlaces: () => void,
|};

class Checkbox extends React.Component<Props> {
  handleToggle = () => {
    this.props.toggleOpenNow();
    this.props.doFetchPlaces();
  }

  render() {
    return (
      <Form.Check type="checkbox"
        defaultChecked={false}
        id="required-to-make-the-label-clickable"
        name="open_now"
        label={this.props.message}
        onChange={this.handleToggle}
      />
    );
  }
}

const mapDispatchToProps = {
  toggleOpenNow,
  doFetchPlaces,
};

export default connect(null, mapDispatchToProps)(Checkbox);
