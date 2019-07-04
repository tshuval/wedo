require 'helpers'

class PlacesController < ApplicationController
  @@opening_hours = [
    :sun_open, :sun_close, :mon_open, :mon_close, :tue_open, :tue_close,
    :wed_open, :wed_close, :thu_open, :thu_close, :fri_open, :fri_close,
    :sat_open, :sat_close
  ]

  # GET /places [optional 'q' and 'open_now']
  def index
    places = Place.where(is_active: true)
    q = params[:q]
    if q
      # Sanitize the q param and find in 'tags' table, and then all matching places
      # tag = Tag.find_by(name: to_tag(q))
      places = Place.where(is_active: true).joins(:tags).where(tags: { name: to_tag(q) })
    end

    if ["1", "true"].include? params[:open_now]
      # User wants only places that are open now
      now = Time.now.utc.strftime("%H:%M")
      # Day-of-week, first 3 letters
      day = Time.now.strftime('%A')[0...3].downcase
      # Remove places that have hours outside 'now'
      places = places.select { |p| open_now?(p, now, day) }
    end
    # TODO: Return a short list of attributes
    render json: { 'places': places }
  end

  # GET /places/:id
  def show
    place = Place.find(params[:id])
    render json: place
  end

  # POST /places
  def create
    # Sanitize the input
    params[:opening_hours] ||= {}
    if !validate_hours
      return render json: { 'message': 'Invalid hours' }, status: :bad_request
    end

    begin
      place = Place.create(place_params)
    rescue => e
      return render json: { 'message': e }, status: :bad_request
    end

    # Create tags and link the place to them
    tags = params[:tags] || []
    tags.each do |t|
      tag = to_tag(t)
      if tag.length >= 2
        rec = Tag.find_or_create_by(name: tag, tag_type: 'tag')
        # Link the place
        rec.places << place
      end
    end
    tag = to_tag(place.name)
    if tag.length >= 2
      rec = Tag.find_or_create_by(name: tag, tag_type: 'place')
      # Link the place
      rec.places << place
    end

    render json: place, status: :created
  end

  # PUT /places/:id
  def update
    # Sanitize the input
    if !validate_hours
      return render json: { 'message': 'Invalid hours' }, status: :bad_request
    end

    begin
      Place.find(params[:id]).update(place_params)
    rescue => e
      return render json: { 'message': e }, status: :bad_request
    end
  end

  private

  def place_params
    params.require(:place).permit(
      :name, :description, :address, :website, :phone, :email, :lat, :lon,
      opening_hours: @@opening_hours
    )
  end

  def validate_hours
    @@opening_hours.each do |oh|
      return false if params[:opening_hours][oh] and !time_to_int(params[:opening_hours][oh])
    end
    return true
  end
end

def open_now?(place, now, day)
  oh = place[:opening_hours] || {}
  return false if not oh["#{day}_open"] or not oh["#{day}_close"]

  now = time_to_int(now)
  op = time_to_int(oh["#{day}_open"])
  cl = time_to_int(oh["#{day}_close"])
  return true if now >= op and now <= cl
  # BUG ^^^
  # The above condition is true only if the close time is before midnight
  # If it's after midnight, this will return false.
  # Another issue is if 'now' is after midnight, so it's esentially "tomorrrow"
end
