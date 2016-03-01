class Api::V1::OrganizersController < Api::V1::ApiController

  before_action :authenticate_organizer!, only: [:me]

  load_and_authorize_resource find_by: :uid

  def me
    @organizer = current_organizer
    p @organizer
    if @organizer
      render json: @organizer, status: :ok
    else
      render json: { errors: [@organizer.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  private

  def organizer_params
    params
        .require(:organizer)
        .permit(:email,
                :name)
  end
end