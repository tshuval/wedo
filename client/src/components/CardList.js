// @flow
import React from 'react';

import { ACard } from './Card';

type Props = {|
  places: Array<any>
|};

export const CardList = ({ places }: Props) => (
  <div>
    {places && places.map(place => (
      <ACard {...place}/>
    ))}
  </div>
);
