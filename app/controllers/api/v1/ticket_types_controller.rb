class Api::V1::TicketTypesController < Api::V1::ApiController
  before_action :authenticate_organizer!, except: :index
  before_action :authenticate!

  load_resource find_by: :uid, except: [:index, :create]
  authorize_resource

  def index
    @ticket_types = TicketType.where(event: Event.find_by_uid(params[:event_id]))

    render json: @ticket_types, status: :ok
  end

  def show
    render json: @ticket_type, status: :ok
  end

  def create
    @ticket_type = TicketType.new(ticket_type_params.merge(event: Event.find_by_uid(params[:ticket_type][:event_id])))

    if @ticket_type.save
      render json: @ticket_type, status: :created
    else
      render json: { errors: [@ticket_type.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def update
    if @ticket_type.update_attributes(ticket_type_params)
      render json: @ticket_type, status: :ok
    else
      render json: { errors: [@ticket_type.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def destroy
    if @ticket_type.destroy
      head :no_content
    else
      render json: { errors: [@ticket_type.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  private

  def ticket_type_params
    params
      .require(:ticket_type)
      .permit(:name,
              :description,
              :current_price)
  end
end