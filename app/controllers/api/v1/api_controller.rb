class Api::V1::ApiController < ActionController::Base
  protect_from_forgery with: :null_session

  respond_to :json

  rescue_from CanCan::AccessDenied do |exception|
    render json: { errors: [t('authorization.unauthorized')] }, status: :unauthorized
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    head :not_found
  end

  def authenticate_user!
    head :unauthorized unless current_user
  end

  def authenticate_organizer!
    if params[:api_token]
      head :unauthorized unless current_account
    else
      super
    end
  end

  def current_ability
    if organizer_signed_in?
      @current_ability ||= Ability.new(current_organizer)
    elsif params[:api_token]
      @current_ability ||= Ability.new(current_account)
    else
      @current_ability ||= Ability.new(current_user)
    end
  end

  def current_user
    return unless doorkeeper_token
    @current_user ||= User.where(id: doorkeeper_token.resource_owner_id).first
  end

  def current_account
    return unless params[:api_token]
    @current_account ||= Account.where(api_token: params[:api_token]).first
  end

  def page_params
    @page = params[:page] || 1
    @per_page = params[:per_page] || 20
  end
end