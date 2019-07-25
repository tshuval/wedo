// @flow
import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';

import { BackendClient } from '../requests';
import { updateSearchValue, doFetchPlaces } from '../actions';

let connection = new BackendClient();

type Props = {|
  style?: string,
  className?: string,
  updateSearchValue: (string) => void,
  doFetchPlaces: () => void
|};

type State = {|
  value: string,
  tags: ?[]
|};

class SearchCombo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '', tags: null };
    //this.getPlaces();
    this.props.updateSearchValue('');
  }
  timer: TimeoutID;

  handleChange = (e: SyntheticInputEvent<*>) => {
    // Called whenever the value in the searchbox changes
    this.setState(
      { value: e.target.value },
      () => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (this.state.value.length === 0) {
          // Searchbox is empty, so clear the tags and reload the list of places
          this.setState(
            {tags: null},
            () => {
              this.refreshPlaces();
            }
          )
        }
        // Searchbox has at least one character, so fetch matching tags
        if (this.state.value.length > 1) {
          this.timer = setTimeout(() => this.getTags(), 200);
        }
      }
    );
  }

  handleSelection = (e: SyntheticEvent<*>) => {
    // Called when the user selects a tag from the drop down
    this.setState(
      { value: e.toString(), tags: null },
      () => this.refreshPlaces());
  }

  refreshPlaces = () => {
    // Called to refresh the list of places
    this.props.updateSearchValue(this.state.value);
    this.props.doFetchPlaces()
  };

  getTags = async () => {
    // Fetches a list of tags from the server
    let tags = await connection.getTags(this.state.value);
    this.setState({ tags });
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
          type="search"
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

const mapDispatchToProps = {
  updateSearchValue,
  doFetchPlaces
}

export default connect(null, mapDispatchToProps)(SearchCombo);
