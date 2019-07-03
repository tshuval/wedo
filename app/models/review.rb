class Review < ApplicationRecord
  belongs_to :place
  validates :score, numericality: {only_integer: true, greater_than: 0, less_than: 6, message: 'Review score must be 1-5'}
end
