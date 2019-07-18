# frozen_string_literal: true

FactoryBot.define do
  factory :tag do
    name { Faker::Lorem.word[2...30] }
    tag_type { 'tag' }
  end
end
