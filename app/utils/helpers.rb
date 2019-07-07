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
