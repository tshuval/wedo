class Tag < ApplicationRecord
  has_and_belongs_to_many :places
  validates :name, length: { in: 2..30, message: 'Tag length must be 2-30 characters'}
  validates :tag_type, inclusion: {in: ['tag', 'place']}
end
