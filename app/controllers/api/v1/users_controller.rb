class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user!, except: :create

  skip_before_action :verify_authenticity_token, on: :create

  load_and_authorize_resource find_by: :uid, except: :create

  def me
    if current_user
      render json: current_user, status: :ok
    else
      render json: { errors: [current_user.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: [@user.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update_attributes(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: [@user.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      head :no_content
    else
      render json: { errors: [@user.errors.full_messages.to_sentence] }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:email,
              :password,
              :name,
              :birthdate)
  end
end