# == Schema Information
#
# Table name: tags
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  tag_type   :string           default("tag"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord
  has_and_belongs_to_many :places
  validates :name, length: { in: 2..30, message: 'Tag length must be 2-30 characters'}
  validates :tag_type, inclusion: {in: ['tag', 'place']}
end
