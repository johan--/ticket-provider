class Api::V1::EventsController < Api::V1::ApiController
  before_action :authenticate_organizer!, except: :index
  before_action :authenticate!, only: :index
  before_action :page_params, only: :index

  load_resource find_by: :uid, except: [:index, :destroy]
  authorize_resource except: :create

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
    @event.update_attributes(event_params)

    if params[:event][:state] && !@event.transition_to(params[:event][:state])
      @event.errors.add(:state, I18n.t('backend.events.cannot_transition_to', state: params[:event][:state]))
    end

    if @event.errors.blank?
      render json: @event, status: :ok
    else
      render json: { errors: [@event.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end

  end

  def destroy
    @event = Event
               .includes(ticket_types: [:tickets])
               .where({ events: { uid: params[:id] } })
               .accessible_by(@current_ability).first

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
              :cover_photo,
              :date)
  end
end