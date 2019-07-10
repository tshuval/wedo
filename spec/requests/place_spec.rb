# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Places API', type: :request do
  # initialize test data
  let!(:places) { create_list(:place, 10) }
  let(:first_place) {places.first}
  let(:place_id) { places.first.id }
  let(:place_name) { places.first.name.downcase }

  # Test suite for GET /places
  describe 'GET /places' do
    # make HTTP get request before each example
    before { get '/places' }

    it 'returns places' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['places']).not_to be_empty
      expect(json['places'].size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # # Test suite for GET /places?q=<place name>
  # describe 'GET /places?q=<place name>' do

  #   before { get "/places?q=#{place_name}" }

  #   context 'when the record exists' do
  #     it 'returns a list with the place' do
  #       expect(json['places']).not_to be_empty
  #       expect(json['places'][0]['name']).to eq(place_name)
  #     end

  #     it 'returns status code 200' do
  #       expect(response).to have_http_status(200)
  #     end
  #   end

  #   context 'when the record does not exist' do
  #     let(:place_name) { 'not-here' }

  #     it 'returns empty list' do
  #       expect(json['places']).to be_empty
  #     end

  #     it 'returns status code 200' do
  #       expect(response).to have_http_status(200)
  #     end
  #   end
  # end

  # Test suite for GET /places/:id
  describe 'GET /places/:id' do
    before do
      # Create a tag for this place
      first_place.tags << Tag.create!(name: 'tag1')
      # Create a review for this place
      Review.create!(username: 'me', description: 'nice', 'score': 4, place: first_place)
      Review.create!(username: 'you', description: 'not nice', 'score': 2, place: first_place)

      get "/places/#{place_id}"
    end

    context 'when the record exists' do
      it 'returns the place' do
        expect(json).not_to be_empty
        expect(json['place']['id']).to eq(place_id)
        # Check tags
        expect(json['tags'].length).to eq(1)
        expect(json['tags'][0]).to eq('tag1')
        # Check reviews
        expect(json['latest_reviews'].length).to eq(2)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:place_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Place/)
      end
    end
  end

  # Test suite for POST /places
  describe 'POST /places' do
    # valid payload
    let(:valid_attributes) { { name: 'Beer Garden', address: 'Somewhere',
                               opening_hours: {'sun_open': '10:00', 'sun_close': '20:00'} ,
                               tags: ['tag1', 'TAG2', 'x']} }

    context 'when the request is valid' do
      before { post '/places', params:  valid_attributes }

      it 'creates a place' do
        expect(json['name']).to eq('Beer Garden')
        expect(json['address']).to eq('Somewhere')
        expect(json['opening_hours']['sun_open']).to eq('10:00')
        expect(json['opening_hours']['sun_close']).to eq('20:00')

        # Validate tag creation/association
        tags = Place.find(json['id']).tags.map { |t| t.name }
        expect(tags.length).to eq(3)
        expect(tags).to include('tag1', 'tag2', 'beergarden')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the address is empty' do
      before { post '/places', params: { name: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Address can't be blank/)
      end
    end

    context 'when the name is empty' do
      before { post '/places', params: { address: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Name can't be blank/)
      end
    end

    context 'when the opening hours are invalid' do
      before { post '/places', params: { name: 'Test', address: 'Foobar', opening_hours: {'sun_open': '30:00'}} }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Invalid hours/)
      end

    context 'when the opening hours is invalid' do
      before { post '/places', params: { name: 'Test', address: 'Foobar', opening_hours: {'wtf_open': '10:00'}} }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Invalid hours/)
      end
    end

    end
  end

  # Test suite for PUT /places/:id
  describe 'PUT /places/:id' do
    let(:valid_attributes) { { name: 'Woohoo' } }

    context 'when the record exists' do
      before { put "/places/#{place_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end
end
