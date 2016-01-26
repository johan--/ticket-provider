class TicketSerializer < ActiveModel::Serializer
  attributes :id,
             :ticket_type_id,
             :zone,
             :row,
             :column,
             :price

  def id
    object.uid
  end

  def ticket_type_id
    object.ticket_type.uid
  end
end
