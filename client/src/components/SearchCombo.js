// @flow
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';

import { BackendClient } from '../requests';

let connection = new BackendClient();

type Props = {|
  style?: string,
  className?: string
|};

type State = {|
  value: string,
  tags: ?[]
|};

export class SearchCombo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '', tags: null };
    this.getPlaces();
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

  handleSelection = (e: SyntheticEvent<*>) => {
    this.setState(
      { value: e.toString(), tags: null },
      () => {
        this.getPlaces();
      });
  }

  getTags = async () => {
    let tags = [];
    if (this.state.value === '') {
      tags = null;
    } else {
      tags = await connection.getTags(this.state.value);
    }
    this.setState({ tags });
  }

  getPlaces = async () => {
    let places = [];
    places = await connection.getPlaces(this.state.value);
    // TODO: something with the list of places
  }

  render() {
    const {
      style, className,
    } = this.props;
    const { value } = this.state;
    const { tags } = this.state;

    return (
      <div style={style} className={className}>
        <FormControl
          autoFocus
          className="mx-1 my-1 w-auto"
          placeholder="Start typing..."
          onChange={this.handleChange}
          value={value}
        />
        <ul className="list-unstyled">
          {tags && tags.length > 0 && tags.map(tag => (
            <Dropdown.Item key={tag.name} eventKey={tag.name} onSelect={this.handleSelection}>{tag.name}</Dropdown.Item>))}
          {tags && tags.length === 0 && <Dropdown.Header>No results</Dropdown.Header>}
        </ul>
      </div>
    );
  }
}
