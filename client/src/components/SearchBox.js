// @flow
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

type Props = {
  placeholder_text: string
};

type State = {
  value: string
};

export class SearchBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this);
  }
  timer: TimeoutID;

  /*:: handleChange: () => void */
  handleChange(e: SyntheticInputEvent<*>) {
    this.setState(
      {value: e.target.value},
      () => {
        if (this.timer) clearTimeout(this.timer);
        if (this.state.value.length >= 2) {
          this.timer = setTimeout(() => this.getTags(), 200);
        }
      }
    );
  }

  getTags() {
    // TODO: Parent should call GET /places...
    console.log('GET /places?q=' + this.state.value);
  }

  render() {
    return (
        <Col>
          <Form.Control placeholder={this.props.placeholder_text}
           name="search_box"
           onChange={this.handleChange}
           value={this.state.value}
          />
        </Col>
    );
  }
}

// export const SearchBox = ({placeholder_text}: Props) =>{
//   return (
//       <Col>
//         <Form.Control placeholder={placeholder_text}
//          name="search_box"
//         />
//       </Col>
//   );
// }

// export const SearchBox = ({placeholder_text}: Props) =>{
//   return (
//     <div className="searchbox">
//         <input
//           type="text"
//           placeholder={placeholder_text}
//           name="search_box"
//         />
//     </div>
//   );
// }
