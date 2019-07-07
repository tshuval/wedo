# == Schema Information
#
# Table name: reviews
#
#  id          :uuid             not null, primary key
#  username    :string           not null
#  description :text
#  score       :integer          not null
#  place_id    :uuid
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Review, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
