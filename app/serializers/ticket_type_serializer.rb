class TicketTypeSerializer < ActiveModel::Serializer
  attributes :id,
             :activity_id,
             :name,
             :description,
             :current_price,
             :seat_type,
             :tickets

  has_many :tickets

  def id
    object.uid
  end

  def activity_id
    object.activity.uid
  end
end
