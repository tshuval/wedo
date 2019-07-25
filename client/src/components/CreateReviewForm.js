// @flow
import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BackendClient } from '../requests';

let connection = new BackendClient();

type Props = {|
  placeId: string
|};

type State = {|
  username: string,
  description: string,
  score: number,
  isSaving: boolean
|};

export class CreateReviewForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      description: '',
      username: '',
      score: 5,
      isSaving: false
    };
  }
  isSaving: boolean;

  handleSave = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    this.setState(
      {isSaving: true},
      () => {
        this.save();
        this.setState({isSaving: false});
      }
    );
  }

  save = async () => {
    let review = await connection.createReview(this.props.placeId, this.state);
    console.log(review);
  }

  updateDescription = (e: SyntheticInputEvent<*>) =>
    this.setState({description: e.target.value});

  updateUsername = (e: SyntheticInputEvent<*>) =>
    this.setState({username: e.target.value});

  updateScore = (e: SyntheticInputEvent<*>) =>
    this.setState({score: Number(e.target.value)});

  render() {
    return (
      <Form className="my-2">
        <Form.Group as={Form.Row}>
          <Col sm={8}>
            <Form.Control type="text" placeholder="Write a review" onChange={this.updateDescription}/>
          </Col>
          <Col sm={2}><Form.Control type="text" placeholder="Username" onChange={this.updateUsername}/></Col>
          <Col sm={1}>
            <Form.Control as="select" defaultValue="x" onChange={this.updateScore}>
              <option value="x" disabled hidden>&#9733;</option>
              <option value="1">5</option>
              <option value="2">4</option>
              <option value="3">3</option>
              <option value="4">2</option>
              <option value="5">1</option>
            </Form.Control>
          </Col>
          <Col>
            <Button disabled={this.state.isSaving} onClick={!this.state.isSaving ? this.handleSave : null}>&#x2714;</Button>
          </Col>
        </Form.Group>
      </Form>
    )
  }
}
