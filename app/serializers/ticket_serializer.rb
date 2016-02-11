class TicketSerializer < ActiveModel::Serializer
  attributes :id,
             :ticket_type_id,
             :row,
             :column,
             :price,
             :state

  def id
    object.uid
  end

  def ticket_type_id
    object.ticket_type.uid
  end

  def state
    object.current_state
  end
end
