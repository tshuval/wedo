# frozen_string_literal: true

class ReviewsController < ApplicationController
  # GET /places/:place_id/reviews
  def index
    reviews = Review.where(place: params[:place_id]).order(created_at: :desc).limit(100)
    render json: reviews
  end

  # POST /places/:place_id/reviews
  def create
    if Review.find_by(place: params[:place_id], username: params[:username])
      return render json: { 'message': 'User already reviewed this place' }, status: :bad_request
    end

    # Not found, so we are good to go
    # Create the review and update the place's average score
    review = Review.create!(params.permit(:username, :description, :score, :place_id))

    # Average reviews of last 6 months
    average_score = Float(Review.where(place: params[:place_id], created_at: 6.months.ago..Time.now).order(created_at: :desc).average(:score))
    # Update the place's average score
    Place.find(params[:place_id]).update(average_score: average_score.round(1))

    render json: review, status: :created
  end
end
