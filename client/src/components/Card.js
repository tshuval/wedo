// @flow
import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

type Props = {
  id: string,
  title: string,
  description: string,
  address: string,
  score: number,
  website: string
};

export const ACard = ({id, title, description, address, score, website}: Props) => (
  <Card data-id={id}>
    <Card.Body>
      <Card.Title>{title} <Badge variant={score < 3 ? "danger" : "warning"}>{score}&#9733;</Badge></Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
      <Card.Text>{description}</Card.Text>
      <Card.Link href={website} target="_blank">Visit website</Card.Link>
    </Card.Body>
  </Card>
);
