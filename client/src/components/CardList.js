// @flow
import React from 'react';

import { ACard } from './Card'

type Props = {|
  places?: Array<any>
|};

export const CardList = ({places}: Props) => (
  <div>
    {places && places.map(place => (
        <ACard {...{id: place.id, title: place.title, description: place.description,
                    address: place.address, score: place.score, website: place.website}}/>
    ))}
  </div>
);
