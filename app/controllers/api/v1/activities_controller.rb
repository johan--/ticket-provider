class Api::V1::ActivitiesController < Api::V1::ApiController
  before_action :authenticate_organizer!
  before_action :page_params, only: :index

  load_resource find_by: :uid, except: [:index, :destroy]
  authorize_resource except: :create

  def index
    @activities = Activity
                .includes(:account)
                .accessible_by(@current_ability)
                .page(@page)
                .per(@per_page)

    render json: @activities, status: :ok
  end

  def show
    render json: @activity, status: :ok
  end

  def create
    @activity = Activity.new(activity_params.merge(account: activity_account))

    if @activity.save
      render json: @activity, status: :created
    else
      render json: { errors: [@activity.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def update
    if @activity.update_attributes(activity_params)
      render json: @activity, status: :ok
    else
      render json: { errors: [@activity.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def destroy
    @activity = Activity
               .includes(ticket_types: [:tickets])
               .where({ activities: { uid: params[:id] } })
               .accessible_by(@current_ability).first

    if @activity.destroy
      head :no_content
    else
      render json: { errors: [@activity.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  private

  def activity_account
    if params[:api_token]
      current_account
    else
      current_organizer.account
    end
  end

  def activity_params
    params
      .require(:activity)
      .permit(:name,
              :description,
              :logo,
              :cover_photo,
              :date)
  end
end