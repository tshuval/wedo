# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    username { Faker::Lorem.word }
    description { Faker::Lorem.word }
    score { 3 }
    place
  end
end
