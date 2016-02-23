class BackendController < ApplicationController
  before_action :set_locale
  before_action :authenticate_organizer!

  layout 'backend'

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
end
