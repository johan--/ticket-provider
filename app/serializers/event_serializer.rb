class EventSerializer < ActiveModel::Serializer
  attributes :id,
             :account_id,
             :name,
             :description,
             :cover_photo_url,
             :date,
             :created_at,
             :updated_at

  def id
    object.uid
  end

  def account_id
    object.account.uid
  end

  def date
    object.date.strftime(Date::DATE_FORMATS[:rfc822])
  end
end