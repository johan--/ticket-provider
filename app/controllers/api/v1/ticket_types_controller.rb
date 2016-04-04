class Api::V1::TicketTypesController < Api::V1::ApiController
  before_action :authenticate_organizer!
  before_action :page_params, only: :index

  load_resource find_by: :uid, except: [:index, :create]
  authorize_resource

  def index
    @ticket_types = TicketType
                      .where(activity: Activity.find_by_uid(params[:activity_id]))
                      .page(@page)
                      .per(@per_page)

    render json: @ticket_types, status: :ok
  end

  def show
    render json: @ticket_type, status: :ok
  end

  def create
    @ticket_type = TicketType.new(ticket_type_params.merge(activity: Activity.find_by_uid(params[:ticket_type][:activity_id])))

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
              :current_price,
              :usage_type)
  end
end