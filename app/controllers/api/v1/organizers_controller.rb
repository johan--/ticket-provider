class Api::V1::OrganizersController < Api::V1::ApiController
  before_action :authenticate_organizer!, only: [:me]

  def me
    @organizer = current_organizer

    if @organizer
      render json: @organizer, status: :ok
    end
  end
end