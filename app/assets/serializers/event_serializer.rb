class EventSerializer < ActiveModel::Serializer
  attributes :id,
             :account_id,
             :name,
             :description,
             :cover_photo,
             :created_at,
             :updated_at
end