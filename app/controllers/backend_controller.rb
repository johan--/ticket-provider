class BackendController < ApplicationController
  before_action :set_locale

  layout 'backend'

  def index

  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
    Rails.application.config.i18n.default_locale = I18n.locale
  end
end
