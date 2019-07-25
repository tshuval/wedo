// @flow
import React from 'react';

import ACard from './Card';

type Props = {|
  places?: Array<any>
|};

export const CardList = ({ places }: Props) => (
  <div>
    {places && places.map(place => (
      <ACard key={place.id} {...{ id: place.id, name: place.name, description: place.description,
        address: place.address, score: place.average_score}}/>
    ))}
  </div>
);
