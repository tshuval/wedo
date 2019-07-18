# frozen_string_literal: true

def to_tag(s)
  # Removes whitespace and other chars from 's' and lowercases
  s.gsub(/[^a-zA-Z0-9]+/, '').downcase
end

def is_time?(t)
  # Returns true if 't' is in the form "10:00"
  Time.strptime(t, '%R')
  true
rescue ArgumentError
  false
end

def open_now?(opening_hours, user_now, place_now)
  # This method returns true if the user_now (time object) is between the
  # open and close hours of the place. The place_now determines the place's
  # day to match the hours.
  # opening_hours is a hash of hours of a place
  day = place_now.strftime('%a').downcase
  hours = opening_hours || {}

  if hours["#{day}_open"] && hours["#{day}_close"]
    h1, m1 = hours["#{day}_open"].split(':')
    h2, m2 = hours["#{day}_close"].split(':')
    from = Time.new(place_now.year, place_now.month, place_now.day, h1.to_i, m1.to_i, 0, '+00:00')
    to = Time.new(place_now.year, place_now.month, place_now.day, h2.to_i, m2.to_i, 0, '+00:00')
    if to < from
      # Past midnight, so add another day
      to += 1.day.seconds
    end
    # Check if 'now' is in range
    (from..to).include? user_now
  else
    false
  end
end
