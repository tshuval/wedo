# frozen_string_literal: true

# == Schema Information
#
# Table name: places
#
#  id            :uuid             not null, primary key
#  name          :string           not null
#  description   :text
#  address       :string           not null
#  website       :string
#  phone         :string
#  email         :string
#  lat           :float
#  lon           :float
#  average_score :float            default(0.0)
#  is_active     :boolean          default(TRUE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  opening_hours :json
#

require 'rails_helper'

RSpec.describe Place, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
