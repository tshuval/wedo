# frozen_string_literal: true

require 'rails_helper'

TAG_LIST = %i(beer beergarden beersheva food fun restuarant bar barbados eat lunch)

RSpec.describe 'Tags API', type: :request do

  # Test suite for GET /tags
  describe 'GET /tags?q=be' do
    # initialize test data
    # make HTTP get request before each example
    before do
      TAG_LIST.each {|tag| Tag.create(name: tag, tag_type: 'tag')}
      get '/tags?q=be'
    end

    it 'returns tags' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['tags']).not_to be_empty
      expect(json['tags'].size).to eq(3)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET /tags?q=no_match' do
    let(:tags) { create_list(:tag, 10) }
    # make HTTP get request before each example
    before { get '/tags' }

    it 'returns nothing' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['tags']).to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET /tags' do
    let(:tags) { create_list(:tag, 10) }
    # make HTTP get request before each example
    before { get '/tags' }

    it 'returns nothing' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['tags']).to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:ok)
    end
  end
end
