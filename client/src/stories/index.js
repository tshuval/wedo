// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { Checkbox } from '../components/Checkbox'
import { ACard } from '../components/Card'
import { SearchBox } from '../components/SearchBox'

import 'bootstrap/dist/css/bootstrap.css';

export const card = {
  id: 'AAAA-BBBB',
  title: 'Beer Garden',
  description: 'Drink beer in the garden',
  address: '1 Herzl st.',
  score: 4,
  website: 'http://www.example.com'
}

const stories_cb = storiesOf('Checkbox', module);
stories_cb.addDecorator(withKnobs);

stories_cb.add('basic', () => <Checkbox message={text('Label', 'Only places that are open now')}></Checkbox>);

storiesOf('SearchBox', module)
  .add('basic', () => <SearchBox placeholder_text={"Start typing..."}></SearchBox>);

storiesOf('ACard', module)
  .add('basic', () => <ACard card={card}></ACard>);
