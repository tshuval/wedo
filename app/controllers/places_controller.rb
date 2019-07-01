require 'helpers'

class PlacesController < ApplicationController

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
      # Day-of-week, first 3 letters
      dow = Time.now.strftime('%A')[0...3].downcase
      now = Time.now.utc.strftime("%H%M")
      # Remove places that have hours outside 'now'
      places = places.reject do |p|
        (p["#{dow}_open"] and p["#{dow}_close"]) &&
        (p["#{dow}_open"].strftime("%H%M") > now || p["#{dow}_close"].strftime("%H%M") < now)
      end
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
    # Place.create(name: "Beer Garden", address: "Sarona Market")
    # Review.create(username: 'tshuval', description: 'best place to grab a beer', score: 5, place_id: 1)
  end

  # PUT /places/:id
  def update
  end

end
