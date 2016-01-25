class Api::V1::EventsController < Api::V1::ApiController
  before_action :authenticate_organizer!, except: :index

  load_and_authorize_resource

  def index
    render json: @events, status: :ok
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render json: @event, status: :created
    else
      render json: { errors: [@event.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  private

  def event_params
    params
      .require(:event)
      .permit(:name,
              :description,
              :logo,
              :cover_photo)
      .merge(account: current_organizer.account)
  end
end