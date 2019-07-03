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
#  sun_open      :string
#  sun_close     :string
#  mon_open      :string
#  mon_close     :string
#  tue_open      :string
#  tue_close     :string
#  wed_open      :string
#  wed_close     :string
#  thu_open      :string
#  thu_close     :string
#  fri_open      :string
#  fri_close     :string
#  sat_open      :string
#  sat_close     :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe Place, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
