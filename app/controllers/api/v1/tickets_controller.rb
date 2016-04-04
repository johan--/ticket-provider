class Api::V1::TicketsController < Api::V1::ApiController
  before_action :authenticate_organizer!, except: :index
  before_action :authenticate_user!, only: :index
  before_action :page_params, only: :index

  load_resource find_by: :uid, except: [:index, :create]
  authorize_resource

  def index
    @tickets = Ticket
                 .includes(:ticket_type)
                 .accessible_by(@current_ability)
                 .page(@page)
                 .per(@per_page)

    render json: @tickets, status: :ok
  end

  def create
    @ticket = Ticket.new(ticket_params.merge(ticket_type: TicketType.find_by_uid(params[:ticket][:ticket_type_id])))

    if @ticket.save
      render json: @ticket, status: :created
    else
      render json: { errors: [@ticket.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def update
    @ticket.user = User.find_by_uid(params[:ticket][:user_id]) if params[:ticket][:user_id]
    if @ticket.transition_to(ticket_state_params[:state])
      render json: @ticket, status: :ok
    else
      render json: { errors: [I18n.t('backend.tickets.cannot_transition_to', state: ticket_state_params[:state])] }, status: :unprocessable_entity
    end
  end

  def destroy
    if @ticket.destroy
      head :no_content
    else
      render json: { errors: [I18n.t('backend.tickets.cannot_destroy')] }, status: :unprocessable_entity
    end
  end

  private

  def ticket_params
    params
      .require(:ticket)
      .permit(:row,
              :column,
              :price,
              :usage_quantity)
  end


  def ticket_state_params
    params
      .require(:ticket)
      .permit(:state)
  end
end