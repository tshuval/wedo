# frozen_string_literal: true

FactoryBot.define do
  factory :place do
    name { Faker::Lorem.word }
    address { Faker::Lorem.word }
    description { Faker::Lorem.word }
    average_score { Faker::Number.number(1) }
    is_active { true }
  end
end
