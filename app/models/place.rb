class Place < ApplicationRecord
  has_and_belongs_to_many :tags
  has_many :reviews
end
