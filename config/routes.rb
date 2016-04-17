Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  devise_for :organizers

  use_doorkeeper

  scope 'api/v1', module: 'api/v1' do
    resources :accounts, only: [:show, :update]

    resources :organizers, only: [:update] do
      collection do
        get 'me'
      end
    end

    resources :users, only: [:create, :update, :destroy] do
      collection do
        get 'me'
      end
    end

    resources :activities, only: [:index, :show, :create, :update, :destroy]

    resources :ticket_types, only: [:index, :show, :create, :update, :destroy]

    resources :tickets, only: [:index, :create, :update, :destroy] do
      collection do
        put 'enter'
        put 'exit'
      end
    end
  end

  scope 'app' do
    get '/', to: 'backend#index', as: :app
    get '/*path', to: 'backend#index'
  end

  get 'documentation', to: 'static_pages#documentation'
  root 'static_pages#index'
end
