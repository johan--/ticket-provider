class Api::V1::OrganizersController < Api::V1::ApiController
  before_action :authenticate_organizer!, only: [:me]

  def me
    render json: current_organizer, serializer: OrganizerSerializer, status: :ok
  end
end