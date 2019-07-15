# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Reviews API', type: :request do
  # initialize test data
  let(:place) { create(:place) }
  let!(:reviews) { create_list(:review, 10, place: place) }
  let(:place_id) { place.id }

  # Test suite for GET /reviews
  describe 'GET /places/:id/reviews' do
    # make HTTP get request before each example
    before { get "/places/#{place_id}/reviews" }

    it 'returns reviews' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:ok)
    end
  end

  # Test suite for POST /reviews
  describe 'POST /places/:id/reviews' do
    # valid payload
    let(:valid_attributes) { { description: 'woohoo', username: 'someone', score: 1 } }

    context 'when the request is valid' do
      before { post "/places/#{place_id}/reviews", params: valid_attributes }

      it 'creates a review' do
        expect(json['username']).to eq('someone')
        expect(json['description']).to eq('woohoo')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'when the username is empty' do
      before { post "/places/#{place_id}/reviews", params: { description: 'woohoo', score: 4 } }

      it 'returns status code 422' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Username can't be blank/)
      end
    end

    context 'when the username already exists' do
      let(:username) { reviews.first.username }
      before { post "/places/#{place_id}/reviews", params: { description: 'woohoo', username: username, score: 4 } }

      it 'returns status code 400' do
        expect(response).to have_http_status(:bad_request)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/User already reviewed this place/)
      end
    end

    context 'when the score is greater than 5' do
      before { post "/places/#{place_id}/reviews", params: { description: 'woohoo', username: 'someone', score: 6 } }

      it 'returns status code 422' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Score must be between 1-5/)
      end
    end

    context 'when the score is less than 1' do
      before { post "/places/#{place_id}/reviews", params: { description: 'woohoo', username: 'someone', score: 0 } }

      it 'returns status code 422' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Score must be between 1-5/)
      end
    end

    context 'when the score is empty' do
      before { post "/places/#{place_id}/reviews", params: { description: 'woohoo', username: 'someone' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Score must be between 1-5/)
      end
    end

    context 'when the place does not exist' do
      before { post '/places/INVALID-PLACE-ID/reviews', params: { description: 'woohoo', username: 'someone', score: 3 } }

      it 'returns status code 422' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Place must exist/)
      end
    end
  end
end
