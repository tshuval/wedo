require 'helpers'

class PlacesController < ApplicationController

  @@opening_hours = [
    :sun_open, :sun_close, :mon_open, :mon_close, :tue_open, :tue_close,
    :wed_open, :wed_close, :thu_open, :thu_close, :fri_open, :fri_close,
    :sat_open, :sat_close]

  # GET /places [optional 'q' and 'open_now']
  def index
    places = Place.where(is_active: true)
    q = params[:q]
    if q
      # Sanitize the q param and find in 'tags' table, and then all matching places
      #tag = Tag.find_by(name: to_tag(q))
      places = Place.where(is_active: true).joins(:tags).where(tags: {name: to_tag(q)})
    end

    if ["1", "true"].include? params[:open_now]
      # User wants only places that are open now
      now = Time.now.utc.strftime("%H:%M")
      # Day-of-week, first 3 letters
      day = Time.now.strftime('%A')[0...3].downcase
      # Remove places that have hours outside 'now'
      places = places.select {|p| open_now?(p, now, day)}
    end
    # TODO: Return a short list of attributes
    render json: {'places': places}
  end

  # GET /places/:id
  def show
    place = Place.find(params[:id])
    render json: place
  end

  # POST /places
  def create
    # Sanitize the input
    if !validate_hours
      return render json: {'message': 'Invalid hours'}, status: :bad_request
    end

    begin
      place = Place.create(place_params)
    rescue Exception => e
      return render json: {'message': e}, status: :bad_request
    end

    # Create tags and link the place to them
    tags = params[:tags] || []

    tags.each do |t|
      rec = Tag.find_or_create_by(name: to_tag(t), tag_type: 'tag')
      # Link the place
      rec.places << place
    end
    rec = Tag.find_or_create_by(name: to_tag(place.name), tag_type: 'place')
    # Link the place
    rec.places << place

    render json: place, status: :created
  end

  # PUT /places/:id
  def update
    # Sanitize the input
    if !validate_hours
      return render json: {'message': 'Invalid hours'}, status: :bad_request
    end

    begin
      Place.find(params[:id]).update(place_params)
    rescue Exception => e
      return render json: {'message': e}, status: :bad_request
    end
  end

  private
  def place_params
    params.require(:place).permit(
      :name, :description, :address, :website, :phone, :email, :lat, :lon,
      :sun_open, :sun_close, :mon_open, :mon_close, :tue_open, :tue_close,
      :wed_open, :wed_close, :thu_open, :thu_close, :fri_open, :fri_close,
      :sat_open, :sat_close)
  end

  private
  def validate_hours
    @@opening_hours.each do |oh|
      return false if params[oh] and !time_to_int(params[oh])
    end
    return true
  end

end

def open_now?(place, now, day)
  now = time_to_int(now)

  place["#{day}_open"] and time_to_int(place["#{day}_open"]) <= now and
  place["#{day}_close"] and time_to_int(place["#{day}_close"]) >= now
end
