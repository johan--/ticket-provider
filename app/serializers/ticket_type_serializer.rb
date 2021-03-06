class TicketTypeSerializer < ActiveModel::Serializer
  attributes :id,
             :activity_id,
             :name,
             :available_tickets,
             :all_tickets,
             :description,
             :current_price,
             :usage_type,
             :tickets

  has_many :tickets

  def id
    object.uid
  end

  def activity_id
    object.activity.uid
  end
end
