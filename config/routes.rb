Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  devise_for :organizers

  use_doorkeeper

  scope 'api/v1', module: 'api/v1' do
    resources :accounts, only: [:show, :update]

    resource :organizers, only: [:update] do
      collection do
        get 'me'
      end
    end

    resources :users, only: [:create, :update, :destroy] do
      collection do
        get 'me'
      end
    end

    resources :events, only: [:index, :show, :create, :update, :destroy]

    resources :ticket_types, only: [:index, :show, :create, :update, :destroy]

    resources :tickets, only: [:index, :create, :update, :destroy]
  end

  scope 'app' do
    get '/', to: 'backend#index', as: :app
    get '/*path', to: 'backend#index'
  end

  root 'backend#index'
end
