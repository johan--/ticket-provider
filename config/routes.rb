Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  devise_for :organizers

  use_doorkeeper

  scope 'api/v1', module: 'api/v1' do
    resources :events, only: [:index, :create, :update, :destroy]

    resources :ticket_types, only: [:create, :update]
  end
end
