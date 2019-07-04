def to_tag(s)
  # Removes whitespace and other chars from 's' and lowercases
  s.gsub(/[^a-zA-Z0-9]+/, '').downcase
end

def time_to_int(t)
  # Converts string time to integer. Returns nil if not a valid time
  # e.g. '10:30' -> 10.5
  h, m = t.split(':')
  if h and m and h.match(/^(\d)+$/) and m.match(/^(\d)+$/)
    h = h.to_i
    m = m.to_i
    if h and m
      if h >= 0 and h <= 23 and m >= 0 and m <= 59
        return h + m / 60.0
      end
    end
  end
  return nil
end
