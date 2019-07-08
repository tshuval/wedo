# frozen_string_literal: true

def to_tag(s)
  # Removes whitespace and other chars from 's' and lowercases
  s.gsub(/[^a-zA-Z0-9]+/, '').downcase
end

def time_to_int(t)
  # Converts string time to integer. Returns nil if not a valid time
  # e.g. '10:30' -> 10.5
  h, m = t.split(':')
  if h && m && h.match(/^(\d)+$/) && m.match(/^(\d)+$/)
    h = h.to_i
    m = m.to_i
    if h && m
      return h + m / 60.0 if (h >= 0) && (h <= 23) && (m >= 0) && (m <= 59)
    end
  end
  nil
end

def open_now?(place, user_now, place_now)
  # This method returns true if the user_now (time object) is between the
  # open and close hours of the place. The place_now determines the place's
  # day to match the hours.
  day = place_now.strftime('%A')[0...3].downcase
  oh = place[:opening_hours] || {}

  if oh["#{day}_open"] && oh["#{day}_close"]
    h1, m1 = oh["#{day}_open"].split(':')
    h2, m2 = oh["#{day}_close"].split(':')
    from = Time.new(place_now.year, place_now.month, place_now.day, h1.to_i, m1.to_i, 0, '+00:00')
    to = Time.new(place_now.year, place_now.month, place_now.day, h2.to_i, m2.to_i, 0, '+00:00')
    if to < from
      # Past midnight, so add another day
      to += 1.day.seconds
    end
    # Check if 'now' is in range
    user_now >= from && user_now <= to
  end
end
