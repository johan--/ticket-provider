class BackendController < ApplicationController
  before_action :set_locale

  layout 'backend'

  def index

  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
end
