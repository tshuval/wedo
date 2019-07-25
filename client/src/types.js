// @flow
export type PlaceProps = {|
  id: string,
  name: string,
  description: string,
  address: string,
  website: string,
  phone: string,
  email: string,
  lat: number,
  lon: number,
  opening_hours: {
    sun_open?: string,
    sun_close?: string,
    mon_open?: string,
    mon_close?: string,
    tue_open?: string,
    tue_close?: string,
    wed_open?: string,
    wed_close?: string,
    thu_open?: string,
    thu_close?: string,
    fri_open?: string,
    fri_close?: string,
    sat_open?: string,
    sat_close?: string
  },
  tags: Array<string>
|};

export type ReviewProps = {|
  username: string,
  description: string,
  score: number
|};
