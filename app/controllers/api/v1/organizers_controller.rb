class Api::V1::OrganizersController < Api::V1::ApiController
  before_action :authenticate_organizer!, only: [:me]

  load_and_authorize_resource find_by: :uid

  def me
    render json: current_organizer, serializer: OrganizerSerializer, status: :ok
  end

  def update
    if @organizer.update_attributes(organizer_params)
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