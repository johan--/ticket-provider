Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  devise_for :organizers

  use_doorkeeper

  scope 'api/v1', module: 'api/v1' do
    resources :accounts, only: [:show, :update]

    resources :users, only: [:create]

    resources :events, only: [:index, :show, :create, :update, :destroy]

    resources :ticket_types, only: [:index, :show, :create, :update, :destroy]

    resources :tickets, only: [:index, :create, :update, :destroy]
  end

  root 'backend#index'
end
