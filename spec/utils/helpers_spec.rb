# frozen_string_literals: true

require 'rails_helper'
require 'helpers'

RSpec.describe 'is_time?' do
  it 'returns false if the value is not time' do
    expect(is_time?('18:00')).to be(true)
    expect(is_time?('18:61')).to be(false)
    expect(is_time?('28:00')).to be(false)
    expect(is_time?('blah')).to be(false)
  end
end

RSpec.describe 'to_tag' do
  it 'returns a sanitized tag' do
    expect(to_tag('')).to eql('')
    expect(to_tag('aB c D1!2@3#4$5%6^7&8*9(0-=[]{}/.,<>?')).to eql('abcd1234567890')
  end
end

RSpec.describe 'open_now?' do
  let(:user_day) { Time.parse('2019-7-10 16:00+00:00') } # Wed
  let(:user_night) { Time.parse('2019-7-11 02:00+00:00') } # Thu

  # False cases
  it 'returns nil when opening_hours is empty' do
    expect(open_now?(nil, user_day, user_day)).to be(false)
  end

  it 'returns false when opening_hours are outside' do
    oh = {'wed_open': '10:00', 'wed_close': '15:30'}
    expect(open_now?(oh, user_day, user_day)).to be(false)
  end

  it 'returns false when opening_hours are outside 2' do
    oh = {'wed_open': '10:00', 'wed_close': '04:30'}
    expect(open_now?(oh, user_day, user_day)).to be(false)
  end

  it 'returns false when opening_hours are outside (user night)' do
    oh = {'wed_open': '10:00', 'wed_close': '15:30'}
    expect(open_now?(oh, user_night, user_night)).to be(false)
  end

  it 'returns false when opening_hours are outside 2  (user night)' do
    oh = {'wed_open': '10:00', 'wed_close': '04:30'}
    expect(open_now?(oh, user_night, user_night)).to be(false)
  end

  # True cases
  it 'returns true when opening_hours are containing' do
    oh = {'wed_open': '10:00', 'wed_close': '17:30'}.with_indifferent_access
    expect(open_now?(oh, user_day, user_day)).to be(true)
  end

  it 'returns true when opening_hours are containing (night)' do
    # User is already on Thursday, 2AM, and the place is open from Wednesday
    # until after Thursday midnight, so the second test (time-1.day) shuold pass
    oh = {'wed_open': '10:00', 'wed_close': '04:30'}.with_indifferent_access
    expect(open_now?(oh, user_night, user_night-1.day)).to be(true)
  end

  it 'returns true when opening_hours are containing 2 (night)' do
    oh = {'thu_open': '01:00', 'thu_close': '04:30'}.with_indifferent_access
    expect(open_now?(oh, user_night, user_night)).to be(true)
  end
end
