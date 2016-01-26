class Api::V1::AccountsController < Api::V1::ApiController
  before_action :authenticate_organizer!

  load_and_authorize_resource find_by: :uid

  def show
    render json: @account, status: :ok
  end
end