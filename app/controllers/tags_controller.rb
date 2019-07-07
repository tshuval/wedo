require 'helpers'

class TagsController < ApplicationController
  # GET /tags?q=abc
  def index
    q = params[:q]
    if !q || q.length < 2
      render json: { tags: [] }
    else
      tags = Tag.select(%i(id name tag_type)).where('name LIKE ?', "%#{to_tag(q)}%").distinct
      render json: { tags: tags }
    end
  end
end
