# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tags API', type: :request do
  # initialize test data
  let!(:tags) { create_list(:tag, 10) }
  # Test suite for GET /tags
  describe 'GET /tags?q=be' do
    # make HTTP get request before each example
    before { get '/tags?q=be' }

    it 'returns tags' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['tags']).not_to be_empty
      expect(json['tags'].size).to eq(3)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /tags?q=no_match' do
    # make HTTP get request before each example
    before { get '/tags' }

    it 'returns nothing' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['tags']).to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /tags' do
    # make HTTP get request before each example
    before { get '/tags' }

    it 'returns nothing' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['tags']).to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
