// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { Checkbox } from '../components/Checkbox';
import { ACard } from '../components/Card';
import { CardList } from '../components/CardList';
import { Review } from '../components/Review';
import { PlaceForm } from '../components/Place';
import { SearchBox } from '../components/SearchBox';
import { SearchCombo } from '../components/SearchCombo';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.css';

export const card = {
  id: 'AAAA-BBBB',
  title: 'Beer Garden',
  description: 'Drink beer in the garden',
  address: '1 Herzl st.',
  score: 4,
  website: 'http://www.example.com',
};

export const review = {
  username: 'Bob',
  description: 'Not a bad place',
  score: 4,
};

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('open now', () => <Checkbox message={text('Label', 'Only places that are open now')}/>);

storiesOf('SearchBox', module)
  .add('autocomplete', () => <SearchBox placeholderText={'Start typing...'}/>);

storiesOf('ACard', module)
  .add('place card', () => <ACard {...card}/>);

storiesOf('Button', module)
  .add('create place', () => <Button variant="outline-primary">Create Place...</Button>);


storiesOf('Review', module)
  .add('review', () => <Review {...review} />);

storiesOf('Place', module)
  .add('form', () => <PlaceForm />);

storiesOf('CardList', module)
  .add('card list', () => <CardList places={[card, card, card]} />);

storiesOf('SearchCombo', module)
  .add('tags', () => <SearchCombo />);
