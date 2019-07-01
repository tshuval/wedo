Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :tags

  # Define routing for 1:n relation (place->reviews)
  resources :places do
    resources :reviews
  end
end
