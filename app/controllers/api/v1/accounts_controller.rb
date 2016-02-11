class Api::V1::AccountsController < Api::V1::ApiController
  before_action :authenticate_organizer!

  load_and_authorize_resource find_by: :uid

  def show
    render json: @account, status: :ok
  end

  def update
    if @account.update_attributes(account_params)
      render json: @account, status: :ok
    else
      render json: { errors: [@account.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  private

  def account_params
    params
      .require(:account)
      .permit(:name,
              :description,
              :logo,
              :cover_photo)
  end
end