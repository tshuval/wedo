// @flow
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { BackendClient } from '../requests';

let connection = new BackendClient();

type Props = {|
  placeholderText: string
|};

type State = {|
  value: string,
  tags: []
|};

export class SearchBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '', tags: [] };
  }
  timer: TimeoutID;

  handleChange = (e: SyntheticInputEvent<*>) => {
    this.setState(
      { value: e.target.value },
      () => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (this.state.value.length !== 1) {
          this.timer = setTimeout(() => this.getTags(), 200);
        }
      }
    );
  }

  getTags = async () => {
    // TODO: Parent should call GET /places...
    const tags = await connection.getTags(this.state.value);
    this.setState({ tags });
  }

  render() {
    return (
      <Col>
        <Form.Control placeholder={this.props.placeholderText}
          name="search_box"
          onChange={this.handleChange}
          value={this.state.value}
        />
      </Col>
    );
  }
}
