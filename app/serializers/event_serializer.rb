class EventSerializer < ActiveModel::Serializer
  attributes :id,
             :account_id,
             :name,
             :description,
             :cover_photo_url,
             :created_at,
             :updated_at

  def id
    object.uid
  end

  def account_id
    object.account.uid
  end
end