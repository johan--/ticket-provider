class Api::V1::ApiController < ActionController::Base
  protect_from_forgery with: :null_session

  respond_to :json

  rescue_from CanCan::AccessDenied do |exception|
    render json: { errors: [t('authorization.unauthorized')] }, status: :unauthorized
  end

  def authenticate_user!
    head :unauthorized unless current_user
  end

  def authenticate!
    if current_organizer
      authenticate_organizer!
    else
      authenticate_user!
    end
  end

  def current_ability
    if organizer_signed_in?
      @current_ability ||= Ability.new(current_organizer)
    else
      @current_ability ||= Ability.new(current_user)
    end
  end

  def current_user
    return unless doorkeeper_token
    @current_user ||= User.where(id: doorkeeper_token.resource_owner_id).first
  end

  def page_params
    @page = params[:page] || 1
    @per_page = params[:per_page] || 20
  end
end