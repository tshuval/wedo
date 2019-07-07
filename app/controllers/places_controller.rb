# frozen_string_literal: true

require 'helpers'

class PlacesController < ApplicationController
  @@opening_hours = %i(
    sun_open sun_close mon_open mon_close tue_open tue_close
    wed_open wed_close thu_open thu_close fri_open fri_close
    sat_open sat_close
  )

  # GET /places [optional 'q' and 'open_now']
  def index
    places = Place.active
    q = params[:q]
    if q
      # Sanitize the q param and find in 'tags' table, and then all matching places
      # tag = Tag.find_by(name: to_tag(q))
      places = Place.active.joins(:tags).where(tags: { name: to_tag(q) })
    end

    if params.key?(:open_now)
      now = Time.now.utc + (params[:tz_offset] || 0).to_i # This creates a UTC timezone that is adjusted to the local clock
      places = places.select { |p| open_now?(p, now, now) || open_now?(p, now, now - 1.day) }
    end
    render json: { 'places': places.map(&:short_data) }
  end

  # GET /places/:id
  def show
    # Return the place with 5 recent reviews
    place = Place.active.eager_load(:reviews).order(created_at: :desc).limit(5).find(params[:id])
    render json: { 'place': place, 'latest_reviews': place.reviews }
  end

  # POST /places
  def create
    # Sanitize the input
    params[:opening_hours] ||= {}
    return render json: { 'message': 'Invalid hours' }, status: :bad_request unless validate_hours

    begin
      place = Place.create(place_params)
    rescue StandardError => e
      return render json: { 'message': e }, status: :bad_request
    end

    # Create tags and link the place to them
    tags = params[:tags] || []
    tags.each do |t|
      tag = to_tag(t)
      next unless tag.length >= 2

      rec = Tag.find_or_create_by(name: tag, tag_type: 'tag')
      # Link the place
      rec.places << place
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
    return render json: { 'message': 'Invalid hours' }, status: :bad_request unless validate_hours

    begin
      Place.active.find(params[:id]).update(place_params)
    rescue StandardError => e
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
      return false if params[:opening_hours][oh] && !time_to_int(params[:opening_hours][oh])
    end
    true
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
end
