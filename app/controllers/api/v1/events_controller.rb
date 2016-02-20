class Api::V1::EventsController < Api::V1::ApiController
  before_action :authenticate_organizer!, except: :index
  before_action :authenticate!, only: :index
  before_action :page_params, only: :index

  load_resource find_by: :uid, except: :index
  authorize_resource

  def index
    @events = Event
                .includes(:account)
                .accessible_by(@current_ability)
                .page(@page)
                .per(@per_page)

    case current_user
      when User
        @events = @events.order('random()')
    end

    render json: @events, status: :ok
  end

  def show
    render json: @event, status: :ok
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