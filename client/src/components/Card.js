// @flow
import React from 'react';
import { connect } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { doGetPlace } from '../actions';

type Props = {|
  id: string,
  name: string,
  description: string,
  address: string,
  score: number,
  doGetPlace: (string) => void,
|};

class ACard extends React.Component<Props> {
  handleClick = (e: SyntheticEvent<*>) => (
    this.props.doGetPlace(this.props.id)
  );

  render() {
    const {
      name,
      description,
      address,
      score
    } = this.props;

    return (
      <Card onClick={this.handleClick}>
        <Card.Body>
          <Card.Title>
            {name}&nbsp;
            {score === 0 && <Badge variant='light'>No reviews yet</Badge>}
            {score > 0 && <Badge variant={score < 3 ? 'danger' : 'warning'}>{score}&#9733;</Badge>}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}


const mapDispatchToProps = {
  doGetPlace,
}

export default connect(null, mapDispatchToProps)(ACard);
