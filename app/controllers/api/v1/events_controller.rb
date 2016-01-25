class Api::V1::EventsController < Api::V1::ApiController

  def index
    @events = Event.accessible_by(current_ability)

    render json: @events
  end
end