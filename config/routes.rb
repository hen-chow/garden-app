Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "pages#index"
  # get "/check", to: "users#check"

  resources :users, only: [:new, :create, :show]
  resources :gardens, only: [:new, :create, :show, :update]

  get "signin", to: "sessions#new", as: "login"
  post "signin", to: "sessions#create"
  delete "signout", to: "sessions#destroy", as: "signout"
end
