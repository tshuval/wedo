// @flow
import React from 'react';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import { clearError } from '../actions';

type Props = {
  message: string,
  clearError: Function
};

const Notification = ({message, clearError}: Props) => (
    <Toast className="notificationStyle" onClose={clearError}>
      <Toast.Header>
        <strong className="mr-auto">Error</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
);

const mapDispatchToProps = {
  clearError,
}

export default connect(null, mapDispatchToProps)(Notification);
