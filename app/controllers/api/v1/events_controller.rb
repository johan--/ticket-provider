class Api::V1::EventsController < Api::V1::ApiController
  before_action :authenticate_organizer!, except: :index

  load_and_authorize_resource find_by: :uid

  def index
    render json: @events, status: :ok
  end

  def create
    @event = Event.new(event_params.merge(account: current_organizer.account))

    if @event.save
      render json: @event, status: :created
    else
      render json: { errors: [@event.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def update
    if @event.update_attributes(event_params)
      render json: @event, status: :ok
    else
      render json: { errors: [@event.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def destroy
    if @event.destroy
      head :no_content
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
  end
end