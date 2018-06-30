Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :graphs
  resources :votes, only: [:index, :create]
  resources :kilograms, only: [:index, :create]
  root to: 'graphs#index'
end
