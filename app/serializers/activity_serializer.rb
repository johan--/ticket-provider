class ActivitySerializer < ActiveModel::Serializer
  attributes :id,
             :account_id,
             :name,
             :available_tickets,
             :all_tickets,
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
    object.date.strftime(Date::DATE_FORMATS[:rfc822]) if object.date
  end
end