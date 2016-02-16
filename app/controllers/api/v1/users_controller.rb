class Api::V1::UsersController < Api::V1::ApiController

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