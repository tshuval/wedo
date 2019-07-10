# frozen_string_literal: true

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

require 'rails_helper'

RSpec.describe Tag, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
