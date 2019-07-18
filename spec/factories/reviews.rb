# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    username { Faker::Lorem.word }
    description { Faker::Lorem.word }
    score { Faker::Number.within(1..5) }
    place
  end
end
