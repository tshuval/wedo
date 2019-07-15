// @flow
import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

type Props = {
  card: {
    id: string,
    title: string,
    description: string,
    address: string,
    score: number,
    website: string
  }
};

export const ACard = ({card: {id, title, description, address, score, website}}: Props) =>{
  return (
    <Card style={{ width: '24rem' }} data-id={id}>
      <Card.Body>
        <Card.Title>{title} <Badge variant={score < 3 ? "danger" : "warning"}>{score}&#9733;</Badge></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Link href={website} target="_blank">Visit website</Card.Link>
      </Card.Body>
    </Card>
  );
}

// export const Card = ({card: {id, title, description, address, score}}: Props) =>{
//   return (
//     <div className="card" data-id={id}>
//       <h4 className="card-title">
//         {title}
//       </h4>
//       <div className="card-description">
//         {description}
//       </div>
//       <div className="card-address">
//         {address}
//       </div>
//       <div className="card-score">
//         {score}
//       </div>
//     </div>
//   );
// }
