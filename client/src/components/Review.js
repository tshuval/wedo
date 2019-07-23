// @flow
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

type Props = {|
  username: string,
  description: string,
  score: number
|};

export const Review = ({ username, description, score }: Props) => (
  <ListGroup.Item>{description} <cite className="text-muted">({username})</cite> <Badge variant={score < 3 ? 'danger' : 'warning'}>{score}&#9733;</Badge></ListGroup.Item>
);
