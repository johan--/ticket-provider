class Api::V1::TicketTypesController < Api::V1::ApiController
  before_action :authenticate_organizer!

  def create
    @ticket_type = TicketType.new(ticket_type_params)

    if @ticket_type.save
      render json: @ticket_type, status: :created
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
      .merge(event: Event.find_by_uid(params[:ticket_type][:event_id]))
  end
end