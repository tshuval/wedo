# frozen_string_literal: true

TAG_LIST = %i(beer beergarden beersheva food fun restuarant bar barbados eat lunch).freeze

FactoryBot.define do
  factory :tag do
    sequence(:name) { |n| TAG_LIST[n - 1] || 'faker here' }
    tag_type { 'tag' }
  end
end
