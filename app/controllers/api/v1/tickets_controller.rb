class Api::V1::TicketsController < Api::V1::ApiController
  before_action :authenticate_organizer!

  def create
    @ticket = Ticket.new(ticket_params.merge(ticket_type: TicketType.find_by_uid(params[:ticket][:ticket_type_id])))

    if @ticket.save
      render json: @ticket, status: :created
    else
      render json: { errors: [@ticket.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  private

  def ticket_params
    params
      .require(:ticket)
      .permit(:zone,
              :row,
              :column,
              :price)
  end
end