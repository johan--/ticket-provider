class Api::V1::UsersController < Api::V1::ApiController

  before_action 'authenticate_user!', only: [:me]

  def me
    @user = current_user

    if @user
      render json: @user, status: :ok
    else
      render json: { errors: [@user.errors.full_messages.to_sentence] }, status: :unprocessable_entity
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